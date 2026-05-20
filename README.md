# Makdi Raksha Dal (MRD) — Platform Command Center

A premium digital political movement platform built for the modern internet generation. Features a highly disciplined cyber-intelligence command center aesthetic, advanced dashboard controls, and secure application onboarding workflows.

## Technology Stack

- **Frontend**: React + Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js + Express.js, JWT, Helmet, Express Rate Limiter, Express Mongo Sanitize
- **Database**: MongoDB Atlas (with seamless automated local mock fallback)

---

## Directory Layout

```
makdi-raksha-dal/
├── package.json         # Root orchestrator
├── README.md            # Setup guide
├── backend/             # Express server API
└── frontend/            # Vite + React app
```

---

## Setup & Running Instructions

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed (v16+ recommended).

### 2. Installation
Run the following command in the root folder to install dependencies for both the frontend and backend:
```bash
npm run install:all
```

### 3. Environment Setup
Configure the environment variables. 
- Create a `.env` file in the `backend` directory based on `backend/.env.example`
- Configure `PORT`, `JWT_SECRET`, and `MONGO_URI`.

### 4. Running the Project
To run both the backend server and frontend development server concurrently:
```bash
npm run dev
```
- **Frontend** runs on: `http://localhost:5173`
- **Backend API** runs on: `http://localhost:5000`

---

## Credentials for Command Panel
Access the Admin Command Center:
- **URL**: `http://localhost:5173/admin`
- **Email**: `admin@mrd.in`
- **Password**: `MRDCommandCenter2026`
