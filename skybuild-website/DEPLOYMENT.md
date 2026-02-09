# Deployment Guide - Skybuild Website

This guide covers deploying the Skybuild website to various platforms.

## Table of Contents
1. [MongoDB Setup](#mongodb-setup)
2. [Backend Deployment](#backend-deployment)
3. [Frontend Deployment](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)

---

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create Cluster**
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Configure Access**
   - Database Access: Create a database user
   - Network Access: Add IP `0.0.0.0/0` (allow from anywhere) or specific IPs

4. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `skybuild`

   Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/skybuild`

### Option 2: Local MongoDB

For development only. Install MongoDB locally and use:
```
MONGODB_URI=mongodb://localhost:27017/skybuild
```

---

## Backend Deployment

### Option 1: Render (Free, Recommended)

1. **Prepare Your Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `skybuild-api`
     - Environment: `Node`
   - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
     - Choose Free plan

3. **Set Environment Variables**
   In Render dashboard, add:
   ```
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secure_random_string
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@skybuild.com
   CLIENT_URL=https://your-frontend-url.com
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your API URL: `https://skybuild-api.onrender.com`

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login and Initialize**
   ```bash
   railway login
   cd backend
   railway init
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set MONGODB_URI=your_mongodb_uri
   railway variables set JWT_SECRET=your_secret
   # ... set all other variables
   ```

4. **Deploy**
   ```bash
   railway up
   ```

### Option 3: Heroku

1. **Install Heroku CLI**
   Download from [Heroku](https://devcenter.heroku.com/articles/heroku-cli)

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create skybuild-api
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set EMAIL_HOST=smtp.gmail.com
   # ... set all other variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Build Application**
   ```bash
   cd frontend
   npm run build
   ```

3. **Configure Environment**
   Create `frontend/.env.production`:
   ```
   REACT_APP_API_URL=https://your-api-url.com/api
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

5. **Alternative: GitHub Integration**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Configure:
     - Framework Preset: Create React App
     - Root Directory: `frontend`
     - Build Command: `npm run build`
     - Output Directory: `build`
   - Add environment variable: `REACT_APP_API_URL`
   - Deploy

### Option 2: Netlify

1. **Build Application**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy via Drag & Drop**
   - Go to [Netlify](https://netlify.com)
   - Drag the `frontend/build` folder to Netlify

3. **Configure Environment**
   - Site settings → Environment variables
   - Add `REACT_APP_API_URL=https://your-api-url.com/api`

4. **Alternative: CLI Deployment**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add:
   ```json
   {
     "homepage": "https://yourusername.github.io/skybuild",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

## Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skybuild

# Server
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=generate_a_very_secure_random_string_here_min_32_chars

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
EMAIL_FROM=noreply@skybuild.com

# Frontend URL
CLIENT_URL=https://your-frontend-domain.com
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://your-backend-domain.com/api
```

### Generating Secure JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Post-Deployment

### 1. Create Admin User

```bash
curl -X POST https://your-api-url.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@skybuild.com",
    "password": "YourSecurePassword123"
  }'
```

Save the returned JWT token!

### 2. Add Sample Data

Use Postman or curl to add projects and services:

```bash
# Login first
curl -X POST https://your-api-url.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "YourPassword"}'

# Add project (use the token from login)
curl -X POST https://your-api-url.com/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Sample Villa",
    "description": "Beautiful villa in Ludhiana",
    "category": "villa",
    "location": "Ludhiana, Punjab",
    "area": {"value": 2500, "unit": "sq ft"},
    "status": "completed",
    "featured": true
  }'
```

### 3. Test Email Functionality

Submit a contact form on your deployed site to verify email sending works.

### 4. Update CORS

In production, update the CORS configuration in `backend/server.js` to only allow your frontend domain:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### 5. Security Checklist

- [ ] JWT_SECRET is secure and random (min 32 characters)
- [ ] MongoDB password is strong
- [ ] Email credentials are app-specific passwords
- [ ] CORS is configured for production domain only
- [ ] `.env` files are in `.gitignore`
- [ ] Admin password is strong
- [ ] HTTPS is enabled (automatic on Vercel/Netlify/Render)

### 6. Performance Optimization

**Backend:**
- Enable compression middleware
- Add rate limiting
- Implement caching for frequently accessed data

**Frontend:**
- Lazy load images
- Code splitting for routes
- Compress images before uploading
- Enable service workers for PWA

---

## Monitoring & Maintenance

### Logs

**Render/Railway/Heroku:**
- Check deployment logs in dashboard
- Enable log drains for persistent logs

### Uptime Monitoring

Consider using:
- [UptimeRobot](https://uptimerobot.com) - Free
- [Pingdom](https://www.pingdom.com)
- [Better Uptime](https://betteruptime.com)

### Database Backups

**MongoDB Atlas:**
- Automatic backups on paid tiers
- Manual export via `mongodump`

```bash
mongodump --uri="mongodb+srv://..." --out=./backup
```

### SSL/HTTPS

- Automatic on Vercel, Netlify, Render
- For custom domains, configure DNS properly

---

## Troubleshooting

### Build Fails
- Check Node.js version compatibility
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Database Connection Fails
- Verify connection string format
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Email Not Sending
- Verify SMTP credentials
- Check if 2FA is enabled and app password is used
- Test email configuration locally first

### CORS Errors
- Update `CLIENT_URL` environment variable
- Check CORS configuration in `server.js`
- Verify frontend API URL is correct

---

## Custom Domain Setup

### Backend (Render/Railway/Heroku)
1. Purchase domain (e.g., api.skybuild.com)
2. Add custom domain in platform settings
3. Update DNS records as instructed
4. Wait for SSL certificate generation

### Frontend (Vercel/Netlify)
1. Purchase domain (e.g., skybuild.com)
2. Add custom domain in platform settings
3. Update DNS records (A record or CNAME)
4. SSL is automatic

---

## Cost Estimates

### Free Tier
- **Backend:** Render/Railway free tier (sleeps after inactivity)
- **Frontend:** Vercel/Netlify free tier
- **Database:** MongoDB Atlas M0 (512MB)
- **Total:** $0/month

### Production Tier
- **Backend:** Render/Railway paid ($7-25/month)
- **Frontend:** Vercel Pro ($20/month) or Netlify Pro ($19/month)
- **Database:** MongoDB Atlas M10 ($57/month)
- **Total:** ~$84-102/month

---

**Need help? Check the main README.md or create an issue!**
