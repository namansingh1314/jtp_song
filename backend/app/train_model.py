from model_utils import load_song_data, train_recommender, save_model
from config import csv_file, model_file

if __name__ == "__main__":
    print("Loading song data...")
    df = load_song_data(csv_file)


    print("Training hybrid recommender model...")
    model, features = train_recommender(df)
    print(f"Saving trained model to {model_file}...")
    save_model(model, features, model_file)

    print("Model trainng complete.")
