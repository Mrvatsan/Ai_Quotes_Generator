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

# Custom CSS for Monochromatic Green Theme
st.markdown("""
<style>
    /* Hide Streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
    
    /* Global Font & Colors */
    html, body, [class*="css"] {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        background-color: #f0fdf4; /* Light Mint Green */
        color: #14532d; /* Dark Forest Green */
    }

    /* Main App Background */
    .stApp {
        background-color: #f0fdf4;
    }

    /* Sidebar Styling */
    section[data-testid="stSidebar"] {
        background-color: #dcfce7; /* Mild Green */
        border-right: 1px solid #86efac;
    }
    
    /* Input Fields */
    .stTextInput > div > div > input {
        background-color: #ffffff;
        color: #15803d;
        border-radius: 8px;
        border: 2px solid #86efac; /* Mid Green */
        padding: 10px;
    }
    .stTextInput > div > div > input:focus {
        border-color: #16a34a; /* Strong Green */
        box-shadow: 0 0 0 2px #bbf7d0;
    }

    /* Quote Cards */
    .quote-card {
        background-color: #ffffff;
        padding: 2rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        border-left: 6px solid #22c55e; /* Bright Green Accent */
        box-shadow: 0 4px 15px rgba(22, 163, 74, 0.1);
        transition: transform 0.2s;
    }
    .quote-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(22, 163, 74, 0.15);
    }
    .quote-text {
        font-size: 1.25rem;
        font-weight: 600;
        color: #14532d; /* Deep Green */
        line-height: 1.6;
        margin-bottom: 0.5rem;
        font-style: italic;
    }
    .quote-meta {
        font-size: 0.75rem;
        color: #16a34a; /* Mid Green */
        text-transform: uppercase;
        letter-spacing: 1.5px;
        font-weight: 700;
        margin-top: 1rem;
    }
    
    /* Buttons */
    .stButton > button {
        width: 100%;
        border-radius: 8px;
        background-background: #16a34a;
        background-color: #16a34a; /* Strong Green */
        color: white;
        border: none;
        padding: 0.75rem 1rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        transition: background-color 0.2s;
    }
    .stButton > button:hover {
        background-color: #15803d; /* Darker Green */
        color: #f0fdf4;
    }
    
    /* Headers */
    h1, h2, h3 {
        color: #14532d !important;
    }
    
    /* Label Colors */
    .stTextInput > label, .stMarkdown p {
        color: #15803d !important;
    }
</style>
""", unsafe_allow_html=True)

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
