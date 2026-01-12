import streamlit as st
import os
from groq import Groq
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv(".env.local")
load_dotenv() # Fallback to .env

# Configure page settings - MUST BE FIRST
st.set_page_config(
    page_title="AI Quotes",
    page_icon="❇️",
    layout="centered",
    initial_sidebar_state="expanded"
)

from ui_styles import get_custom_css

# Load environment variables
load_dotenv(".env.local")
load_dotenv() # Fallback to .env

# Configure page settings - MUST BE FIRST
st.set_page_config(
    page_title="AI Quotes",
    page_icon="❇️",
    layout="centered",
    initial_sidebar_state="expanded"
)

# Apply Custom Stylies
st.markdown(get_custom_css(), unsafe_allow_html=True)

# Initialize Groq Client
api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    st.error("⚠️ GROQ_API_KEY not found. Please add it to your .env file.")
    st.stop()

client = Groq(api_key=api_key)

# System Prompt
SYSTEM_PROMPT = """
You are an intelligent AI quote generator.
Your task is to generate original, thoughtful, and high-quality quotes.

Rules:
- Quotes must be ORIGINAL (not famous)
- No emojis
- No author names
- Max 20 words per quote
- Tone strictly follows mood

Output format (JSON ONLY):
{
  "quotes": [
    "Quote 1",
    "Quote 2",
    "Quote 3",
    "Quote 4",
    "Quote 5"
  ]
}
"""

def generate_quotes(theme, mood):
    try:
        completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Theme: {theme}\nMood: {mood}"},
            ],
            model="llama-3.3-70b-versatile",
            temperature=0.7,
            response_format={"type": "json_object"},
        )
        data = json.loads(completion.choices[0].message.content)
        return data.get("quotes", [])
    except Exception as e:
        st.error(f"Error generating quotes: {e}")
        return []

# UI Layout
st.title("🌿 ZenQuotes AI")
st.markdown("Generate wisdom from the comfort of nature.")

with st.sidebar:
    st.header("Configurations")
    theme = st.text_input("Theme", placeholder="e.g. Growth")
    mood = st.text_input("Mood", placeholder="e.g. Peaceful")
    
    st.markdown("---")
    generate_btn = st.button("Generate Quotes", type="primary")

if generate_btn:
    if theme and mood:
        with st.spinner("Synthesizing..."):
            quotes = generate_quotes(theme, mood)
            
            if quotes:
                st.markdown(f"<h3 style='color:#15803d;'>Results for: {theme}</h3>", unsafe_allow_html=True)
                for q in quotes:
                    st.markdown(f"""
                    <div class="quote-card">
                        <div class="quote-text">"{q}"</div>
                        <div class="quote-meta">● {theme} • {mood}</div>
                    </div>
                    """, unsafe_allow_html=True)
    else:
        st.warning("⚠️  Please enter both Theme and Mood.")

# Hide footer
hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            </style>
            """
st.markdown(hide_streamlit_style, unsafe_allow_html=True) 
