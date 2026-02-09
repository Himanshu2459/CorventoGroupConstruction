import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaHammer, FaHome, FaBuilding, FaCheckCircle, FaAward, FaUsers } from 'react-icons/fa';
import { projectsAPI, servicesAPI, testimonialsAPI } from '../services/api';
import './Home.css';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, servicesRes, testimonialsRes] = await Promise.all([
        projectsAPI.getAll({ featured: true }),
        servicesAPI.getAll(),
        testimonialsAPI.getAll()
      ]);

      setProjects(projectsRes.data.data.slice(0, 6));
      setServices(servicesRes.data.data.slice(0, 3));
      setTestimonials(testimonialsRes.data.data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const stats = [
    { icon: <FaCheckCircle />, number: '500+', label: 'Projects Completed' },
    { icon: <FaAward />, number: '15+', label: 'Years Experience' },
    { icon: <FaUsers />, number: '1000+', label: 'Happy Clients' }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-overlay"></div>
        <div className="hero-content container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <div className="decorative-line"></div>
            <h1>Building Your <span className="highlight">Dreams</span> Into Reality</h1>
            <p className="hero-subtitle">
              Premium construction services for Houses, Villas, and Kothis. Excellence in every brick, perfection in every detail.
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn btn-gold">Start Your Project</Link>
              <Link to="/projects" className="btn btn-secondary">View Portfolio</Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hero-stats"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section" ref={featuresRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Why Choose Skybuild</h2>
            <p>We bring expertise, quality, and innovation to every project</p>
          </motion.div>

          <div className="features-grid grid grid-3">
            {[
              {
                icon: <FaHammer />,
                title: 'Expert Craftsmanship',
                description: 'Our team of skilled professionals ensures every detail is executed to perfection.'
              },
              {
                icon: <FaHome />,
                title: 'Custom Designs',
                description: 'Tailored solutions that bring your unique vision to life with precision and style.'
              },
              {
                icon: <FaBuilding />,
                title: 'Quality Materials',
                description: 'We use only premium materials to ensure durability and longevity of your project.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card"
                initial={{ opacity: 0, y: 30 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects section bg-dark" ref={projectsRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Featured Projects</h2>
            <p>Explore our portfolio of exceptional constructions</p>
          </motion.div>

          {loading ? (
            <div className="loader"></div>
          ) : (
            <div className="projects-grid grid grid-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  className="project-card card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={projectsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="project-image-wrapper">
                    <img 
                      src={project.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=Project'} 
                      alt={project.title} 
                      className="card-image"
                    />
                    <div className="project-category">{project.category}</div>
                  </div>
                  <div className="card-content">
                    <h3>{project.title}</h3>
                    <p>{project.description.substring(0, 100)}...</p>
                    <div className="project-meta">
                      <span>{project.location}</span>
                      <span>{project.area.value} {project.area.unit}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="section-cta">
            <Link to="/projects" className="btn btn-gold">View All Projects</Link>
          </div>
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
            <h2>Ready to Build Your Dream?</h2>
            <p>Let's discuss your project and turn your vision into reality</p>
            <Link to="/contact" className="btn btn-primary">Get Free Consultation</Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
