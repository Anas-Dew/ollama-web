
async function query() {
    if (userQuery.value === "") {
        return alert("Please enter a query!");
    }
    chatThread.innerHTML += `<div class="chat chat-user">${userQuery.value}</div>`
    chatHistory.push({
        content: userQuery.value,
        role: "user",
    });

    userQuery.value = "";

    if (helloSection.style.display !== "none") {
        helloSection.style.display = "none";
    }

    try {
        var llmResponse = "";
        chatSend.disabled = true;
        chatThread.innerHTML += `<div class="chat chat-gpt">></div>`
        const response = await fetch("http://localhost:11434/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
                model: currentModel,
                messages: chatHistory,
                stream: true,
            }),
        });

        // Clear loading before adding actual value.
        // chatThread.lastChild.innerText = "";
        const reader = response.body.getReader();
        let { value, done } = await reader.read();
        while (!done) {
            value = await reader.read();
            const resJSON = new TextDecoder().decode(value.value);
            const resObj = JSON.parse(resJSON);

            llmResponse += `${resObj.message.content}`;
            chatThread.lastChild.innerText += `${resObj.message.content}`;
            
            if (resObj.done) {
                chatThread.lastChild.innerText += `\n\n`;
                chatHistory.push({
                    content: llmResponse,
                    role: "assistant",
                });
                break;
            }
            chatThread.scrollTo(0, 99999)

        }
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        chatSend.disabled = false;

    }
}

chatSend.addEventListener("click", () => {
    query();
});

userQuery.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatSend.disabled === false) {
            query();
        }
    }
})