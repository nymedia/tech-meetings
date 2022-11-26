const fs = require('fs')
const mdjs = require("@moox/markdown-to-json");

const exclude = [
    '.git',
    '.github',
    '.vscode',
    'README.md',
    'TOC.js',
    'node_modules',
    'launch.json',
    'package-lock.json',
    'package.json',
];
const files = fs.readdirSync('.');
let tocMarkdown = ['# tech-meetings',
''];
files.forEach(file => {
    if (exclude.includes(file)) {
        return
    }
    const dirFiles = fs.readdirSync(file);
    if (!dirFiles) {
        return
    }
    tocMarkdown.push('## ' + file)
    dirFiles.forEach((innerFile) => {
        const output = mdjs.markdownAsJsTree(fs.readFileSync(`${file}/${innerFile}`));
        if (!output) {
            return
        }
        let data = innerFile.replace('.md', '')
        let title = output.title
        tocMarkdown.push(`- [${data}](https://github.com/nymedia/tech-meetings/blob/1.x/${file}/${innerFile}): ${title}`)

    })
})

console.log(tocMarkdown.join("\n"))