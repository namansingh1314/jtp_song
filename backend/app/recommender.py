import pandas as pd
from .model_utils import load_model, load_song_data
from .config import csv_file, model_file

class SongRecommender:
    def __init__(self):
        self.song_df = load_song_data(csv_file)
        self.model, self.features = load_model(model_file)

    def recommend(self, query: str, num_recommendations: int = 5):
        """Recommend songs strictly matching the emotion (Sentiment_Label).
        Picks randomly from all songs with that emotion."""
        

        filtered = self.song_df[self.song_df['Sentiment_Label'].str.lower() == query.lower()]
        if filtered.empty:
            raise ValueError(f"No songs found matching emotion '{query}'.")

        filtered = filtered.drop_duplicates(subset=['Song_Name', 'Artist', 'Sentiment_Label'])
        recommendations = filtered.sample(
            n=min(num_recommendations, len(filtered)),
            random_state=None
        )


        
        return recommendations[['Song_Name', 'Artist', 'Sentiment_Label']].to_dict(orient='records')
