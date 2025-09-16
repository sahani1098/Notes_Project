# 🖥️ Full Stack Notes App – Desktop (Assignment)  

## 📌 Overview  
This is a *desktop note-taking application* built with *React + Electron (frontend)* and a *Python + Node.js hybrid backend, using **MongoDB* and *Redis* for persistence and caching.  

The app allows users to securely *sign up, log in, create, sync, and view notes. It supports **offline-first mode, **real-time synchronization across clients, and comes packaged as a **Windows executable (.exe)*.  

---

## 🔑 Features  

### ✅ Core Features  
- 🔐 *Authentication*: Secure signup/login with hashed + salted passwords.  
- 👤 *User-specific notes*: Each user only sees their own notes.  
- 🔑 *Persistent sessions*: JWT-based login with refresh tokens.  
- 🖥 *Frontend (React + Electron)*  
  - Login/Signup, Dashboard, Settings screens.  
  - Compact/Expand window resizing.  
  - Global state management (Redux/Zustand/Context API).  
  - Lazy loading notes (20 at a time).  
  - Offline-first mode (cached notes sync when online).  
- ⚙️ *Backend (Python + Node.js)*  
  - REST APIs for signup, login, add notes, fetch notes (with pagination).  
  - MongoDB for persistent storage.  
  - Redis caching for faster fetches.  
  - WebSockets for real-time note updates across clients.  
- 📦 *Packaging*: Windows .exe installer for easy installation.  

### 🌟 Additional Features (Good to Have)  
- 👥 Role-based access (User vs. Admin).  
- 🔒 Encrypted local storage for sensitive data.  
- ⚠️ Error handling (invalid login, server unreachable).  
- 📊 API stress testing for load performance.  
- ⬆️ Auto-update flow (future).  

---

## ⚙️ Tech Stack  

- *Frontend*: React, Electron, Redux/Zustand  
- *Backend*: Node.js (Express), Python (API services)  
- *Database*: MongoDB  
- *Cache*: Redis  
- *Auth*: JWT (with refresh tokens)  
- *Packaging*: Electron Builder → .exe  

---

## 🚀 Setup Instructions  

### 🔹 Prerequisites  
- Node.js (>= 18)  
- Python (>= 3.10)  
- MongoDB (local or Atlas)  
- Redis (local or cloud)  

### 🔹 Clone Repository  
```bash
git clone https://github.com/your-username/fullstack-notes-app.git
cd fullstack-notes-app
```

### 🔹 Backend Setup
```bash
# Node.js API
cd backend/node
npm install
npm run dev

# Python API
cd backend/python
pip install -r requirements.txt
python app.py
```

### 🔹 Frontend (Electron + React)
```bash
cd frontend
npm install
npm run electron-dev
```
### 🖥 Running the Executable (.exe)
```bash
Navigate to the dist/ folder.

Run NotesAppSetup.exe to install.

Launch Notes App from desktop/start menu.

Login or Signup to start using the app.
```

### 🎨 Design Choices & Assumptions
```bash

Hybrid backend (Node.js + Python) chosen to demonstrate flexibility.

MongoDB selected for scalability and flexible schema.

Redis used for performance (note fetching, cache invalidation).

JWT chosen for secure stateless authentication.

Offline-first caching ensures usability even without internet.
```
### ⚠️ Limitations & Future Improvements
```bash
Current Limitations

❌ No mobile version yet.

❌ Auto-update not implemented.

❌ Limited admin role management.

❌ Packaging only for Windows (.exe).
```
### Future Improvements
```bash
✅ Add MacOS/Linux builds.

✅ Full-text search for notes.

✅ End-to-end encryption of notes.

✅ Cloud sync with providers (AWS/GCP).

✅ Push notifications for updates.
```
### 📦 Deliverables
```bash
✅ Source code (Frontend + Backend).

✅ Packaged .exe file.

✅ README (this file).
```
