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
      await contactAPI.submit(formData);
      toast.success('Registration successful! We will contact you soon.', {
        position: 'top-right',
        autoClose: 5000
      });
      
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
      toast.error('Registration failed. Please try again.', {
        position: 'top-right',
        autoClose: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />
      
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Client Registration</h1>
            <p>Register your project details and we'll get back to you promptly</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="register-wrapper">
            <motion.div
              className="register-info"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Why Register?</h2>
              <div className="info-benefits">
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h4>Quick Response</h4>
                    <p>Get a callback within 24 hours</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h4>Free Consultation</h4>
                    <p>Expert advice at no cost</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h4>Custom Quotes</h4>
                    <p>Tailored pricing for your project</p>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">✓</div>
                  <div className="benefit-text">
                    <h4>Priority Service</h4>
                    <p>Registered clients get priority</p>
                  </div>
                </div>
              </div>

              <div className="info-stats">
                <div className="stat">
                  <h3>500+</h3>
                  <p>Registered Clients</p>
                </div>
                <div className="stat">
                  <h3>98%</h3>
                  <p>Satisfaction Rate</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="register-form-section"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="register-form">
                <h2>Register Your Project</h2>
                <p className="form-subtitle">Fill in your details below</p>
                
                <div className="form-section">
                  <h3>Personal Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Project Details</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="area">Area/Location *</label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        placeholder="e.g., Model Town, Ludhiana"
                        value={formData.area}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="work">Type of Work *</label>
                      <input
                        type="text"
                        id="work"
                        name="work"
                        placeholder="e.g., New House Construction"
                        value={formData.work}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="projectType">Project Category *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="kothi">Kothi</option>
                        <option value="commercial">Commercial</option>
                        <option value="renovation">Renovation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="budget">Budget Range</label>
                      <input
                        type="text"
                        id="budget"
                        name="budget"
                        placeholder="e.g., 50-75 Lakhs"
                        value={formData.budget}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="location">Detailed Project Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Detailed address or plot number"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Details *</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Tell us more about your project requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-gold btn-large" disabled={loading}>
                  {loading ? 'Submitting...' : 'Register Now'}
                </button>

                <p className="form-note">
                  * Required fields. We respect your privacy and will never share your information.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
