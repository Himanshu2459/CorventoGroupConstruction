const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');

// Get all projects (with filtering)
router.get('/', async (req, res) => {
  try {
    const { category, status, featured } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured) filter.featured = featured === 'true';
    
    const projects = await Project.find(filter)
      .sort({ featured: -1, createdAt: -1 });
    
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create project (protected - admin only)
router.post('/', protect, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update project (protected - admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete project (protected - admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
