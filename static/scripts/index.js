const userQuery = document.getElementById("user-query");
const chatSend = document.getElementById("chat-send");
const chatThread = document.getElementById("chat-thread");
const helloSection = document.getElementById("hello-section");
const modelSelect = document.getElementById("model-select");
const ollamaStatus = document.getElementById("ollama-status");
let chatHistory = [
    {
        content: "You're a helpful assistant! Do not respond something unnecessarily than what is asked..",
        role: "system",
    },
    {
        content: "What can I do for you today?",
        role: "assistant",
    }]

let avaiableModels = [];
let currentModel = "";

window.onload = () => {
    // get q= value from query string
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const q = urlParams.get("q");
    if (q) {
        userQuery.value = q;
    }
}

window.onload = async () => {
    try {
        const response = await fetch("http://localhost:11434/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
        });
        if (response.ok) {
            const result = await response.text(); // Parse JSON
            ollamaStatus.innerText = result; // Assuming result is a string
        } else {
            ollamaStatus.innerText = "Ollama is offline";
        }
    } catch (error) {
        ollamaStatus.innerText = "Ollama is offline";
    }
}