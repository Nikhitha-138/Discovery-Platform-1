import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Brand Section */}
                <div className="footer-section">
                    <div className="footer-brand">
                        <Leaf size={32} style={{ color: 'var(--primary-light)' }} />
                        <span className="footer-brand-text">
                            Canna<span style={{ color: 'var(--primary-light)' }}>Discovery</span>
                        </span>
                    </div>
                    <p className="footer-description">
                        Your trusted platform for discovering premium cannabis products.
                        Making product discovery simple, intuitive, and enjoyable.
                    </p>
                    <div className="footer-social">
                        <a href="https://github.com/Nikhitha-138" target="_blank" rel="noopener noreferrer" className="social-icon">
                            <Github size={20} />
                        </a>
                        <a href="#" className="social-icon">
                            <Linkedin size={20} />
                        </a>
                        <a href="#" className="social-icon">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>


                    </ul>
                </div>

                {/* Resources */}
                <div className="footer-section">
                    <h3 className="footer-heading">Resources</h3>
                    <ul className="footer-links">
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h3 className="footer-heading">Contact Us</h3>
                    <ul className="footer-contact">
                        <li>
                            <Mail size={16} />
                            <span>cannabis@gmail.com</span>
                        </li>
                        <li>
                            <Phone size={16} />
                            <span>+1 (555) 123-4567</span>
                        </li>
                        <li>
                            <MapPin size={16} />
                            <span>123 Green Street, CA 90210</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p>&copy; {currentYear} CannaDiscovery. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;
