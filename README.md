## 🎬 Find My Movie — Frontend

Modern movie discovery platform built with React + TailwindCSS, powered by a secure Express backend proxy.

## 🔗 Live App:
https://find-my-movie-xi.vercel.app/

## 🚀 Features

🔍 Real-time movie search

📄 Dynamic movie details page

📊 Trending search analytics

📑 Smart pagination system

⚡ Debounced search

🎨 Cinematic UI with TailwindCSS

🏗 Architecture
```
User
  ↓
Frontend (Vercel)
  ↓
Backend API (Render)
  ↓
TMDB
```


🔐 The frontend does NOT directly call TMDB.
All API requests go through a secure backend proxy.

Backend Repo:
👉 https://github.com/yousuffff/findmymovie-backend

## 🛠 Tech Stack

React (Vite)
React Router
TailwindCSS
Appwrite (Trending analytics)
Fetch API

## ⚙️ Local Setup
```bash
git clone https://github.com/yousuffff/FindMyMovie.git
cd findmymovie
npm install
npm run dev
```
## 🌍 Deployment

Hosted on Vercel
Connected to Render backend API

## 💡 What This Project Demonstrates

Production-ready frontend architecture 

Secure API handling

Real-world problem solving (geo-restricted API)

Clean component structure

Modern UI/UX design
