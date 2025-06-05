import pandas as pd
from sklearn.neighbors import NearestNeighbors
import pickle

def load_song_data(csv_path):
    """Load song data from a CSV, ensuring required columns are present."""


    try:
        df = pd.read_csv(csv_path)
    except FileNotFoundError:
        raise ValueError(f"File not found: {csv_path}")
    if not {'filename', 'label'}.issubset(df.columns):
        
        raise ValueError("CSV must contain 'filename' and 'label' columns.")
    df = df.dropna(subset=['filename', 'label'])
    return df

def train_recommender(song_df):
    """Train a NearestNeighbors model using song features."""
    
    features = pd.get_dummies(song_df[['label']])

    
    
    if 'tempo' in song_df.columns:
        features['tempo'] = song_df['tempo']
    model = NearestNeighbors(n_neighbors=10, algorithm='auto')
    model.fit(features)

    return model, features

def save_model(model, features, model_path):
    """Save the trained model and features to disk."""
    with open(model_path, 'wb') as f:


        pickle.dump({'model': model, 'features': features}, f)

def load_model(model_path):
    """Load the trained model and features from disk."""
    with open(model_path, 'rb') as f:
        data = pickle.load(f)

    return data['model'], data['features']
