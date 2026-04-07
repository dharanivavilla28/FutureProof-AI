import fitz  # PyMuPDF
import spacy
import io

# Load the small English NLP model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Warning: en_core_web_sm not found, skipping deep NLP for now.")
    nlp = None

# A predefined list of skills (this will eventually come from MongoDB/real market data)
KNOWN_SKILLS = {
    "python", "react", "typescript", "tensorflow", "kubernetes", 
    "docker", "sql", "aws", "java", "php", "angular", "langchain", 
    "mlops", "django", "node.js", "express", "mongodb", "fastapi"
}

def extract_text(pdf_bytes: bytes) -> str:
    """Extract text from a PDF byte array using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        for page in doc:
            text += page.get_text()
    except Exception as e:
        print(f"Error parsing PDF: {e}")
    return text

def get_skills(text: str) -> list[str]:
    """Extract skills from text using spaCy and a known skill set."""
    found_skills = set()
    
    if nlp:
        # Use simple tokenization and matching through Spacy
        doc = nlp(text.lower())
        for token in doc:
            # We can expand this with entity recognition if we train a custom model,
            # but for now token/lemma matching against known skills works well.
            if token.text in KNOWN_SKILLS or token.lemma_ in KNOWN_SKILLS:
                found_skills.add(token.text)
    else:
        # Fallback to basic string matching if model isn't loaded
        lower_text = text.lower()
        for skill in KNOWN_SKILLS:
            if skill in lower_text:
                found_skills.add(skill)

    return list(found_skills)
