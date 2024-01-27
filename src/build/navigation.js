import fs from "fs";
import path from "path";

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function traverseDir(dir) {
    let files = [];

    let dirContent = fs.readdirSync(dir);

    let index = false;

    for (let content of dirContent) {
        let contentPath = path.join(dir, content);

        let file = {
            name: content,
            path: contentPath
        };

        if (fs.statSync(contentPath).isDirectory()) {
            file.type = "directory";
            const traverse = traverseDir(contentPath);
            file.files = traverse[0];
            file.index = traverse[1];
            files.push(file);
        } 
        else {
            if (content == "index.md") {
                index = true;
            }
            file.type = "file";
            files.push(file);
        }
    }

    return [files, index];
}

function generateHTML(files) {
    let result = `<ul>`;

    for (let file of files) {
        if (file.name == "index.md") {
            continue;
        }
        if (file.name == "linkage.md") {
            result += `<li class="linkage">`;
        }
        else {
            result += `<li>`;
        }

        if (file.type == "directory") {
            if (file.index) {
                result += `
                    <span class="link" hx-get="./${file.path}/index.html" hx-swap="innerHTML" hx-target="#main" hx-trigger="click">
                        ${capitalize(file.name)}
                    <span>`
            }
            else {
                result += `${capitalize(file.name)}`;
            }

            result += generateHTML(file.files);
        }
        else {
            let name = "";
            for (let word of file.name.slice(0, -3).split("-")) {
                name += capitalize(word) + " ";
            }

            result += `<span class="link" hx-get="./${file.path.slice(0, -2)}html" hx-swap="innerHTML" hx-target="#main" hx-trigger="click">${name}</span>`
        }

        result += `</li>`;
    }

    result += `</ul>`;

    return result;
}

export function generateNav() {
    const html = `
    <h2>Navigation</h2>
    ${generateHTML(traverseDir("./content")[0])}
    `

    fs.writeFileSync("./dist/navigation.html", html);
}