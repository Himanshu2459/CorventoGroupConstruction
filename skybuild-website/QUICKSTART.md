# Skybuild - Quick Start Guide

Get your construction website up and running in 5 minutes!

## Prerequisites
- Node.js installed (v14+)
- MongoDB installed OR MongoDB Atlas account

## Quick Setup

### 1. Extract Files
Extract the `skybuild-website` folder to your desired location.

### 2. Backend Setup (2 minutes)

```bash
# Navigate to backend folder
cd skybuild-website/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings (use notepad, vim, or any editor)
# Minimum required:
# - MONGODB_URI (get from MongoDB Atlas or use local: mongodb://localhost:27017/skybuild)
# - JWT_SECRET (any secure random string)
```

### 3. Frontend Setup (1 minute)

```bash
# Open new terminal, navigate to frontend folder
cd skybuild-website/frontend

# Install dependencies
npm install
```

### 4. Start Development Servers (1 minute)

**Terminal 1 - Backend:**
```bash
cd skybuild-website/backend
npm run dev
```
Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd skybuild-website/frontend
npm start
```
Website opens on: http://localhost:3000

### 5. Create Admin Account (1 minute)

Open a new terminal or use Postman:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@skybuild.com",
    "password": "Admin123!"
  }'
```

## You're Done! 🎉

Visit http://localhost:3000 to see your website!

## Next Steps

1. **Customize Content:**
   - Edit company information in `frontend/src/components/Footer.js`
   - Update contact details
   - Add your logo

2. **Add Projects:**
   - Use the admin account to add projects via API
   - Or use Postman to POST to `/api/projects`

3. **Configure Email:**
   - Set up Gmail app password
   - Update EMAIL_* variables in `.env`

4. **Deploy:**
   - See `DEPLOYMENT.md` for detailed deployment instructions
   - Free options: Render (backend) + Vercel (frontend)

## Common Issues

**MongoDB Connection Error?**
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas and update MONGODB_URI

**Port Already in Use?**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

**Can't install dependencies?**
```bash
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

## File Structure

```
skybuild-website/
├── server/              # Backend (Node.js/Express)
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── server.js       # Main server file
│
├── client/             # Frontend (React)
│   ├── src/
│   │   ├── components/ # Navbar, Footer
│   │   ├── pages/      # Home, Projects, etc.
│   │   └── App.js      # Main React component
│   └── public/
│
├── README.md           # Complete documentation
├── API_DOCUMENTATION.md # API reference
└── DEPLOYMENT.md       # Deployment guide
```

## Resources

- Full Documentation: `README.md`
- API Reference: `API_DOCUMENTATION.md`
- Deployment Guide: `DEPLOYMENT.md`

## Support

Need help? Check the README.md or:
- Create an issue on GitHub
- Email: info@skybuild.com

---

**Happy Building! 🏗️**
