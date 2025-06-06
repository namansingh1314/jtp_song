# Installation & Setup Guide
[![Watch the demo](https://img.youtube.com/vi/TNHCR2FV9fM/maxresdefault.jpg)](https://youtu.be/TNHCR2FV9fM)

## Option 1: Run Everything with Docker Compose

- Make sure you have Docker desktop running
- From the root of the project, just run:

  `docker-compose up --build`

- This will spin up the database, backend, and frontend containers.
- Visit [http://localhost:3000](http://localhost:3000) for the app.


##Option 2:Or you can Run Everything Separately

### 1. Database (PostgreSQL)

- Make sure you have PostgreSQL 15+ installed.
- Create a database called `songrecdb`
- Set up a user 

Or, if you want to use Docker just for the DB:

`docker run --name songrec-db -e POSTGRES_USER=songrec -e`

`s`

### 2. Backend (FastAPI)

- `cd backend`

- `pip install -r requirements.txt`

cd app
python train_model.py # Only needed the first time or if after updating dataset

- `cd ..`

- `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`

- The backend should now be running at [http://localhost:8000]

### 3. Frontend (Next.js)

- `cd frontend`
- `npm install`
- `npm run dev`

- The frontend will be at [http://localhost:3000]

### 4. Environment Variables

- Make sure your frontend knows where the backend is.  
   You can create a `.env.local` in `frontend/` with:
  NEXT_PUBLIC_BACKEND_URL=http://localhost:8000

---

## Option 2: Run Everything with Docker Compose (Recommended)

- Make sure you have Docker and Docker Compose installed.
- From the root of the project, just run:

  `docker-compose up --build`

- This will spin up the database, backend, and frontend containers.
- Visit [http://localhost:3000](http://localhost:3000) for the app.
