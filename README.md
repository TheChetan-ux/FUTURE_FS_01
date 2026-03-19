# FUTURE_FS_01

This repository is organized for multiple tasks. Task 1 is the full stack developer portfolio.

## Structure

```text
FUTURE_FS_01/
  Portfolio/
    backend/
      models/
      routes/
      server.js
    frontend/
      index.html
      style.css
      script.js
```

## Task 1

`Portfolio` contains a professional full stack developer portfolio built with:

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose

## Run The Project

1. Open a terminal in `Portfolio/backend`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `Portfolio/backend`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_db
```

4. Start the backend server:

```bash
npm run dev
```

5. Open `http://localhost:5000`

## API Endpoints

- `POST /api/contact` saves contact form submissions
- `GET /api/contact` fetches all saved contacts
