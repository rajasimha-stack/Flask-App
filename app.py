from flask import Flask, render_template, request
from service import get_groq_answer
import markdown
from markdown.extensions.fenced_code import FencedCodeExtension
from markdown.extensions.codehilite import CodeHiliteExtension

app = Flask(__name__, static_folder='static', template_folder='templates')

LLM_MODELS = [
    "llama-3.3-70b-versatile",
    "gemma2-9b-it",
    "qwen-2.5-32b",
    "qwen-2.5-coder-32b",
    "deepseek-r1-distill-qwen-32b",
    "deepseek-r1-distill-llama-70b"
]

@app.route('/', methods=['GET', 'POST'])
def index():
    answer = None
    selected_model = request.form.get("model", LLM_MODELS[0])
    prompt_template = request.form.get("prompt", "")
    user_question = request.form.get("question", "")

    if request.method == 'POST' and user_question and prompt_template:
        raw_answer = get_groq_answer(selected_model, prompt_template, user_question)

        # Convert Markdown to HTML with syntax highlighting
        answer = markdown.markdown(
            raw_answer,
            extensions=[FencedCodeExtension(), CodeHiliteExtension(linenums=False, guess_lang=True)]
        )

    return render_template("index.html", models=LLM_MODELS, 
                           prompt_template=prompt_template, answer=answer, 
                           selected_model=selected_model, user_question=user_question)

if __name__ == '__main__':
    app.run(debug=True)
