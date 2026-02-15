import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import './privacy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-page premium-bg">
            <div className="privacy-container">
                {/* Hero Section */}
                <section className="privacy-hero">
                    <div className="hero-icon-wrapper">
                        <Shield size={64} className="hero-icon" />
                    </div>
                    <h1 className="privacy-title">Privacy Policy</h1>
                    <p className="privacy-subtitle">
                        Last Updated: February 15, 2026
                    </p>
                </section>

                {/* Content Section */}
                <section className="privacy-content glass-morphism">
                    <div className="intro-section">
                        <p className="intro-text">
                            At CannaDiscovery, we take your privacy seriously. This Privacy Policy explains how we collect,
                            use, disclose, and safeguard your information when you visit our platform.
                        </p>
                    </div>

                    <div className="policy-section">
                        <div className="section-icon">
                            <Database size={32} />
                        </div>
                        <h2 className="section-title">Information We Collect</h2>
                        <p className="section-text">
                            We collect information that you provide directly to us, including:
                        </p>
                        <ul className="policy-list">
                            <li>Name and email address when you create an account</li>
                            <li>Password (encrypted and securely stored)</li>
                            <li>Product preferences and wishlist data</li>
                            <li>Usage data and interaction with our platform</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <div className="section-icon">
                            <Eye size={32} />
                        </div>
                        <h2 className="section-title">How We Use Your Information</h2>
                        <p className="section-text">
                            We use the information we collect to:
                        </p>
                        <ul className="policy-list">
                            <li>Provide, maintain, and improve our services</li>
                            <li>Personalize your experience on our platform</li>
                            <li>Send you updates and promotional materials (with your consent)</li>
                            <li>Respond to your comments, questions, and requests</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <div className="section-icon">
                            <Lock size={32} />
                        </div>
                        <h2 className="section-title">Data Security</h2>
                        <p className="section-text">
                            We implement appropriate technical and organizational security measures to protect your personal
                            information, including:
                        </p>
                        <ul className="policy-list">
                            <li>Encryption of passwords using bcrypt hashing</li>
                            <li>JWT-based authentication for secure sessions</li>
                            <li>Regular security audits and updates</li>
                            <li>Restricted access to personal data</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <div className="section-icon">
                            <UserCheck size={32} />
                        </div>
                        <h2 className="section-title">Your Rights</h2>
                        <p className="section-text">
                            You have the right to:
                        </p>
                        <ul className="policy-list">
                            <li>Access and receive a copy of your personal data</li>
                            <li>Correct inaccurate or incomplete data</li>
                            <li>Request deletion of your personal data</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Withdraw consent at any time</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2 className="section-title">Cookies and Tracking</h2>
                        <p className="section-text">
                            We use cookies and similar tracking technologies to track activity on our platform and store
                            certain information. You can instruct your browser to refuse all cookies or to indicate when
                            a cookie is being sent.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2 className="section-title">Third-Party Services</h2>
                        <p className="section-text">
                            We do not sell, trade, or otherwise transfer your personal information to third parties without
                            your consent, except as described in this policy or as required by law.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2 className="section-title">Changes to This Policy</h2>
                        <p className="section-text">
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                            the new Privacy Policy on this page and updating the "Last Updated" date.
                        </p>
                    </div>

                    <div className="contact-section">
                        <h2 className="section-title">Contact Us</h2>
                        <p className="section-text">
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <p className="contact-email">cannabis@gmail.com</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
