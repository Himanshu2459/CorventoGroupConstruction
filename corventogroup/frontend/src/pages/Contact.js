import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { contactAPI } from '../services/api';
import './Contact.css';

const Contact = () => {
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
      toast.success('Thank you! We will get back to you soon.', {
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
      toast.error('Something went wrong. Please try again.', {
        position: 'top-right',
        autoClose: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'Phone',
      content: '+91 8840971046',
      link: 'tel:+8840971046'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      content: 'Himanshu.sharmars12@gmail.com',
      link: 'mailto:Himanshu.sharmars12@gmail.com'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Address',
      content: '123 Construction Plaza, Ludhiana, Punjab',
      link: null
    },
    {
      icon: <FaClock />,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 7:00 PM',
      link: null
    }
  ];

  return (
    <div className="contact-page">
      <ToastContainer />
      
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Get In Touch</h1>
            <p>Let's discuss your dream project and bring it to life</p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-wrapper">
            <motion.div
              className="contact-info-section"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2>Contact Information</h2>
              <p>Reach out to us through any of these channels</p>

              <div className="contact-info-cards">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="info-icon">{info.icon}</div>
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link}>{info.content}</a>
                    ) : (
                      <p>{info.content}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="contact-form-section"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send Us a Message</h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                      placeholder="e.g., New Construction, Renovation"
                      value={formData.work}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="projectType">Project Type *</label>
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
                  <label htmlFor="location">Project Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-gold" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
