AI Chatbot Project

A full-stack AI chatbot built using React, Flask, and Groq AI.

Tech Stack
Frontend
React
Vite
Axios
CSS
Backend
Flask
Flask-CORS
Groq API
Python-dotenv
Deployment
Frontend: Vercel
Backend: Render
Project Structure
chatbot-project/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── Procfile
│   ├── .env
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── database/
├── api/
├── docs/
├── tests/
└── deployment/
Features
AI chatbot using Groq API
React frontend
Flask REST API backend
Real-time messaging
Modern responsive UI
Production deployment
Environment variable support
GitHub integration
Frontend Setup

Go to frontend folder:

cd frontend

Install dependencies:

npm install

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173
Backend Setup

Go to backend folder:

cd backend

Create virtual environment:

python -m venv venv

Activate virtual environment:

Windows
venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run backend:

python app.py

Backend runs on:

http://127.0.0.1:5000
Environment Variables

Create .env inside backend:

GROQ_API_KEY=your_api_key_here

Get API key from:

https://console.groq.com/keys

Deployment
Frontend Deployment

Frontend deployed using Vercel:

https://vercel.com

Backend Deployment

Backend deployed using Render:

https://render.com

GitHub Commands

Initialize Git:

git init

Add files:

git add .

Commit changes:

git commit -m "Initial commit"

Push to GitHub:

git push origin main
Future Improvements
User authentication
Chat history
Database integration
Voice assistant
File uploads
AI memory
Docker deployment
Streaming responses
Dark mode
Mobile optimization
Author

Abhishek Kumar
