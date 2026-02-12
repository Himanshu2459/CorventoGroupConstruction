import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { contactAPI } from '../services/api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    area: '',
    work: '',
    projectType: 'house',
    budget: '',
    location: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 SANITIZE DATA FOR BACKEND
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ''), // remove +91, spaces
        area: formData.area.trim(),
        work: formData.work.trim(),
        projectType: formData.projectType,
        budget: formData.budget.trim(),
        location: formData.location.trim(),
        message: formData.message.trim()
      };

      await contactAPI.submit(payload);

      toast.success('Registration successful! We will contact you soon.', {
        position: 'top-right',
        autoClose: 5000
      });

      // RESET FORM
      setFormData({
        name: '',
        email: '',
        phone: '',
        area: '',
        work: '',
        projectType: 'house',
        budget: '',
        location: '',
        message: ''
      });

    } catch (error) {
      toast.error(
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        'Registration failed',
        { position: 'top-right', autoClose: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />

      <section className="section">
        <div className="container">
          <form onSubmit={handleSubmit} className="register-form">
            <h2>Register Your Project</h2>

            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              placeholder="8840971046"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label>Area / Location *</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />

            <label>Type of Work *</label>
            <input
              type="text"
              name="work"
              value={formData.work}
              onChange={handleChange}
              required
            />

            <label>Project Type *</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
            >
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
              <option value="renovation">Renovation</option>
              <option value="other">Other</option>
            </select>

            <label>Budget</label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />

            <label>Detailed Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <label>Additional Details *</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Register Now'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;
