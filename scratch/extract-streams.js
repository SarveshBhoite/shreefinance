const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const pdfPath = 'C:\\Users\\Aishwarya\\.gemini\\antigravity-ide\\brain\\d3cc63bb-29be-492a-a4af-73b2af2ed198\\.user_uploaded\\media_1788249971886.pdf';
const data = fs.readFileSync(pdfPath);

let offset = 0;
let count = 0;
while (true) {
    const streamStart = data.indexOf(Buffer.from('stream'), offset);
    if (streamStart === -1) break;
    const streamEnd = data.indexOf(Buffer.from('endstream'), streamStart);
    if (streamEnd === -1) break;

    // Find stream body
    let bodyStart = streamStart + 6;
    if (data[bodyStart] === 0x0D && data[bodyStart + 1] === 0x0A) bodyStart += 2;
    else if (data[bodyStart] === 0x0A || data[bodyStart] === 0x0D) bodyStart += 1;

    let bodyEnd = streamEnd;
    if (data[bodyEnd - 2] === 0x0D && data[bodyEnd - 1] === 0x0A) bodyEnd -= 2;
    else if (data[bodyEnd - 1] === 0x0A || data[bodyEnd - 1] === 0x0D) bodyEnd -= 1;

    const streamData = data.slice(bodyStart, bodyEnd);
    console.log(`Stream ${count}: length ${streamData.length}`);

    // Try inflate
    try {
        const inflated = zlib.inflateSync(streamData);
        console.log(`Stream ${count} inflated: length ${inflated.length}`);
        // Save inflated if big enough
        if (inflated.length > 50000) {
            fs.writeFileSync(`public/bank logo/raw_stream_${count}.bin`, inflated);
        }
    } catch (e) {
        // Maybe it's JPEG directly
        if (streamData.length > 50000) {
            fs.writeFileSync(`public/bank logo/raw_stream_${count}.jpg`, streamData);
        }
    }

    count++;
    offset = streamEnd + 9;
}
