const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');

// Get all approved testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ approved: true })
      .sort({ featured: -1, createdAt: -1 });
    
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all testimonials (protected - admin only)
router.get('/all', protect, async (req, res) => {
  try {
    const testimonials = await Testimonial.find()
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create testimonial
router.post('/', async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ 
      success: true, 
      message: 'Thank you for your testimonial! It will be reviewed shortly.',
      data: testimonial 
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update testimonial (protected - admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    res.json({ success: true, data: testimonial });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete testimonial (protected - admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found' });
    }
    
    res.json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
