async function listAllModels() {
    const response = await fetch("http://localhost:11434/api/tags", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    avaiableModels = result.models;
    avaiableModels.map((model) => {
        modelSelect.innerHTML += `<option value="${model.name}">${model.name}</option>`
    })

    if (currentModel === "") {
        currentModel = avaiableModels[0].name;
    }
    return result;
}

listAllModels();

modelSelect.addEventListener("change", () => {
    currentModel = modelSelect.value;
    console.log("current model: ", currentModel);
})
