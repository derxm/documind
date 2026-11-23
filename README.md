# DocuMind AI

An AI-powered document intelligence platform. Upload documents, generate summaries, ask questions, create study notes, and build quizzes from your content.

## Tech Stack

| Layer    | Technology                                      |
| -------- | ------------------------------------------------ |
| Frontend | React, Vite, JavaScript, Tailwind CSS            |
| Backend  | Node.js, Express.js, JavaScript                  |
| Database | PostgreSQL, Prisma ORM                           |
| AI       | OpenAI API *(coming soon)*                       |

## Project Structure

```
documind-ai/
├── client/          # React frontend
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       └── services/
├── server/          # Express backend
│   ├── prisma/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       ├── services/
│       └── utils/
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [PostgreSQL](https://www.postgresql.org/) (for database features, not required for initial setup)

## Getting Started

### 1. Clone the repository

```bash
git clone <repo-url>
cd documind-ai
```

### 2. Set up the backend

```bash
cd server
cp .env.example .env    # Edit .env with your configuration
npm install
npm run dev             # Starts the server on http://localhost:3000
```

### 3. Set up the frontend

```bash
cd client
cp .env.example .env    # Edit .env if needed
npm install
npm run dev             # Starts the app on http://localhost:5173
```

### 4. Verify

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Available Scripts

### Client

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start development server     |
| `npm run build`   | Build for production         |
| `npm run preview` | Preview production build     |

### Server

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `npm run dev`            | Start with hot reload (nodemon)    |
| `npm start`              | Start in production mode           |
| `npm run prisma:generate`| Generate Prisma client             |
| `npm run prisma:migrate` | Run database migrations            |
| `npm run prisma:studio`  | Open Prisma Studio                 |

## Environment Variables

Environment variables are configured via `.env` files. See `.env.example` in each project directory for required variables.

> **Important:** Never commit `.env` files. They are excluded via `.gitignore`.

## License

Proprietary — All rights reserved.
