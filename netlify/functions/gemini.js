export async function handler(event) {

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            reply: "🎉 SOMC AI backend is working successfully."
        })
    };

}