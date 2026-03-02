import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../services/api';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServices(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const defaultServices = [
    {
      _id: '1',
      name: 'House Construction',
      shortDescription: 'Build your dream home with precision and care',
      description:
        'We specialize in constructing beautiful, functional homes tailored to your lifestyle. From modern minimalist designs to traditional architecture, we bring your vision to life with quality materials and expert craftsmanship.',
      features: ['Custom Design', 'Quality Materials', 'Timely Delivery', 'Warranty Included']
    },
    {
      _id: '2',
      name: 'Villa Development',
      shortDescription: 'Luxury villas designed for sophisticated living',
      description:
        'Create your luxury retreat with our villa development services. We design and construct spacious, elegant villas with premium finishes, modern amenities, and attention to every detail.',
      features: ['Luxury Finishes', 'Spacious Layouts', 'Premium Amenities', 'Landscape Design']
    },
    {
      _id: '3',
      name: 'Kothi Building',
      shortDescription: 'Grand kothis that reflect your prestige',
      description:
        'Build a magnificent kothi that stands as a testament to your success. Our kothi construction services blend traditional grandeur with modern functionality.',
      features: ['Grand Architecture', 'Traditional & Modern Fusion', 'High-End Materials', 'Customized Features']
    },
    {
      _id: '4',
      name: 'Commercial Construction',
      shortDescription: 'Professional spaces for your business',
      description:
        'We construct commercial buildings designed for functionality and professionalism. From offices to retail spaces, we create environments that enhance your business.',
      features: ['Functional Design', 'Compliance Standards', 'Modern Infrastructure', 'Energy Efficient']
    },
    {
      _id: '5',
      name: 'Renovation & Remodeling',
      shortDescription: 'Transform your existing space',
      description:
        'Breathe new life into your property with our renovation services. We handle everything from minor updates to complete overhauls with minimal disruption.',
      features: ['Modernization', 'Structural Improvements', 'Interior Upgrades', 'Quick Turnaround']
    },
    {
      _id: '6',
      name: 'Interior Design',
      shortDescription: 'Beautiful interiors that inspire',
      description:
        'Complete your construction with our professional interior design services. We create cohesive, stylish spaces that reflect your personality and lifestyle.',
      features: ['Custom Furniture', 'Color Consultation', '3D Visualization', 'Complete Execution']
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Our Services</h1>
            <p>Comprehensive construction solutions for every need</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="services-grid">
              {displayServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  className="service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="service-header">
                    <h3>{service.name}</h3>
                    <p className="service-short">{service.shortDescription}</p>
                  </div>

                  <div className="service-body">
                    <p>{service.description}</p>

                    {service.features && service.features.length > 0 && (
                      <div className="service-features">
                        <h4>Key Features:</h4>
                        <ul>
                          {service.features.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pricing Removed */}
                    <div className="contact-note">
                      <p><strong>Contact us for customized pricing.</strong></p>
                    </div>
                  </div>

                  <div className="service-footer">
                    <Link to="/contact" className="btn btn-primary">
                      Get Quote
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to Start Your Project?</h2>
            <p>Contact us today for a free consultation and quote</p>
            <Link to="/contact" className="btn btn-gold">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;