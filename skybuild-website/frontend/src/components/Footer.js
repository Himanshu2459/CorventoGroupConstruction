import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-grid">

          {/* Company Info */}
          <div className="footer-col">
            <div className="footer-logo">
              <span className="logo-sky">CORVENTO</span>
              <span className="logo-build">GROUP</span>
            </div>

            <p className="footer-tagline">
              Corvento Group Construction - Building excellence since 2008.
            </p>

            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services">House Construction</Link></li>
              <li><Link to="/services">Villa Development</Link></li>
              <li><Link to="/services">Kothi Building</Link></li>
              <li><Link to="/services">Commercial Projects</Link></li>
              <li><Link to="/services">Renovation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li>
                <FaPhone className="contact-icon" />
                <span>+91 8840971046</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>Himanshu.sharmars12@gmail.com</span>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Construction Plaza, Ludhiana, Punjab</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-line"></div>
          <p>
            &copy; {currentYear} Corvento Group. All rights reserved. | Designed with precision and care.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;