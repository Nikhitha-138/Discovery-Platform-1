import React from 'react';
import { FileText, AlertCircle, Scale, Ban } from 'lucide-react';
import './terms.css';

const Terms = () => {
    return (
        <div className="terms-page premium-bg">
            <div className="terms-container">
                {/* Hero Section */}
                <section className="terms-hero">
                    <div className="hero-icon-wrapper">
                        <FileText size={64} className="hero-icon" />
                    </div>
                    <h1 className="terms-title">Terms of Service</h1>
                    <p className="terms-subtitle">
                        Last Updated: February 15, 2026
                    </p>
                </section>

                {/* Content Section */}
                <section className="terms-content glass-morphism">
                    <div className="intro-section">
                        <p className="intro-text">
                            Welcome to CannaDiscovery. By accessing or using our platform, you agree to be bound by these
                            Terms of Service. Please read them carefully.
                        </p>
                    </div>

                    <div className="terms-section">
                        <div className="section-icon">
                            <Scale size={32} />
                        </div>
                        <h2 className="section-title">Acceptance of Terms</h2>
                        <p className="section-text">
                            By accessing and using CannaDiscovery, you accept and agree to be bound by the terms and
                            provisions of this agreement. If you do not agree to these terms, please do not use our platform.
                        </p>
                    </div>

                    <div className="terms-section">
                        <div className="section-icon">
                            <AlertCircle size={32} />
                        </div>
                        <h2 className="section-title">Age Restriction</h2>
                        <p className="section-text">
                            You must be at least 21 years of age (or the legal age in your jurisdiction) to use this platform.
                            By using CannaDiscovery, you represent and warrant that you meet this age requirement.
                        </p>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">User Accounts</h2>
                        <p className="section-text">
                            When you create an account with us, you must provide accurate, complete, and current information.
                            You are responsible for:
                        </p>
                        <ul className="terms-list">
                            <li>Maintaining the confidentiality of your account and password</li>
                            <li>Restricting access to your computer and account</li>
                            <li>All activities that occur under your account</li>
                            <li>Notifying us immediately of any unauthorized use</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">Acceptable Use</h2>
                        <p className="section-text">
                            You agree not to use the platform to:
                        </p>
                        <ul className="terms-list">
                            <li>Violate any applicable laws or regulations</li>
                            <li>Infringe upon the rights of others</li>
                            <li>Transmit any harmful or malicious code</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Use automated systems to access the platform without permission</li>
                            <li>Engage in any activity that disrupts or interferes with our services</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">Intellectual Property</h2>
                        <p className="section-text">
                            The platform and its original content, features, and functionality are owned by CannaDiscovery
                            and are protected by international copyright, trademark, patent, trade secret, and other
                            intellectual property laws.
                        </p>
                    </div>

                    <div className="terms-section">
                        <div className="section-icon">
                            <Ban size={32} />
                        </div>
                        <h2 className="section-title">Prohibited Activities</h2>
                        <p className="section-text">
                            The following activities are strictly prohibited:
                        </p>
                        <ul className="terms-list">
                            <li>Illegal sale or distribution of cannabis products</li>
                            <li>Misrepresentation of product information</li>
                            <li>Harassment or abuse of other users</li>
                            <li>Spamming or unsolicited advertising</li>
                            <li>Data mining or scraping without permission</li>
                        </ul>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">Disclaimer of Warranties</h2>
                        <p className="section-text">
                            The platform is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties,
                            expressed or implied, regarding the platform's operation or the information, content, or
                            materials included on the platform.
                        </p>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">Limitation of Liability</h2>
                        <p className="section-text">
                            In no event shall CannaDiscovery be liable for any indirect, incidental, special, consequential,
                            or punitive damages resulting from your use of or inability to use the platform.
                        </p>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">Termination</h2>
                        <p className="section-text">
                            We reserve the right to terminate or suspend your account and access to the platform immediately,
                            without prior notice or liability, for any reason, including breach of these Terms.
                        </p>
                    </div>

                    <div className="terms-section">
                        <h2 className="section-title">Changes to Terms</h2>
                        <p className="section-text">
                            We reserve the right to modify or replace these Terms at any time. We will provide notice of
                            any significant changes by posting the new Terms on this page and updating the "Last Updated" date.
                        </p>
                    </div>

                    <div className="contact-section">
                        <h2 className="section-title">Contact Us</h2>
                        <p className="section-text">
                            If you have any questions about these Terms of Service, please contact us at:
                        </p>
                        <p className="contact-email">cannabis@gmail.com</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Terms;
