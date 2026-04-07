import pandas as pd
import numpy as np
from statsmodels.tsa.arima.model import ARIMA
import warnings
warnings.filterwarnings("ignore")

# Define initial mock skill demand dataset to simulate real historic data
# In a full production system, this data would be fetched continuously from MongoDB
HISTORICAL_DEMAND = {
    "python":      [70, 75, 78, 80, 85, 90, 92, 95, 96, 96, 97, 98],
    "react":       [60, 65, 68, 72, 75, 78, 82, 85, 87, 88, 88, 89],
    "typescript":  [45, 50, 55, 60, 65, 70, 75, 78, 82, 85, 88, 90],
    "langchain":   [5,  10, 25, 40, 50, 65, 75, 80, 85, 90, 93, 95],
    "mlops":       [20, 25, 30, 40, 50, 60, 70, 75, 82, 88, 92, 94],
    "kubernetes":  [40, 45, 55, 65, 75, 80, 85, 88, 90, 91, 92, 93],
    "aws":         [60, 65, 70, 75, 80, 82, 85, 87, 88, 89, 90, 91],
    "java":        [85, 85, 84, 82, 80, 78, 77, 76, 75, 74, 73, 72],
    "php":         [60, 58, 55, 52, 50, 48, 46, 45, 43, 42, 41, 40],
    "angular":     [70, 68, 66, 65, 63, 62, 60, 58, 57, 56, 55, 54]
}

def generate_forecast(time_series: list, steps=3) -> float:
    """Uses ARIMA to predict future demand and calculates the projected growth rate."""
    try:
        model = ARIMA(time_series, order=(1, 1, 0))
        fit_model = model.fit()
        forecast = fit_model.forecast(steps=steps)
        future_demand = forecast.iloc[-1]
        
        current_demand = time_series[-1]
        growth = (future_demand - current_demand) / max(current_demand, 1)
        return float(growth)
    except Exception as e:
        print(f"Forecasting error: {e}")
        return 0.0

def get_skill_volatility() -> list:
    """Computes SVI for all tracked skills based on historical data & ML forecasts."""
    results = []
    
    for skill, hist in HISTORICAL_DEMAND.items():
        growth_rate = generate_forecast(hist, steps=6)
        
        # Calculate artificial SVI (0-100) based on current demand + forecasted growth trajectory
        current_demand = hist[-1]
        svi_score = min(100, max(0, current_demand + (growth_rate * 100)))
        
        # Determine status
        if svi_score >= 80 and growth_rate > 0.1:
            status = 'rising'
        elif svi_score >= 60 and growth_rate >= -0.05:
            status = 'stable'
        elif svi_score >= 40:
            status = 'declining'
        else:
            status = 'obsolete'
            
        # Category heuristic (simplified)
        cat = 'language'
        if skill in ['react', 'angular']: cat = 'frontend'
        elif skill in ['langchain', 'mlops']: cat = 'ai'
        elif skill in ['kubernetes', 'aws']: cat = 'devops'
        
        results.append({
            "name": skill.capitalize(),
            "svi": round(svi_score),
            "demand": current_demand,
            "growth": round(growth_rate, 2),
            "category": cat,
            "status": status
        })
        
    return results
