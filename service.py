from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate
import os
from dotenv import load_dotenv

load_dotenv()

# Groq LLM API Key
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

def get_groq_answer(model: str, prompt_template: str, question: str) -> str:
    print(f"Generating answer using model: {model}")

    llm = ChatGroq(
        api_key=GROQ_API_KEY,
        model=model,  # Uses user-selected LLM model
        temperature=0,
    )

    print("ChatGroq object created")

    # Use user's prompt template
    # formatted_prompt = prompt_template

    # Create the prompt chain
    prompt = ChatPromptTemplate.from_messages([
        ("system", prompt_template), 
        ("user", "{input}")
    ])

    chain = prompt | llm
    print("Chain object created")

    response = chain.invoke({"input": question})

    print("Response received from Groq LLM API")
    answer = response.content

    return answer
