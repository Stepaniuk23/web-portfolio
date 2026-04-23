# Wedding Portfolio

Portfolio website with React frontend and FastAPI backend.

## Stack

- Frontend: React (Create React App)
- Backend: FastAPI + SQLAlchemy + PostgreSQL

## Project Structure

- frontend - client application
- backend - API, admin panel, file storage, database

## Quick Start

### 1. Backend

From the backend folder:

1. Create and activate virtual environment (if needed).
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create environment file from example:

```bash
cp .env.example .env
```

4. Run server:

```bash
uvicorn main:app --reload
```

Backend runs on http://localhost:8000

### 2. Frontend

From the frontend folder:

1. Install dependencies:

```bash
npm install
```

2. Create environment file from example:

```bash
cp .env.example .env.local
```

3. Run development server:

```bash
npm start
```

Frontend runs on http://localhost:3000

## Environment Variables

### Backend (.env)

See backend/.env.example

Expected database format:

```bash
DATABASE_URL=postgresql+psycopg2://postgres:your-password@localhost:5432/wedding_portfolio
```

Also set frontend public URL used by admin Share button:

```bash
FRONTEND_PUBLIC_URL=https://denysstepaniuk.com
```

### Frontend (.env.local)

- REACT_APP_API_BASE_URL - backend base URL (default: http://localhost:8000)

## Build

From frontend folder:

```bash
npm run build
```

## Notes

- uploads are ignored by git.
- local virtual environments and node_modules are ignored by git.
