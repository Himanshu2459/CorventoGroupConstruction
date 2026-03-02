# Email Setup Guide for Skybuild

This guide will help you set up email notifications to receive client registrations at **himanshu.sharmars12@gmail.com**.

## Gmail App Password Setup

Since you're using Gmail (himanshu.sharmars12@gmail.com), you need to create an "App Password" for security. Follow these steps:

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account: https://myaccount.google.com
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google," select **2-Step Verification**
4. Follow the prompts to set up 2-Step Verification if not already enabled
5. You'll need your phone to receive verification codes

### Step 2: Generate App Password

1. Once 2-Step Verification is enabled, go back to **Security**
2. Under "Signing in to Google," select **App passwords**
3. You may need to sign in again
4. At the bottom, select **Select app** → Choose "Mail"
5. Select **Select device** → Choose "Other (Custom name)"
6. Type "Skybuild Website" or any name you prefer
7. Click **Generate**
8. Google will show you a 16-digit password like: `abcd efgh ijkl mnop`
9. **Copy this password immediately** (you won't see it again!)

### Step 3: Configure Your .env File

In your `server/.env` file, add:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=himanshu.sharmars12@gmail.com
EMAIL_PASS=abcdefghijklmnop
EMAIL_FROM=noreply@skybuild.com

# Important: Remove all spaces from the app password!
# If Google showed: abcd efgh ijkl mnop
# You should enter: abcdefghijklmnop
```

## Complete .env File Example

Here's what your complete `.env` file should look like:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/skybuild
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skybuild

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_min_32_chars

# Email Configuration - IMPORTANT!
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=himanshu.sharmars12@gmail.com
EMAIL_PASS=your-16-digit-app-password-here
EMAIL_FROM=noreply@skybuild.com

# Client URL
CLIENT_URL=http://localhost:3000
```

## Testing Email Setup

### Option 1: Using the Website

1. Start your backend server: `cd server && npm run dev`
2. Start your frontend: `cd client && npm start`
3. Go to http://localhost:3000/register
4. Fill out the registration form
5. Submit it
6. Check your Gmail inbox (himanshu.sharmars12@gmail.com)

### Option 2: Using curl Command

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Client",
    "email": "test@example.com",
    "phone": "+91 98765 43210",
    "area": "Model Town, Ludhiana",
    "work": "New House Construction",
    "projectType": "house",
    "budget": "50-75 Lakhs",
    "location": "Plot 123, Sector 5",
    "message": "This is a test registration to check if emails are working."
  }'
```

After running this, check your email at himanshu.sharmars12@gmail.com.

## What You'll Receive

When someone registers, you'll get an email with:

**Subject:** New Registration/Inquiry - [Client Name] - [Type of Work]

**Email Content:**
- ✅ Client's full name
- ✅ Email address (clickable)
- ✅ Phone number (clickable)
- ✅ Area/Location
- ✅ Type of work (highlighted)
- ✅ Project type
- ✅ Budget
- ✅ Detailed project location
- ✅ Complete message
- ✅ Submission timestamp

## Troubleshooting

### "Invalid credentials" Error

**Solution:** Make sure you're using the App Password, NOT your regular Gmail password.

```env
# ❌ WRONG - Don't use your regular password
EMAIL_PASS=myregularpassword123

# ✅ CORRECT - Use the 16-digit app password
EMAIL_PASS=abcdefghijklmnop
```

### "Connection timeout" Error

**Solution:** Check your EMAIL_PORT and EMAIL_HOST settings.

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
```

### Not Receiving Emails

1. **Check Spam folder** - Sometimes Gmail marks automated emails as spam
2. **Verify App Password** - Make sure there are NO SPACES in the password
3. **Check Server Logs** - Look for email errors in your terminal where the server is running
4. **Test with Postman** - Use Postman to send a test registration

### "Less secure app access" Message

If you see this, it means you're trying to use your regular password instead of an App Password. Follow the App Password setup steps above.

## Email Security Tips

1. **Never commit .env file to Git** - It's already in .gitignore
2. **Use different app passwords** for different applications
3. **You can revoke app passwords** anytime from Google Account settings
4. **Keep your app password private** - Don't share it with anyone

## For Production Deployment

When deploying to Render, Heroku, or any other platform:

1. Add these environment variables in your hosting platform's dashboard:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=himanshu.sharmars12@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_FROM=noreply@skybuild.com
   ```

2. Never hardcode passwords in your code files

## Alternative: Using a Custom Domain Email

If you want emails to come from @skybuild.com:

1. Purchase a domain (e.g., skybuild.com)
2. Set up email hosting (Google Workspace, Zoho Mail, etc.)
3. Update EMAIL_USER to your custom email
4. Use SMTP settings provided by your email host

## Getting Help

If emails still don't work:

1. Check server console for error messages
2. Verify all environment variables are set correctly
3. Try the curl test command above
4. Make sure MongoDB is running (the contact form needs to save to database)

---

**Your email is now configured to receive client registrations!** 📧

Every time someone fills out the Contact form or Register form, you'll get a beautifully formatted email at himanshu.sharmars12@gmail.com with all their details.
