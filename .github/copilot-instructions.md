# GitHub Copilot Project Instructions

## 📝 Project Name: Pomotomo (ポモとも！)

### 🎯 Project Purpose
Pomotomo is a simple, friendly web app that allows friends to share a synchronized Pomodoro timer in a virtual “room.” Users can start working at the same time and take breaks together. It's designed for real-time shared focus, not for task management.

---

## 🧱 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Hono (Node.js, TypeScript)
- **State Management**: React Hooks, Jotai (if needed)
- **Package Manager**: pnpm
- **Design**: Responsive (Mobile + Desktop)
- **Data Persistence**: None — all room/timer state is in-memory

---

## 📦 Features

### Rooms
- A room has a unique name (max 20 characters, alphanumeric only)
- Max 10 participants per room
- Joining a room synchronizes the timer to the current phase

### Pomodoro Timer Logic
- 25 min work → 5 min break → repeat 4 times → long break (15 min)
- All timer state is managed on the server
- Users joining mid-cycle sync to the current timer state
- Timer resets if all users leave the room

### API (REST)
- `POST /rooms`: create room (if name is unused)
- `POST /rooms/:roomName/join`: join a room
- `POST /rooms/:roomName/leave`: leave a room
- `GET /rooms/:roomName`: get room info (participants, timer)
- `GET /rooms/:roomName/timer`: get current timer status

---

## 💻 UI/UX
- Home screen → "Start Working" button → Room name input modal
- Timer screen shows: phase (work/break), remaining time, cycle count, participants
- Simple and friendly UI
- Return to home screen on reload

---

## ✅ Rules & Style Guide

- TypeScript only (no JS/JSX)
- Use Tailwind CSS for styling
- Prefer functional components and hooks
- Keep components minimal and composable
- Follow RESTful principles in backend
- Validate inputs and sanitize room names to prevent XSS
- Max 10 users per room (backend enforced)
- User is identified via UUID stored in localStorage

---

## 📁 Directory Structure
```
├── client/ # Frontend (React + TS + Tailwind)
│ ├── src/
│ └── ...
├── server/ # Backend (Hono, TS)
│ └── ...
├── docs/ # swagger.yaml
└── .github/
└── copilot-instructions.md
```

---

## 🔒 Security
- Input validation for room name
- Prevent XSS and injection via room name field
- No authentication for now (anonymous UUIDs only)

---

Copilot should assist with UI components, API handlers, timer logic, and room state synchronization logic across clients while maintaining high cohesion and low coupling principles.
