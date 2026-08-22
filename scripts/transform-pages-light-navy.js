const fs = require('fs');
const path = require('path');

const targetDirs = [
    'app/loans',
    'app/cards',
    'app/insurance',
    'app/investments',
    'app/compare',
    'app/calculators',
    'app/payout-structure',
    'app/rewards-and-offers',
    'app/documents-required'
];

function transformPageContent(content) {
    let res = content;

    // Convert page wrapper from dark bg-[#181a1d] to white / light
    res = res.replace(/bg-\[#181a1d\]/g, 'bg-white');
    res = res.replace(/bg-\[#121417\]/g, 'bg-[#f8fafc]');
    res = res.replace(/bg-\[#15171a\]/g, 'bg-[#f8fafc]');
    res = res.replace(/bg-slate-900\/80/g, 'bg-white');
    res = res.replace(/bg-slate-900\/50/g, 'bg-[#f8fafc]');
    res = res.replace(/bg-slate-900\/60/g, 'bg-white');
    res = res.replace(/bg-slate-900/g, 'bg-white');
    res = res.replace(/bg-slate-950\/80/g, 'bg-[#f8fafc]');
    res = res.replace(/bg-slate-950/g, 'bg-[#f8fafc]');

    // Border transitions
    res = res.replace(/border-slate-800\/60/g, 'border-slate-200');
    res = res.replace(/border-slate-800/g, 'border-slate-200');
    res = res.replace(/border-slate-700/g, 'border-slate-200');

    // Text contrast adjustments for white backgrounds
    // In headings/body: text-white -> text-slate-900 where appropriate
    res = res.replace(/text-5xl md:text-7xl font-black tracking-tight leading-tight text-white/g, 'text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-900');
    res = res.replace(/text-3xl md:text-5xl font-black tracking-tight text-white/g, 'text-3xl md:text-5xl font-black tracking-tight text-slate-900');
    res = res.replace(/text-2xl font-black text-white/g, 'text-2xl font-black text-slate-900');
    res = res.replace(/text-xl font-black text-white/g, 'text-xl font-black text-slate-900');
    res = res.replace(/text-lg font-black text-white/g, 'text-lg font-bold text-slate-900');
    res = res.replace(/text-slate-300/g, 'text-slate-600');
    res = res.replace(/text-slate-400/g, 'text-slate-500');

    // Badge styling for light background
    res = res.replace(/bg-sky-500\/10/g, 'bg-sky-50');
    res = res.replace(/border-sky-500\/40/g, 'border-sky-500/30');
    res = res.replace(/text-\[#38bdf8\]/g, 'text-[#0284c7]');

    // Button styling: ensure buttons have text-white
    res = res.replace(/bg-\[#0284c7\] hover:bg-\[#0369a1\] text-slate-950/g, 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-sm');
    res = res.replace(/bg-\[#0284c7\] text-slate-950/g, 'bg-[#0284c7] text-white');

    // Card styling
    res = res.replace(/bg-white\/5/g, 'bg-white');
    res = res.replace(/shadow-xl/g, 'shadow-sm hover:shadow-md');

    return res;
}

const rootDir = path.resolve(__dirname, '..', '..', '..', '..', '..', 'Users', 'Aishwarya', 'shreefinance');

targetDirs.forEach(dirName => {
    const fullDir = path.join(rootDir, dirName);
    if (fs.existsSync(fullDir)) {
        const files = fs.readdirSync(fullDir, { recursive: true });
        files.forEach(file => {
            const filePath = path.join(fullDir, file);
            if (fs.statSync(filePath).isFile() && /\.tsx$/.test(filePath)) {
                const orig = fs.readFileSync(filePath, 'utf8');
                const transformed = transformPageContent(orig);
                if (transformed !== orig) {
                    fs.writeFileSync(filePath, transformed, 'utf8');
                    console.log('Transformed to White & Navy Blue:', filePath);
                }
            }
        });
    }
});

console.log('Completed internal pages styling transformation.');
