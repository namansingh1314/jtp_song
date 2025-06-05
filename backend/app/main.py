import logging

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .recommender import SongRecommender


class RecommendationItem(BaseModel):
    filename: str
    label: str

class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]


# Configure a basic logger
logger = logging.getLogger("song_recommender_api")
logging.basicConfig(level=logging.INFO)

app = FastAPI()
recommender = SongRecommender()


class RecommendationRequest(BaseModel):
    song_title: str
    num_recommendations: int = 5


@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(request: RecommendationRequest):
    try:
        recommendations = recommender.recommend(
            request.song_title, request.num_recommendations
        )
        

        
        items = [RecommendationItem(**rec) for rec in recommendations]
        return {"recommendations": items}
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err))
    except Exception as exc:
        logger.exception("Unexpected error during recommendation")
        raise HTTPException(
            status_code=500, detail="Unexpected server error. Please try again later."
        )
