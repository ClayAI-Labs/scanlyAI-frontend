# ScanlyAI Web App

This is the frontend for ScanlyAI, a receipt scanning and management application built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Upload receipts (PDF or image)
- Extract receipt data using AI (OCR + GPT)
- View extracted merchant, date, total, and itemized details
- Save receipts to history
- Filter and search receipts
- Export receipt history to CSV
- JWT authentication

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- Axios (API calls)
- React Router

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running Locally
```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Environment Variables
Create a `.env` file in the root directory for any environment-specific variables (e.g., API base URL):
```
VITE_API_BASE_URL=https://your-backend-url.com
```

## Deployment
This app can be deployed to any static hosting service (Vercel, Netlify, Cloud Run, etc.).

## Folder Structure
```
src/
  components/      # Reusable UI components
  contexts/        # React context providers
  features/        # Feature modules (auth, home, history, receipt)
  hooks/           # Custom React hooks
  services/        # API service modules
  types/           # TypeScript types
  App.tsx          # Main app component
  main.tsx         # Entry point 
public/
  images/          # Static assets
```

## API Reference
The frontend expects a backend that exposes endpoints for:
- `/extract` (POST): Extract receipt data from uploaded file
- `/receipts` (GET): List all receipts
- `/receipts/{id}` (GET): Get single receipt details
- `/auth/login` (POST): User login
- `/auth/me` (GET): Get current user

## License
MIT

---
For backend setup, see the separate ScanlyAI-backend repository.
