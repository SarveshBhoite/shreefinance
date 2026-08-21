const key = "OyaNWFVeALmERnMgG1ibwt5IfpX3YPrSq8uoB0jlZ7TxvsQJz6LZQE8gjw2vRSNJYVUH1TP40GWyOCFq";
const phone = "8087631421";
const otp = "555215";

async function testFast2SMS() {
    console.log("Testing Fast2SMS API Key...");
    
    // Method 1: bulkV2 POST route=otp
    try {
        const res1 = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "authorization": key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                variables_values: otp,
                route: "otp",
                numbers: phone
            })
        });
        const data1 = await res1.json();
        console.log("Method 1 (bulkV2 POST route=otp):", data1);
    } catch (e) {
        console.error("Method 1 Error:", e);
    }

    // Method 2: bulkV2 GET route=otp
    try {
        const url2 = `https://www.fast2sms.com/dev/bulkV2?authorization=${key}&route=otp&variables_values=${otp}&numbers=${phone}`;
        const res2 = await fetch(url2);
        const data2 = await res2.json();
        console.log("Method 2 (bulkV2 GET route=otp):", data2);
    } catch (e) {
        console.error("Method 2 Error:", e);
    }

    // Method 3: bulkV2 POST route=q
    try {
        const res3 = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "authorization": key,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                route: "q",
                message: `Your Shree Finance OTP code is ${otp}`,
                language: "english",
                flash: "0",
                numbers: phone
            })
        });
        const data3 = await res3.json();
        console.log("Method 3 (bulkV2 POST route=q):", data3);
    } catch (e) {
        console.error("Method 3 Error:", e);
    }

    // Method 4: bulkV2 GET route=q
    try {
        const url4 = `https://www.fast2sms.com/dev/bulkV2?authorization=${key}&route=q&message=${encodeURIComponent(`Your Shree Finance OTP code is ${otp}`)}&language=english&flash=0&numbers=${phone}`;
        const res4 = await fetch(url4);
        const data4 = await res4.json();
        console.log("Method 4 (bulkV2 GET route=q):", data4);
    } catch (e) {
        console.error("Method 4 Error:", e);
    }
}

testFast2SMS();
