
[![Watch the demo](https://img.youtube.com/vi/9X39FFr7AYM/maxresdefault.jpg)](https://youtu.be/9X39FFr7AYM)

## What’s Inside

- **Frontend:** Next.js + Tailwind CSS
- **Backend:** FastAPI (Python) 
- **Database:** PostgreSQL 
- **Docker:** For easy, all-in-one setup 

---

## Quick Start (with Docker Compose)

The easiest way to get everything running:

- `docker-compose up --build`

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8000](http://localhost:8000)
- Database: runs in a container, data is saved in `./database/data`

---

## Manual Setup (Run Each Part Separately)

### 1. Database

- Make sure PostgreSQL is running (or use the provided Docker Compose service).
- Default config:
  - DB: `songrecdb`
  - User: `songrec`
  - Password: `songrecpass`
  - Port: `5432`

### 2. Backend

- `cd backend`
- `pip install -r requirements.txt`

Make sure your songs.csv is in backend/dataset/
cd app
python train_model.py # Only needed if you change the dataset
cd ..
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

### 3. Frontend

- `cd frontend`
- `npm install`
- `npm run dev`

- The app will be at [http://localhost:3000](http://localhost:3000)




