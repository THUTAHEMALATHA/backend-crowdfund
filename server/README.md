👤 Author

FundSpark Team

---

# 📁 server/README.md (Backend)

```md
# 🚀 FundSpark — Backend

Backend API for the FundSpark crowdfunding platform.  
Built with Node.js, Express, and Supabase.

---

## 🧱 Tech Stack

- Node.js
- Express.js
- Supabase (database)
- JWT Authentication
- CORS
- dotenv

---

## ✨ Features

- User registration & login
- JWT protected routes
- Project CRUD
- Donations system
- Rewards support
- Comments support
- Milestones support

---

## 📂 Folder Structure

server/
├── config/
│ └── supabaseClient.js
├── middleware/
│ └── authMiddleware.js
├── controllers/
├── routes/
├── index.js
└── README.md

---

## ⚙️ Environment Variables

Create `.env` inside **server/**

PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret


⚠️ Never commit `.env` to GitHub.

---

## ▶️ Run Server

### Development

```bash
npm run dev

### Production

```bash
npm start

Server runs on:

http://localhost:5000

🔐 Authentication

Protected routes require JWT.

Header format:
Authorization: Bearer <token>

Middleware used:
middleware/authMiddleware.js

🔌 API Endpoints
🔑 Auth

-POST /api/auth/register

-POST /api/auth/login

📁 Projects

-GET /api/projects

-GET /api/projects/:id

-POST /api/projects (protected)

-PUT /api/projects/:id (protected)

-DELETE /api/projects/:id (protected)

💰 Donations

-POST /api/donations/create (protected)

-GET /api/donations/project/:id

🎁 Rewards

-GET /api/rewards/project/:id

-POST /api/rewards (protected)

💬 Comments

-GET /api/comments/project/:id

-POST /api/comments (protected)

🎯 Milestones

-GET /api/milestone/project/:id

-POST /api/milestone (protected)

🚀 Deployment

Recommended:

Backend → Render

Render settings:

Build command: npm install

Start command: npm start

🔒 Security Notes

Use service role key only on backend

Never expose service key to frontend

Always verify JWT in protected routes
