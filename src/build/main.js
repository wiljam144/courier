import fs from "fs";
import path from "path";

import { marked } from "marked";
import markedAlert from "marked-alert";
import { baseUrl } from "marked-base-url";
import markedFootnote from "marked-footnote";
import hljs from "highlight.js";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";

import { generateNav } from "./navigation.js";

import { compile } from "figurescript";

marked.use();
marked.use(markedAlert());
//marked.use(baseUrl("https://wiljam144.github.io/courier/"));
//marked.use(baseUrl("/"));
marked.use(markedFootnote());
marked.use(markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang, _) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
}));
marked.use(markedKatex({
    throwOnError: true, 
    minRuleThickness: 0.06,
}));

function traverseDir(dir, files = []) {
    let dirContent = fs.readdirSync(dir);
    for (let content of dirContent) {
        let contentPath = path.join(dir, content);

        if (fs.statSync(contentPath).isDirectory()) {
            traverseDir(contentPath, files);
        }
        else {
            files.push({path: contentPath, name: content});
        }
    }

    return files;
}

function compileMarkdownFile(path) {
    let content = fs.readFileSync(path, "utf-8");
    const figurescriptRegex = /%%(.*?)%%/gs;
    content = content.replace(figurescriptRegex, (_, group) => {
        return compile(group); 
    });

    let text = marked.parse(content);

    const svgRegex = /%svg%(.*?)%svg%/g;
    text = text.replace(svgRegex, (_, group) => {
        return group;
    })

    /* const figurescriptRegex = /%%(.*?)%%/gs;
    text = text.replace(figurescriptRegex, (_, group) => {
        console.log(group);
        return compile(group); 
    }) */

    const linkRegex = /<a .*?href="(.*?)"[^>]*>(.*?)<\/a>/g
    text = text.replace(linkRegex, (_, href, text) => {
        if (href.startsWith("#footnote")) {
            return `<a class="footnote" href="${href}">${text}</a>`
        }
        if (href.startsWith("http")) {
            return `<a href="${href}">${text}</a>`
        }

        href = href.slice(0, -2) + "html";
        return `<span class="link" hx-get="${href}" hx-target="#main" hx-swap="innerHTML">${text}</span>`;
    })

    const sansRegex = /\^(.*?)\^/g;
    text = text.replace(sansRegex, (_, group) => {
        return `<span class="sans-text">${group}</span>`;
    })

    return text;
}

function compileMarkdownFiles(dir) {
    const ignorelist = [".DS_STORE"];

    let files = traverseDir(dir);
    outerloop:
    for (const file of files) {
        if (file.name.includes(".png") || file.name.includes(".svg")) {
            fs.cpSync(file.path, "./dist/" + file.path, {recursive: true});
            continue;
        }
        for (let i = 0; i < ignorelist.length; i++) {
            if (file.path.includes(ignorelist[i])) {
                continue outerloop;
            }
        }

        let content = compileMarkdownFile(file.path);

        fs.mkdirSync(path.join("./dist/", file.path.slice(0, -file.name.length)), { recursive: true });
        fs.writeFileSync(path.join("./dist/", file.path.slice(0, -2) + "html"), content);
    }
}

function copyStaticFiles(dir) {
    fs.cpSync(dir, "./dist/", { recursive: true });
}

copyStaticFiles("./src/web/");
compileMarkdownFiles("./content/");
generateNav();
