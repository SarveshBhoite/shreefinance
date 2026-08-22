const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                processDirectory(fullPath);
            }
        } else if (/\.(tsx|ts|css|html)$/.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;

            // Green hex codes to Navy Blue / Sky Blue
            content = content.replace(/#00c985/gi, '#0284c7');
            content = content.replace(/#00e699/gi, '#38bdf8');
            content = content.replace(/#00b074/gi, '#0369a1');
            content = content.replace(/#00a86b/gi, '#0284c7');
            content = content.replace(/#059669/gi, '#0284c7');
            content = content.replace(/#047857/gi, '#0369a1');
            content = content.replace(/#10b981/gi, '#0284c7');
            content = content.replace(/#34d399/gi, '#38bdf8');
            content = content.replace(/#16a34a/gi, '#0284c7');
            content = content.replace(/#15803d/gi, '#0369a1');
            content = content.replace(/#22c55e/gi, '#0284c7');

            // Replace emerald / green background and border tailwind classes with sky / navy equivalents
            // For example: bg-emerald-500 -> bg-[#0284c7] or bg-sky-600
            // text-emerald-500 -> text-[#0284c7]
            // bg-emerald-50 -> bg-sky-50
            // border-emerald- -> border-sky-
            // text-emerald- -> text-sky-
            // bg-emerald- -> bg-sky-
            // text-green- -> text-sky-
            // bg-green- -> bg-sky-
            // border-green- -> border-sky-
            content = content.replace(/bg-emerald-50\b/g, 'bg-sky-50');
            content = content.replace(/bg-emerald-100\b/g, 'bg-sky-100');
            content = content.replace(/bg-emerald-500\/10\b/g, 'bg-sky-500/10');
            content = content.replace(/bg-emerald-500\/20\b/g, 'bg-sky-500/20');
            content = content.replace(/bg-emerald-500\/15\b/g, 'bg-sky-500/15');
            content = content.replace(/border-emerald-200\b/g, 'border-sky-200');
            content = content.replace(/border-emerald-300\b/g, 'border-sky-300');
            content = content.replace(/border-emerald-500\/30\b/g, 'border-sky-500/30');
            content = content.replace(/border-emerald-500\/40\b/g, 'border-sky-500/40');
            content = content.replace(/text-emerald-800\b/g, 'text-sky-800');
            content = content.replace(/text-emerald-700\b/g, 'text-sky-700');
            content = content.replace(/text-emerald-600\b/g, 'text-sky-600');
            content = content.replace(/text-emerald-500\b/g, 'text-[#0284c7]');
            content = content.replace(/text-emerald-400\b/g, 'text-sky-400');
            content = content.replace(/text-emerald-300\b/g, 'text-sky-300');

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated:', fullPath);
            }
        }
    }
}

const rootDir = path.resolve(__dirname, '..', '..', '..', '..', '..', 'Users', 'Aishwarya', 'shreefinance');
processDirectory(rootDir);
console.log('Finished updating all files to Navy Blue / Sky White theme.');
