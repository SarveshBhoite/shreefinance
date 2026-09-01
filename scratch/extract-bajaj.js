const fs = require('fs');
const path = require('path');

// Extract embedded images from raw PDF stream
function extractImagesFromPdf(pdfPath, outDir) {
    const data = fs.readFileSync(pdfPath);
    let offset = 0;
    let imgIdx = 0;
    
    // Look for JPEG markers FF D8 FF ... FF D9
    while (offset < data.length) {
        const start = data.indexOf(Buffer.from([0xFF, 0xD8, 0xFF]), offset);
        if (start === -1) break;
        
        const end = data.indexOf(Buffer.from([0xFF, 0xD9]), start + 3);
        if (end === -1) break;
        
        const imgBuffer = data.slice(start, end + 2);
        if (imgBuffer.length > 5000) {
            const outPath = path.join(outDir, `extracted_bajaj_${imgIdx}.jpg`);
            fs.writeFileSync(outPath, imgBuffer);
            console.log(`Extracted JPEG ${imgIdx}: ${outPath} (${imgBuffer.length} bytes)`);
            imgIdx++;
        }
        offset = end + 2;
    }

    // Look for PNG markers 89 50 4E 47
    offset = 0;
    while (offset < data.length) {
        const start = data.indexOf(Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]), offset);
        if (start === -1) break;
        
        const end = data.indexOf(Buffer.from('IEND'), start + 8);
        if (end === -1) break;
        
        const imgBuffer = data.slice(start, end + 8);
        const outPath = path.join(outDir, `extracted_bajaj_png_${imgIdx}.png`);
        fs.writeFileSync(outPath, imgBuffer);
        console.log(`Extracted PNG ${imgIdx}: ${outPath} (${imgBuffer.length} bytes)`);
        imgIdx++;
        offset = end + 8;
    }
}

const pdfFile = 'C:\\Users\\Aishwarya\\.gemini\\antigravity-ide\\brain\\d3cc63bb-29be-492a-a4af-73b2af2ed198\\.user_uploaded\\media_1788249971886.pdf';
const outDir = 'c:\\Users\\Aishwarya\\shreefinance\\public\\bank logo';
extractImagesFromPdf(pdfFile, outDir);
