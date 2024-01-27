import fs from "fs";
import path from "path";

import hljs from "highlight.js";

import { marked } from "marked";
import markedAlert from "marked-alert";
import { baseUrl } from "marked-base-url";
import markedFootnote from "marked-footnote";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";

import { generateNav } from "./navigation.js";
import { execSync } from "child_process";

marked.use();
marked.use(markedAlert());
marked.use(baseUrl("https://wiljam144.github.io/courier/"));
//marked.use(baseUrl("/content/"));
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
}));

function traverseDir(dir, files = []) {
    let dirContent = fs.readdirSync(dir);
    for (let content of dirContent) {
        let contentPath = path.join(dir, content);

        if (fs.statSync(contentPath).isDirectory()) {
            traverseDir(contentPath, files);
        } else {
            files.push({path: contentPath, name: content});
        }
    }

    return files;
}

function compileMarkdownFile(path) {
    let content = fs.readFileSync(path, "utf-8");

    // remove any newlines inside %%...%%
    content = content.replace(/%%([\s\S]*?)%%/g, function(_, group) {
        return "%%" + group.replace(/\n/g, " ") + "%%";
    });

    let text = marked.parse(content);

    const tikzRegex = /%%(.*?)%%/g;

    text = text.replace(tikzRegex, (_, group) => {
        const src = `
        \\documentclass[border=1pt]{standalone} 
        \\usepackage{tikz}
        \\begin{document}
        \\begin{tikzpicture}
        ${group}
        \\end{tikzpicture}
        \\end{document}`;

        fs.writeFileSync("tmp.tex", src);
        execSync(`pdflatex tmp.tex`);
        execSync(`pdf2svg tmp.pdf tmp.svg`);
        fs.rmSync("tmp.tex");
        fs.rmSync("tmp.aux");
        fs.rmSync("tmp.log");
        fs.rmSync("tmp.pdf");

        const svg = fs.readFileSync("tmp.svg", "utf-8");

        fs.rmSync("tmp.svg");

        return svg
    });

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
    let files = traverseDir(dir);
    for (const file of files) {
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
