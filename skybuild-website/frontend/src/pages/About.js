import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaAward, FaUsers, FaHandshake, FaLightbulb } from 'react-icons/fa';
import './About.css';

const About = () => {

  const values = [
    {
      icon: <FaAward />,
      title: 'Excellence',
      description: 'We strive for perfection in every project, ensuring the highest quality standards in construction.'
    },
    {
      icon: <FaUsers />,
      title: 'Client-Focused',
      description: 'Your vision is our mission. We work closely with you to bring your dream to reality.'
    },
    {
      icon: <FaHandshake />,
      title: 'Integrity',
      description: 'Transparency, honesty, and trust form the foundation of our business relationships.'
    },
    {
      icon: <FaLightbulb />,
      title: 'Innovation',
      description: 'We embrace modern techniques and sustainable practices to build for the future.'
    }
  ];

  // ✅ Updated CEO Name + Company Branding
  const team = [
    {
      name: 'Domen Thakur',
      role: 'Founder & CEO',
      description: 'With 20+ years in construction, Domen leads Corvento Group with vision, innovation, and commitment to excellence.'
    },
    {
      name: 'Priya Sharma',
      role: 'Chief Architect',
      description: 'Award-winning architect specializing in residential and commercial designs.'
    },
    {
      name: 'Amit Singh',
      role: 'Project Manager',
      description: 'Ensures every project is delivered on time with exceptional quality standards.'
    }
  ];

  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>About Corvento Group</h1>
            <p>Building excellence since 2008</p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section">
        <div className="container">
          <div className="about-intro">

            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2>Our Story</h2>
              <div className="decorative-line"></div>

              <p>
                Founded in 2008, Corvento Group has grown into one of Punjab's most trusted names in residential and commercial construction. Our journey began with a clear mission — to build structures that stand the test of time.
              </p>

              <p>
                Over the years, we have completed hundreds of projects, from elegant houses to luxurious villas and large commercial developments. Every project reflects our dedication to precision, quality, and client satisfaction.
              </p>

              <p>
                Today, Corvento Group represents excellence, innovation, and integrity. We don't just construct buildings — we create lasting landmarks and meaningful spaces.
              </p>
            </motion.div>

            <motion.div
              className="about-stats-box"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="stat-item">
                <h3>500+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>15+</h3>
                <p>Years of Excellence</p>
              </div>
              <div className="stat-item">
                <h3>1000+</h3>
                <p>Happy Clients</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Expert Team Members</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section bg-light">
        <div className="container">

          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </motion.div>

          <div className="values-grid grid grid-2">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">

          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Meet Our Leadership</h2>
            <p>Experienced professionals dedicated to excellence</p>
          </motion.div>

          <div className="team-grid grid grid-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="team-avatar">
                  {member.name.charAt(0)}
                </div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p>{member.description}</p>
              </motion.div>
            ))}
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
            <h2>Let's Build Something Amazing Together</h2>
            <p>Get in touch with Corvento Group to discuss your next project</p>
            <Link to="/contact" className="btn btn-gold">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;