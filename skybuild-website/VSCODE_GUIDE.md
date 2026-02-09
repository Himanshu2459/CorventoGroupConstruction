# Running Skybuild Website in VS Code

Complete step-by-step guide to run your Skybuild construction website in Visual Studio Code.

---

## 📋 Prerequisites (Install These First)

### 1. Node.js (Required)
Download and install from: https://nodejs.org/

**Install the LTS version (recommended)**

To verify installation, open Command Prompt/Terminal and type:
```bash
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.6.7
```

### 2. MongoDB (Required)

**Option A - MongoDB Local (For Development):**
- Download from: https://www.mongodb.com/try/download/community
- Install with default settings
- MongoDB will run automatically on Windows

**Option B - MongoDB Atlas (Recommended - Free Cloud Database):**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account
- Create a free cluster (M0)
- Get connection string (we'll use this later)

### 3. Visual Studio Code (VS Code)
Download from: https://code.visualstudio.com/

**Recommended VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- MongoDB for VS Code (optional)

---

## 📁 Step 1: Extract and Open Project

1. **Extract the ZIP file** you downloaded
2. Open VS Code
3. Click **File → Open Folder**
4. Navigate to and select the **`skybuild-website`** folder
5. Click **Select Folder**

You should see this structure in VS Code:
```
skybuild-website/
├── frontend/       ← Frontend (React)
├── backend/        ← Backend (Node.js)
├── README.md
├── UPDATES.md
└── EMAIL_SETUP.md
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Open Terminal in VS Code

- Press **Ctrl + `** (backtick) or go to **View → Terminal**
- You'll see a terminal at the bottom of VS Code

### 2.2 Navigate to Backend Folder

Type in terminal:
```bash
cd backend
```

### 2.3 Install Dependencies

```bash
npm install
```

This will take 1-2 minutes. You'll see a progress bar installing packages.

### 2.4 Create Environment File

**Option A - Using Terminal:**
```bash
# For Windows
copy .env.example .env

# For Mac/Linux
cp .env.example .env
```

**Option B - Using VS Code:**
1. In the left sidebar, open `backend` folder
2. Right-click on `.env.example`
3. Click **Copy**
4. Right-click on `backend` folder
5. Click **Paste**
6. Rename the copied file to `.env`

### 2.5 Edit .env File

Click on `.env` file in VS Code to open it. Update these values:

```env
# MongoDB Connection
# Option A - Local MongoDB
MONGODB_URI=mongodb://localhost:27017/skybuild

# Option B - MongoDB Atlas (Recommended)
# MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/skybuild

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Change this to any long random string)
JWT_SECRET=skybuild_super_secret_key_change_this_12345678901234567890

# Email Configuration - IMPORTANT!
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=himanshu.sharmars12@gmail.com
EMAIL_PASS=your-16-digit-gmail-app-password-here
EMAIL_FROM=noreply@skybuild.com

# Client URL
CLIENT_URL=http://localhost:3000
```

**⚠️ IMPORTANT for Gmail:**
- You need to create a Gmail App Password
- Read `EMAIL_SETUP.md` for detailed instructions
- Or follow Quick Steps below

### 2.6 Quick Gmail App Password Setup

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already enabled)
3. Go to **App Passwords** section
4. Create password for "Mail"
5. Copy the 16-digit password (remove spaces)
6. Paste in `.env` file as `EMAIL_PASS`

Example:
```env
EMAIL_PASS=abcdefghijklmnop
```

### 2.7 Save the .env File

Press **Ctrl + S** to save

---

## 🎨 Step 3: Frontend Setup

### 3.1 Open New Terminal

In VS Code:
- Click the **+** icon in terminal panel (to open new terminal)
- OR press **Ctrl + Shift + `**

### 3.2 Navigate to Frontend Folder

In the **NEW terminal**, type:
```bash
cd frontend
```

Make sure you're in the `frontend` folder, not `backend`!

### 3.3 Install Dependencies

```bash
npm install
```

This will take 2-3 minutes to install all React packages.

---

## ▶️ Step 4: Run the Application

Now you should have **TWO terminals open** in VS Code:

### Terminal 1 - Start Backend

Make sure you're in `backend` folder:
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ Connected to MongoDB
```

**If you see errors:**
- MongoDB connection error? Check MONGODB_URI in .env
- Port already in use? Try different port in .env

### Terminal 2 - Start Frontend

Make sure you're in `client` folder:
```bash
npm start
```

After 30-60 seconds, your browser will automatically open to:
```
http://localhost:3000
```

You should see the Skybuild website! 🎉

---

## 🎯 Step 5: Test Everything

### Test the Website

1. **Home Page** - Should load with animations
2. **Projects Page** - Click "Projects" in navbar
3. **Services Page** - Click "Services"
4. **Register Page** - Click "Register" and fill the form
5. **Contact Page** - Click "Contact"

### Test Registration Form

1. Go to: http://localhost:3000/register
2. Fill in all the fields:
   - Name: Test User
   - Phone: +91 9876543210
   - Email: test@example.com
   - Area: Model Town, Ludhiana
   - Work: New House Construction
   - Project Type: House
   - Message: This is a test
3. Click **Register Now**
4. You should see: "Registration successful!"
5. Check your email: **himanshu.sharmars12@gmail.com**

---

## 📂 VS Code Layout Tips

### Recommended Layout:

