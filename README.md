# Wedding Portfolio

Portfolio website with React frontend and FastAPI backend.

## Stack

- Frontend: React (Create React App)
- Backend: FastAPI + SQLAlchemy + SQLite

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

### Frontend (.env.local)

- REACT_APP_API_BASE_URL - backend base URL (default: http://localhost:8000)

## Build

From frontend folder:

```bash
npm run build
```

## Notes

- uploads and local database files are ignored by git.
- local virtual environments and node_modules are ignored by git.
