# Song Recommendation Backend

This is the backend for the Song Recommendation System. It’s built with FastAPI and uses a simple hybrid ML model (genre + tempo) to suggest songs.

## Setup

- Needs Python 3.10+ and pip
- Install requirements:  
  pip install -r requirements.txt

- Put your `songs.csv` in `backend/dataset/`  
  (columns: `filename`, `label`, `tempo`)

## Training

Train the model first or the API won’t work:
cd backend/app
python train_model.py

If you get errors about missing columns, check your csv file (I messed this up at first).

## Running

From `backend`:
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

## Usage

POST `/recommend` with:
{
"song_title": "jazz" // or "jazz.00025.7.wav"
}

You get recommended songs back.

## Notes

- Only tested on Windows so far.
- If you change the csv, retrain the model or it breaks.
- Sorry for any typos, wrote this quick!
