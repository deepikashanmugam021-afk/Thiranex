# Task Management Application (TaskFlow)

A full-stack task management application with a React + Vite frontend and an Express + MongoDB backend.

## Project structure

- `frontend/` — React/Vite user interface
- `backend/` — Express API, authentication, and MongoDB models

## Requirements

- Node.js (LTS)
- MongoDB connection string

## Configure the backend

1. Open a terminal in `backend/`.
2. Run `npm install`.
3. Copy `.env.example` to `.env`.
4. Add your own MongoDB connection string and a strong JWT secret to `.env`.
5. Run `npm start` (or `npm run dev`).

The API runs on port 5000 by default.

## Run the frontend

1. Open another terminal in `frontend/`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local URL printed by Vite.

Note: the frontend currently calls `http://localhost:5000` for its API. For a public deployment, update the API URL to your deployed backend URL and configure CORS accordingly.

## Security

Never commit `.env` files, database passwords, or JWT secrets to GitHub. Use environment variables in your hosting provider.
