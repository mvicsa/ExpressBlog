# 📝 ExpressBlog

A full-stack blog application built with **Express.js** (Backend) and **React.js** (Frontend).  
Supports JWT authentication, protected routes, post creation/editing, and responsive UI.

## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout)
- 📝 Create, Edit, Delete Posts
- 📄 Paginated and Searchable Posts
- 🌙 Dark Mode Support
- 🪪 JWT Access & Refresh Tokens
- 🍪 Secure HTTP-only Cookies
- ⚙️ Global Loading and Alert Contexts

## 🧩 Tech Stack

| Frontend           | Backend            | Other              |
|--------------------|--------------------|--------------------|
| React.js           | Node.js + Express  | Vite               |
| Tailwind CSS       | MongoDB + Mongoose | JWT Auth           |
| React Router       |                   | Axios + Interceptor|

## 📂 Folder Structure

```
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── .env.example
```

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/mvicsa/ExpressBlog.git
cd ExpressBlog
```

### 2. Setup

```bash
npm install
node app.js
```

### 4. Environment Variables

Make sure to configure your `.env` file inside the `root` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGINS=http://localhost:5173
```

## 🧪 Testing

- Run the backend & frontend locally
- Register, login, create/edit posts
- Check token refresh & alerts

## 🌐 Deployment

- Frontend: [Vercel](https://vercel.com/)
- Backend: [Railway](https://railway.app/)

## 📃 License

MIT License — feel free to use and modify.