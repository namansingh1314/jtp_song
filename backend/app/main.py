
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .recommender import SongRecommender
from fastapi.middleware.cors import CORSMiddleware
from .auth import router as auth_router, get_current_user
from .db import engine, SessionLocal
from .models import Base, SearchHistory, User

class RecommendationItem(BaseModel):
    filename: str
    label: str

class RecommendationResponse(BaseModel):
    recommendations: list[RecommendationItem]

app = FastAPI()
recommender = SongRecommender()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

class RecommendationRequest(BaseModel):
    song_title: str
    num_recommendations: int = 5

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)

@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        recommendations = recommender.recommend(
            request.song_title, request.num_recommendations
        )
        items = [RecommendationItem(**rec) for rec in recommendations]


        if current_user:
            history_entry = SearchHistory(
                user_id=current_user.id,
                query=request.song_title,
                results=[item.dict() for item in items], 
            )
            db.add(history_entry)
            db.commit()

        return {"recommendations": items}
    except ValueError as err:
        raise HTTPException(status_code=404, detail=str(err))
    except Exception as exc:
        raise HTTPException(
            status_code=500, detail="Unexpected server error. Please try again later."
        )
