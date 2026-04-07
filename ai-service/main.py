from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
import nlp_parser
import forecaster
import graph_engine
import ml_predictor

app = FastAPI(title="FutureProof AI Microservice")

class ROIOptions(BaseModel):
    targetRole: str
    currentSkills: list[str] = []
    
class StressTestOptions(BaseModel):
    role: str
    year: int = 2030

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ai-service"}

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    """Extract skills from a PDF resume using NLP."""
    try:
        pdf_bytes = await file.read()
        text = nlp_parser.extract_text(pdf_bytes)
        skills = nlp_parser.get_skills(text)
        return {
            "found": skills,
            "raw_text_length": len(text)
        }
    except Exception as e:
        return {"error": str(e)}

@app.get("/svi")
def compute_svi():
    """Returns the forecasted Skill Volatility Index for all tracked skills."""
    return {"skills": forecaster.get_skill_volatility(), "model": "ARIMA"}

@app.get("/synergy")
def compute_synergy():
    """Returns the graph network mapping of co-occurring job skills."""
    return graph_engine.compute_subgraph([])

@app.post("/roi")
def compute_roi(opts: ROIOptions):
    """Computes shortest path in graph network to target job role."""
    # Graph shortest_path function
    target_skill = opts.targetRole.split()[-1] # Simplistic mock extraction
    return graph_engine.shortest_path(opts.currentSkills, target_skill)

@app.post("/stress-test")
def compute_stress_test(opts: StressTestOptions):
    """Predicts future job readiness using ML and forecasted data."""
    # We would grab the user's latest parsed skill_vector from DB here
    # Since this is decoupled, let's just use some mock core skills if empty
    vector = ["jquery", "react", "php", "javascript"] 
    return ml_predictor.predict_readiness(vector, opts.role, opts.year)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
