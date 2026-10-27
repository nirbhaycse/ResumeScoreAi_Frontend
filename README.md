# ResumeScore AI — Frontend

A React frontend for a resume-evaluation application. The project is organized into login, dashboard, history, and admin views, with supporting utilities for authentication and API communication.

**Live Demo:** https://resume-score-ai-frontend.vercel.app/  
**Repository:** https://github.com/nirbhaycse/ResumeScoreAi_Frontend

## Overview

ResumeScore AI is intended to provide a user interface for a resume-review workflow. This repository contains the frontend application; resume scoring, AI processing, or other server-side behaviour depends on the services connected to it and should be verified separately.

## Application Routes

The current React router defines these views:

- `/` — Login
- `/dashboard` — Dashboard
- `/history` — History
- `/admin` — Admin

The application also includes a shared sidebar component.

## Tech Stack

- React 19
- JavaScript (ES modules)
- Vite
- React Router
- Material UI
- Emotion
- Axios
- Firebase

## Getting Started

### Prerequisites

- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/nirbhaycse/ResumeScoreAi_Frontend.git
cd ResumeScoreAi_Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal.

### Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the configured lint command:

```bash
npm run lint
```

## Project Structure

```text
src/
├── component/
│   ├── Admin/
│   ├── Dashboard/
│   ├── History/
│   ├── Login/
│   └── SideBar/
├── utils/
│   ├── AuthContext.jsx
│   ├── axios.js
│   └── firebase.jsx
├── App.jsx
└── main.jsx
```

## Configuration Notes

The application includes Firebase and Axios utilities. Before running it in a new environment:

- Check the configuration files for required Firebase settings.
- Check the API utility for the backend base URL and required endpoints.
- Keep private keys, credentials, and secret values out of the repository.
- Use environment variables for deployment-specific configuration where appropriate.

The exact backend requirements should be confirmed from the connected service and source code.

## What I Practised

- Organizing a React application into route-based views.
- Creating shared UI components.
- Using Material UI to build interface elements.
- Structuring API and authentication utilities.
- Running and building a Vite-based frontend.

## Potential Improvements

- Document the expected backend endpoints and request/response formats.
- Add screenshots of the actual application.
- Add form validation and accessible feedback for errors.
- Add tests for important routes and interactions.
- Document which resume-analysis features are implemented in this frontend versus provided by a backend service.

## Author

**Nirbhay Chandra Maurya**  
GitHub: https://github.com/nirbhaycse

---

This repository documents the frontend. Do not rely on a displayed score or AI-related label as evidence of model accuracy without separate validation of the underlying service.
