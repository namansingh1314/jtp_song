import pandas as pd
from .model_utils import load_model, load_song_data
from .config import csv_file, model_file

class SongRecommender:
    def __init__(self):


        self.song_df = load_song_data(csv_file)
        self.model, self.features = load_model(model_file)

    def recommend(self, query: str, num_recommendations: int = 5):
        """
        Recommend similar songs based on filename or genre.
        """

        if query in self.song_df['filename'].values:
            idx = self.song_df[self.song_df['filename'] == query].index[0]
        else:
            
            matched_indices = self.song_df[self.song_df['label'].str.contains(query, case=False, na=False)].index
            if len(matched_indices) == 0:
                raise ValueError(f"No songs found matching '{query}' as filename or genre.")
            idx = matched_indices[0]



        distances, indices = self.model.kneighbors([self.features.iloc[idx]], n_neighbors=num_recommendations + 1)
        recommendations = self.song_df.iloc[indices[0][1:]]
        
        return recommendations[['filename', 'label']].to_dict(orient='records')
