document.getElementById("generateBtn").addEventListener("click", async () => {
    const topic = document.getElementById("topicInput").value.trim();
    const output = document.getElementById("output");
    const spinner = document.getElementById("spinner");

    if (!topic) {
        output.innerHTML = `<span class="text-danger">Please enter a topic.</span>`;
        return;
    }

    output.innerHTML = "";
    spinner.style.display = "block";

    try {
        const response = await fetch("https://api.cohere.ai/v1/generate", {
            method: "POST",
            headers: {
                "Authorization": "Bearer REPLACE_WITH_YOUR_COHERE_KEY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "command",
                prompt: `Tell me a short joke about ${topic}.`,
                max_tokens: 60,
                temperature: 0.8,
            })
        });

        const data = await response.json();
        output.innerText = data.generations[0].text.trim();
    } catch (err) {
        output.innerHTML = `<span class="text-danger">Error: ${err.message}</span>`;
    } finally {
        spinner.style.display = "none";
    }
});


