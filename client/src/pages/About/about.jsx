import React from 'react';
import { Leaf, Target, Users, Shield, Heart, Sparkles } from 'lucide-react';
import './about.css';

const About = () => {
    return (
        <div className="about-page premium-bg">
            <div className="about-container">
                {/* Hero Section */}
                <section className="about-hero">
                    <div className="hero-icon-wrapper">
                        <Leaf size={64} className="hero-icon" />
                    </div>
                    <h1 className="about-title">
                        About <span className="highlight">CannaDiscovery</span>
                    </h1>
                    <p className="about-subtitle">
                        Making cannabis product discovery simple, intuitive, and enjoyable
                    </p>
                </section>

                {/* Story Section */}
                <section className="about-section glass-morphism">
                    <div className="section-content">
                        <h2 className="section-title">Our Story</h2>
                        <p className="section-text">
                            This project started with a simple idea: finding the right cannabis product
                            shouldn't feel overwhelming. There are so many strains, effects, and potency
                            levels out there. Instead of endless scrolling and confusing lists, we wanted
                            to build something clean, intuitive, and genuinely helpful — a platform that
                            makes product discovery simple and enjoyable.
                        </p>
                        <p className="section-text">
                            That's how this Cannabis Product Discovery Platform was created. Built as a
                            passion project and a learning experience, it helped strengthen our understanding
                            of full-stack development, authentication, role-based access control, and
                            responsive UI design.
                        </p>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="values-grid">
                    <div className="value-card glass-morphism">
                        <div className="value-icon">
                            <Target size={40} />
                        </div>
                        <h3 className="value-title">Our Mission</h3>
                        <p className="value-text">
                            To simplify cannabis product discovery through an intuitive, user-friendly
                            platform that empowers informed decisions.
                        </p>
                    </div>

                    <div className="value-card glass-morphism">
                        <div className="value-icon">
                            <Shield size={40} />
                        </div>
                        <h3 className="value-title">Trust & Safety</h3>
                        <p className="value-text">
                            We prioritize secure authentication, data protection, and responsible
                            product information to ensure a safe browsing experience.
                        </p>
                    </div>

                    <div className="value-card glass-morphism">
                        <div className="value-icon">
                            <Users size={40} />
                        </div>
                        <h3 className="value-title">User-Centric</h3>
                        <p className="value-text">
                            Every feature is designed with users in mind, from seamless navigation
                            to personalized wishlists and detailed product insights.
                        </p>
                    </div>

                    <div className="value-card glass-morphism">
                        <div className="value-icon">
                            <Sparkles size={40} />
                        </div>
                        <h3 className="value-title">Innovation</h3>
                        <p className="value-text">
                            Built with modern technologies and best practices, we continuously
                            evolve to provide the best user experience possible.
                        </p>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2 className="section-title centered">What We Offer</h2>
                    <div className="features-grid">
                        <div className="feature-item">
                            <div className="feature-number">01</div>
                            <h3>Curated Product Collection</h3>
                            <p>Browse a carefully selected range of cannabis products with detailed information.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">02</div>
                            <h3>Smart Filtering</h3>
                            <p>Filter products by categories, effects, and THC ranges to find exactly what you need.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">03</div>
                            <h3>Personal Wishlist</h3>
                            <p>Save your favorite products and access them anytime for easy reference.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">04</div>
                            <h3>Responsive Design</h3>
                            <p>Enjoy a seamless experience across all devices - desktop, tablet, and mobile.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">05</div>
                            <h3>Admin Dashboard</h3>
                            <p>Comprehensive management tools for products, categories, and user oversight.</p>
                        </div>
                        <div className="feature-item">
                            <div className="feature-number">06</div>
                            <h3>Secure Authentication</h3>
                            <p>JWT-based authentication with role-based access control for enhanced security.</p>
                        </div>
                    </div>
                </section>

                {/* Tech Stack Section */}
                <section className="tech-section glass-morphism">
                    <h2 className="section-title centered">Built With Modern Technology</h2>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <div className="tech-badge">Frontend</div>
                            <p>React.js 19 with Vite</p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-badge">Backend</div>
                            <p>Node.js & Express 5</p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-badge">Database</div>
                            <p>MongoDB with Mongoose</p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-badge">Security</div>
                            <p>JWT & Bcrypt</p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content glass-morphism">
                        <Heart size={48} className="cta-icon" />
                        <h2 className="cta-title">Join Our Community</h2>
                        <p className="cta-text">
                            Start your journey to discovering the perfect cannabis products today.
                        </p>
                        <div className="cta-buttons">
                            <a href="/signup" className="btn-primary">Get Started</a>
                            <a href="/login" className="btn-secondary">Sign In</a>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
