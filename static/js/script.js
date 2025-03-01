document.addEventListener("DOMContentLoaded", function () {
    const modelDropdown = document.getElementById("model-select");
    const promptTemplate = document.getElementById("prompt-template");
    const userQuestion = document.getElementById("user-question");
    const submitButton = document.getElementById("submit-btn");
    const answerField = document.getElementById("answer");
    const loader = document.getElementById("loader");

    const templates = {
        "llama-3.3-70b-versatile": "You are a chatbot that answers questions...",
        "gemma2-9b-it": "You are an AI assistant trained to provide accurate responses...",
        "qwen-2.5-32b": "You specialize in answering complex queries with detailed reasoning...",
        "qwen-2.5-coder-32b": "You assist with programming-related queries...",
        "deepseek-r1-distill-qwen-32b": "Your goal is to simplify complex topics...",
        "deepseek-r1-distill-llama-70b": "Provide high-level analysis and insights..."
    };

    modelDropdown.addEventListener("change", function () {
        promptTemplate.value = templates[this.value] || "";
    });

    submitButton.addEventListener("click", async function () {
        const model = modelDropdown.value;
        const question = userQuestion.value;
        if (!model || !question) {
            alert("Please select a model and enter a question.");
            return;
        }
        
        loader.style.display = "block";
        answerField.innerText = "";
        
        try {
            const response = await fetch("/get-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ model, question })
            });
            const data = await response.json();
            answerField.innerText = data.answer;
        } catch (error) {
            answerField.innerText = "Error fetching answer.";
        }
        loader.style.display = "none";
    });
});
