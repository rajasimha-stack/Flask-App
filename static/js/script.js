document.addEventListener("DOMContentLoaded", function () {
    const modelDropdown = document.getElementById("model-select");
    const promptTemplate = document.getElementById("prompt-template");
    const userQuestion = document.getElementById("user-question");
    const submitButton = document.getElementById("submit-btn");
    const answerField = document.getElementById("answer");
    const loader = document.getElementById("loader");

    // Define prompt templates for each model
    const templates = {
        "llama-3.3-70b-versatile": `You are a chatbot that answers questions.

        **Instructions**
        1. Read the question from the user properly.
        2. Answer the question to the best of your ability.
        3. If you don't know the answer, say "I don't know".

        **Question**: {{question}}

        **Answer**:`,

        "gemma2-9b-it": `You are a helpful assistant designed to provide insightful answers.

        **Instructions**
        1. Understand the question's intent.
        2. Respond with clarity and precision.
        3. Provide sources if relevant.

        **Question**: {{question}}

        **Answer**:`,

        "qwen-2.5-32b": `You specialize in answering complex queries with detailed reasoning.

        **Question**: {{question}}

        **Answer**:`,

        "qwen-2.5-coder-32b": `You assist with programming-related queries.

        **Instructions**
        1. If a code snippet is requested, provide an accurate example.
        2. If explaining, give step-by-step instructions.

        **Question**: {{question}}

        **Answer**:`,

        "deepseek-r1-distill-qwen-32b": `Your goal is to simplify complex topics.

        **Instructions**
        1. Provide clear and concise explanations.
        2. Use examples when necessary.

        **Question**: {{question}}

        **Answer**:`,

        "deepseek-r1-distill-llama-70b": `Provide high-level analysis and insights.

        **Instructions**
        1. Analyze the question with depth.
        2. Respond with well-structured information.

        **Question**: {{question}}

        **Answer**:`
    };

    // Auto-fill the prompt template when a model is selected
    modelDropdown.addEventListener("change", function () {
        promptTemplate.value = templates[this.value] || "";
    });

    // Send the user question to the backend
    submitButton.addEventListener("click", async function () {
        const model = modelDropdown.value;
        const question = userQuestion.value;
        const prompt = promptTemplate.value;

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
                body: JSON.stringify({ model, question, prompt })
            });
            const data = await response.json();
            answerField.innerText = data.answer;
        } catch (error) {
            answerField.innerText = "Error fetching answer.";
        }
        
        loader.style.display = "none";
    });
});
