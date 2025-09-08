# URL Shortener (React + Material UI)

Runs on **http://localhost:3000**.

## Quick Start
```bash
npm install
npm start
```

## Features
- Shorten up to **5 URLs at once**
- Optional **validity** in minutes (default **30**)
- Optional **custom shortcode** (unique, alphanumeric)
- Client-side **redirection**: visit `http://localhost:3000/<code>`
- **Analytics** page with click counts and expiry info
- **Custom logging middleware** stored in localStorage (no console.log)
- Persistence via **localStorage**

## Pages
- `/` – Shortener UI
- `/analytics` – Analytics
- `/:code` – Redirection handler

## Notes
- All data is stored client-side in your browser (no backend).
- Styling uses **Material UI** only, per the brief.
