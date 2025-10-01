# Barber Study Backend (Express + Mongoose + TypeScript)

Welcome to the API that powers the Barber Study App. It serves quiz questions, grades attempts, tracks history, and exposes admin tools for content and analytics. Trim your code, not just fades. 💈✂️

## Features at a Glance

- Express API with TypeScript typings
- JWT authentication with roles: `student` and `admin`
- Quiz engine: start, submit, detailed feedback (including unanswered)
- Question CRUD for admins
- Analytics endpoints (overview, per‑category accuracy, student stats)
- MongoDB via Mongoose
- Seed script for quick bootstrapping

## Requirements

- Node.js 18+
- npm 9+
- MongoDB Atlas (or local MongoDB)

## Setup

1) Install dependencies
- `cd backend`
- `npm install`

2) Create `.env`
- See `backend/.gitignore` — `.env` is not committed.
- Minimal variables:
  - `MONGO_URI=your-mongodb-uri`
  - `JWT_SECRET=your-super-secret`
  - `JWT_EXPIRES=7d` (recommended)
  - `PORT=4000` (optional; defaults to 4000)

3) Seed data (optional but recommended)
- `npm run seed` — inserts questions if none exist
- `npm run seed:force` — replaces all questions with the seed data
- The seed also creates:
  - Admin: `admin@example.com` / `Admin123!`
  - Student: `student@example.com` / `Student123!`

## Scripts

- `npm run dev` — Start API in watch mode (ts-node-dev)
- `npm run build` — TypeScript build to `dist/`
- `npm run start` — Run compiled server from `dist/`
- `npm run seed` — Seed only if empty
- `npm run seed:force` — Force reseed with updated questions

## API Overview

Base URL: `/api`

- Auth
  - `POST /api/auth/login`
  - `POST /api/auth/register`
- Quiz (requires auth)
  - `POST /api/quiz/start` — body: `{ category?: string }`; returns 50 random questions, optionally filtered by category
  - `POST /api/quiz/submit` — body: `{ attemptId, answers: [{ questionId, selectedKey }] }`
  - `GET  /api/quiz/history` — current user’s attempts
  - `GET  /api/quiz/attempts/:id?wrongOnly=true` — detailed feedback for owner/admin; includes unanswered items when `wrongOnly=false` or counts them as wrong when `true`
- Questions (admin)
  - `GET  /api/questions`
  - `POST /api/questions`
  - `PUT  /api/questions/:id`
  - `DELETE /api/questions/:id`
- Analytics (admin)
  - `GET /api/analytics/overview?userId=…`
  - `GET /api/analytics/categories?userId=…`
  - `GET /api/analytics/student-stats?userId=…`

Health check: `GET /health` → `{ status: 'ok' }`

## Data Models (brief)

- `User` — `{ email, name, role, passwordHash }`
- `Question` — `{ category, text, options[{ key, text }], correctKey, explanation?, createdBy }`
- `QuizAttempt` — `{ userId, questionIds[], answers[{ questionId, selectedKey, isCorrect }], score, submitted }`

Notes:
- When submitting a quiz, unanswered questions are treated as incorrect for scoring. We persist only answered items to satisfy schema validation.

## Development Notes

- Source: TypeScript in `backend/` → compiled to `dist/`
- Error handling: centralized middleware forwards JSON errors
- Auth: set `Authorization: Bearer <token>` for protected routes

## Deployment Tips

- Works great on Heroku / Render / Railway
  - Monorepo tip for Heroku: set `PROJECT_PATH=backend` and add a `heroku-postbuild` to run `npm run build`
- Env vars: set `MONGO_URI`, `JWT_SECRET`, `JWT_EXPIRES`, and optionally `PORT`

May your responses be as clean as a fresh lineup. 😎

