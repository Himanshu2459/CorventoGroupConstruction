# Skybuild - Construction Company Website

A full-stack website for Skybuild Construction Company, specializing in houses, villas, and kothis construction.

## 🏗️ Features

### Frontend
- **Modern React Application** with React Router for navigation
- **Responsive Design** - Works beautifully on all devices
- **Framer Motion Animations** - Smooth, professional animations
- **Distinctive Design** - Elegant construction-themed aesthetics
- Pages:
  - Home (Hero, Features, Projects showcase)
  - Projects (Filterable portfolio)
  - Services (All construction services)
  - About (Company story, values, team)
  - Contact (Form with validation)

### Backend
- **RESTful API** built with Express.js
- **MongoDB Database** for data persistence
- **JWT Authentication** for admin panel
- **Email Notifications** via Nodemailer
- **Input Validation** with express-validator
- Features:
  - Project management (CRUD operations)
  - Services management
  - Contact form submissions
  - Testimonials system
  - Admin authentication

## 🚀 Tech Stack

### Frontend
- React 18
- React Router DOM
- Framer Motion
- Axios
- React Icons
- React Toastify
- React Intersection Observer

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for emails
- CORS
- Express Validator

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd skybuild-website
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/skybuild
# or MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/skybuild

PORT=5000
NODE_ENV=development

JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@skybuild.com

CLIENT_URL=http://localhost:3000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env file (optional)
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on /api/...

```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 📊 MongoDB Setup

### Local MongoDB
```bash
# Start MongoDB service
mongod

# Or on macOS with Homebrew:
brew services start mongodb-community
```

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Add to `.env` file

### Initial Admin User
To create an admin user, send a POST request to `/api/auth/register`:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@skybuild.com",
    "password": "YourSecurePassword123"
  }'
```

Or use Postman/Insomnia to make the request.

## 📧 Email Configuration

### Gmail Setup
1. Enable 2-factor authentication on your Google account
2. Generate an App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `.env` as `EMAIL_PASS`

### Other Email Providers
Update the SMTP settings in `.env` according to your provider:
- **Outlook:** smtp.office365.com (Port 587)
- **Yahoo:** smtp.mail.yahoo.com (Port 587)
- **Custom SMTP:** Check your provider's documentation

## 🗂️ Project Structure

```
skybuild-website/
├── server/                 # Backend
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Auth middleware
│   ├── controllers/       # Request handlers (optional)
│   ├── uploads/           # File uploads directory
│   ├── server.js          # Entry point
│   ├── package.json
│   └── .env.example
│
├── client/                # Frontend
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── App.js        # Main component
│   │   ├── App.css       # Global styles
│   │   └── index.js      # Entry point
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Public Endpoints

**Projects**
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=villa` - Filter by category
- `GET /api/projects/:id` - Get single project

**Services**
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service

**Contact**
- `POST /api/contact` - Submit contact form

**Testimonials**
- `GET /api/testimonials` - Get approved testimonials

**Auth**
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Create admin (can be disabled in production)

### Protected Endpoints (Require JWT Token)

**Projects**
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

**Services**
- `POST /api/services` - Create service
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

**Contact**
- `GET /api/contact` - Get all contacts
- `PUT /api/contact/:id` - Update contact status

**Testimonials**
- `GET /api/testimonials/all` - Get all testimonials
- `PUT /api/testimonials/:id` - Update/approve testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

## 🔐 Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

Login to get a token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "YourPassword"
  }'
```

## 🎨 Customization

### Colors
Edit `/frontend/src/App.css` to change the color scheme:
```css
:root {
  --color-charcoal: #1a1a1a;
  --color-gold: #d4a574;
  /* ... more colors */
}
```

### Fonts
Currently using:
- **Display:** Playfair Display (Google Fonts)
- **Body:** Outfit (Google Fonts)

Change in `/client/public/index.html`

### Logo
Update the logo in `/client/src/components/Navbar.js`

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, Render)

1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is correct
3. Deploy from GitHub or via CLI

**Example for Heroku:**
```bash
heroku create skybuild-api
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Frontend Deployment (Vercel, Netlify)

1. Build the application:
```bash
cd frontend
npm run build
```

2. Deploy the `build` folder

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
- Drag and drop `build` folder to Netlify
- Or connect GitHub repository

### Environment Variables for Production

Update frontend API URL:
```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## 📝 Sample Data

### Add Sample Project
```javascript
{
  "title": "Modern Villa in Ludhiana",
  "description": "A beautiful 3-bedroom villa with modern amenities",
  "category": "villa",
  "location": "Ludhiana, Punjab",
  "area": { "value": 2500, "unit": "sq ft" },
  "status": "completed",
  "images": [
    { "url": "https://example.com/image.jpg", "caption": "Front view" }
  ],
  "features": ["Swimming Pool", "Garden", "Modern Kitchen"],
  "featured": true
}
```

### Add Sample Service
```javascript
{
  "name": "Villa Construction",
  "shortDescription": "Luxury villas for sophisticated living",
  "description": "We design and build premium villas...",
  "features": ["Custom Design", "Premium Materials", "Warranty"],
  "pricing": { "startingFrom": 2000, "unit": "sq ft" },
  "active": true
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check MongoDB Atlas
- Verify connection string in `.env`
- Check network access in MongoDB Atlas

### Email Not Sending
- Verify SMTP credentials
- Check if 2FA is enabled and app password is used
- Ensure less secure apps is enabled (if applicable)

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email info@skybuild.com or create an issue in the repository.

---

**Built with ❤️ by the Skybuild Team**
