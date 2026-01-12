def get_custom_css():
    return """
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
    """
