const AIprompt = "Give a one word answer to categorise the following note: "
const APIurl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.API_KEY}`
console.log(APIurl)

async function postAIQuery(title: string, content: string) {
    // returns the response of an AI query
    const response = await fetch(APIurl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [{
                parts: [{ text: `${AIprompt} note title: ${title}, note content: ${content}` }]
            }]
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to connect to Gemini");
    }

    const data = await response.json();
    return data;
}


export async function getSemanticLabel(title: string, content: string) {
    const AIresponse = await postAIQuery(title, content)
    console.log(AIresponse)
    const semanticLabel = AIresponse.candidates.content.parts.text
    return semanticLabel
}