**Left Sidebar:** File Explorer
**Main Area:** Code editor
**Bottom Panel:** 2 Terminals side by side

To split terminals:
1. Click the split icon in terminal panel
2. You'll see both terminals side by side

### Useful VS Code Shortcuts:

- **Ctrl + `** - Toggle terminal
- **Ctrl + B** - Toggle sidebar
- **Ctrl + P** - Quick file search
- **Ctrl + Shift + F** - Search in all files
- **Ctrl + /** - Comment/uncomment code
- **Alt + Up/Down** - Move line up/down
- **Ctrl + D** - Select next occurrence

---

## 🐛 Common Issues & Solutions

### Issue 1: "npm not recognized"

**Solution:** Node.js not installed properly
- Reinstall Node.js from nodejs.org
- Restart VS Code after installation

### Issue 2: "Cannot find module"

**Solution:** Dependencies not installed
```bash
# In server folder
npm install

# In client folder
npm install
```

### Issue 3: "Port 5000 already in use"

**Solution:** Kill the process or use different port
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Or change port in backend/.env
PORT=5001
```

### Issue 4: "MongoDB connection failed"

**Solutions:**

**For Local MongoDB:**
```bash
# Windows - Start MongoDB
net start MongoDB

# Check if running
mongo --version
```

**For MongoDB Atlas:**
- Check connection string in .env
- Verify username/password
- Check IP whitelist (add 0.0.0.0/0)

### Issue 5: "Email not sending"

**Solutions:**
- Check EMAIL_PASS in .env (must be 16-digit app password)
- Remove all spaces from app password
- Verify 2-Factor Authentication is enabled on Gmail
- Check spam folder in Gmail

### Issue 6: "React app not opening"

**Solution:** 
- Wait 1-2 minutes for compilation
- Manually go to: http://localhost:3000
- Check for errors in terminal

---

## 📝 Daily Development Workflow

### Starting Work:

1. Open VS Code
2. Open skybuild-website folder
3. Open 2 terminals (Ctrl + `)
4. **Terminal 1:** `cd backend && npm run dev`
5. **Terminal 2:** `cd frontend && npm start`
6. Browser opens automatically

### Stopping Work:

1. In both terminals press: **Ctrl + C**
2. Confirm with **Y** when asked
3. Close VS Code

### Making Changes:

**Frontend Changes (React):**
- Edit files in `frontend/src/`
- Changes appear automatically (hot reload)
- No need to restart

**Backend Changes (Node.js):**
- Edit files in `backend/`
- Server restarts automatically (nodemon)
- API changes take effect immediately

---

## 🎨 Customizing Your Website

### Change Company Name/Logo:

**File:** `frontend/src/components/Navbar.js`
```javascript
// Line 35-38
<div className="navbar-logo">
  <span className="logo-sky">YOUR</span>
  <span className="logo-build">NAME</span>
</div>
```

### Change Colors:

**File:** `frontend/src/App.css`
```css
/* Line 2-10 - Change these colors */
:root {
  --color-charcoal: #1a1a1a;
  --color-gold: #d4a574;
  /* etc. */
}
```

### Change Contact Information:

**File:** `frontend/src/components/Footer.js`
```javascript
// Update phone, email, address
```

### Add Projects:

Use Postman or curl to add projects via API (see API_DOCUMENTATION.md)

---

## 📚 Important Files Reference

### Configuration Files:
- `backend/.env` - Backend configuration (MongoDB, Email, etc.)
- `frontend/package.json` - Frontend dependencies
- `backend/package.json` - Backend dependencies

### Main Code Files:
- `frontend/src/App.js` - Main React app with routing
- `frontend/src/pages/` - All page components
- `backend/server.js` - Main backend server
- `backend/routes/` - API endpoints
- `backend/models/` - Database models

### Documentation:
- `README.md` - Complete documentation
- `UPDATES.md` - New features info
- `EMAIL_SETUP.md` - Gmail setup guide
- `QUICKSTART.md` - Quick setup
- `API_DOCUMENTATION.md` - API reference
- `DEPLOYMENT.md` - Deploy to internet

---

## ✅ Checklist

Before starting:
- [ ] Node.js installed
- [ ] MongoDB setup (local or Atlas)
- [ ] VS Code installed
- [ ] Project extracted
- [ ] Folder opened in VS Code

Backend setup:
- [ ] Navigated to server folder
- [ ] Ran `npm install`
- [ ] Created .env file
- [ ] Updated MongoDB URI
- [ ] Added Gmail app password
- [ ] Started server with `npm run dev`

Frontend setup:
- [ ] Navigated to client folder
- [ ] Ran `npm install`
- [ ] Started with `npm start`
- [ ] Website opened in browser

Testing:
- [ ] Website loads at localhost:3000
- [ ] All pages accessible
- [ ] Registration form works
- [ ] Email received at himanshu.sharmars12@gmail.com

---

## 🆘 Need Help?

### VS Code Issues:
- Reinstall VS Code
- Clear terminal: **Ctrl + L**
- Restart VS Code

### Code Issues:
- Read error messages carefully
- Check terminal for errors
- Google the error message

### Still Stuck?
- Check README.md for more details
- Review EMAIL_SETUP.md for Gmail issues
- Verify all steps completed

---

## 🎉 Success!

If you can see the website at http://localhost:3000 and submit the registration form, **you're all set!**

Your Skybuild construction website is now running locally on your computer!

---

**Happy Building! 🏗️**
