import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import './support.css';

const Support = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        // Simulate form submission
        console.log('Support form submitted:', formData);
        setSubmitted(true);
        toast.success('Your message has been sent! We\'ll get back to you soon.');

        // Reset form after 3 seconds
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="support-page premium-bg">
            <div className="support-container">
                {/* Hero Section */}
                <section className="support-hero">
                    <div className="hero-icon-wrapper">
                        <MessageSquare size={64} className="hero-icon" />
                    </div>
                    <h1 className="support-title">Contact Support</h1>
                    <p className="support-subtitle">
                        We're here to help! Send us a message and we'll respond as soon as possible.
                    </p>
                </section>

                <div className="support-content">
                    {/* Contact Form */}
                    <section className="contact-form-section glass-morphism">
                        <h2 className="section-title">Send us a message</h2>

                        {submitted ? (
                            <div className="success-message">
                                <CheckCircle size={64} className="success-icon" />
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for contacting us. We'll get back to you within 24-48 hours.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this regarding?"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Tell us how we can help you..."
                                        rows="6"
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn-primary submit-btn">
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        )}
                    </section>

                    {/* Contact Info */}
                    <section className="contact-info-section glass-morphism">
                        <h2 className="section-title">Other ways to reach us</h2>

                        <div className="contact-method">
                            <div className="method-icon">
                                <Mail size={28} />
                            </div>
                            <div className="method-details">
                                <h3>Email</h3>
                                <p>cannabis@gmail.com</p>
                                <span className="method-note">We typically respond within 24 hours</span>
                            </div>
                        </div>

                        <div className="support-hours">
                            <h3>Support Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                            <p>Saturday - Sunday: 10:00 AM - 4:00 PM PST</p>
                        </div>

                        <div className="quick-links">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="/faq">FAQ</a></li>
                                <li><a href="/privacy">Privacy Policy</a></li>
                                <li><a href="/terms">Terms of Service</a></li>
                                <li><a href="/about">About Us</a></li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Support;
