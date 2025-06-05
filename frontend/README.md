# SongRec Frontend

This is the frontend for the SongRec music recommendation app. It’s built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/), and connects to a FastAPI backend (which you’ll need running for anything to work).

## Features

- Modern UI with light & dark mode (click the sun/moon in the navbar)
- Search by song filename or genre and get instant recommendations
- Responsive design (works on your phone, tablet, or whatever)
- About page with project info
- Docker support (I think it works, but I mostly use `npm run dev`)

## Setup

### 1. Install dependencies

npm install

### 2. Start the development server

npm run dev

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Connect to the backend

Make sure you have the backend running at `http://localhost:8000`

## Customization

- You can change the logo by replacing `public/logo.png`.
- Tweak colors and layout in the components or Tailwind config.
- If you want to deploy, you’ll probably need to update the backend API URL.

## Docker

If you want to run the frontend in Docker:

`docker build -t songrec-frontend .`

`docker run -p 3000:3000 songrec-frontend`
