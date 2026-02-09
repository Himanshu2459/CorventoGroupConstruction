const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Submit contact form
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('area').trim().notEmpty().withMessage('Area/Location is required'),
  body('work').trim().notEmpty().withMessage('Type of work is required'),
  body('projectType').notEmpty().withMessage('Project type is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    
    const contact = await Contact.create(req.body);
    
    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: 'himanshu.sharmars12@gmail.com', // Your email
        subject: `New Registration/Inquiry - ${req.body.name} - ${req.body.work}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: #d4a574; margin: 0; font-size: 28px;">SKYBUILD</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0;">New Client Registration</p>
            </div>
            
            <div style="background: #ffffff; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h2 style="color: #1a1a1a; margin-top: 0; border-bottom: 3px solid #d4a574; padding-bottom: 10px;">Client Details</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold; width: 40%;">Name:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${req.body.name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Email:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="mailto:${req.body.email}" style="color: #d4a574; text-decoration: none;">${req.body.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Phone:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;"><a href="tel:${req.body.phone}" style="color: #d4a574; text-decoration: none;">${req.body.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Area/Location:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${req.body.area}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Type of Work:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;"><strong style="color: #d4a574;">${req.body.work}</strong></td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Project Type:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6; text-transform: capitalize;">${req.body.projectType}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Budget:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${req.body.budget || 'Not specified'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; background-color: #f8f9fa; border: 1px solid #dee2e6; font-weight: bold;">Project Location:</td>
                  <td style="padding: 12px; border: 1px solid #dee2e6;">${req.body.location || 'Not specified'}</td>
                </tr>
              </table>
              
              <h3 style="color: #1a1a1a; margin-top: 30px; border-bottom: 2px solid #d4a574; padding-bottom: 10px;">Message:</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-left: 4px solid #d4a574; margin: 20px 0; line-height: 1.6;">
                ${req.body.message}
              </div>
              
              <div style="margin-top: 30px; padding: 20px; background-color: #f0f0f0; border-radius: 5px; text-align: center;">
                <p style="margin: 0; color: #666; font-size: 14px;">
                  This inquiry was submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
              <p>© ${new Date().getFullYear()} Skybuild. All rights reserved.</p>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue even if email fails
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for contacting us! We will get back to you soon.',
      data: contact 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get all contacts (protected - admin only)
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update contact status (protected - admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
    
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
