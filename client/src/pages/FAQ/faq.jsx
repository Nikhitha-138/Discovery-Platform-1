import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './faq.css';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is CannaDiscovery?",
            answer: "CannaDiscovery is a cannabis product discovery platform that helps you find the right cannabis products based on your preferences. We provide detailed information about strains, effects, and potency levels to make your selection process simple and enjoyable."
        },
        {
            question: "How do I create an account?",
            answer: "Click on the 'Sign In' button in the navigation bar, then select 'Sign Up' to create a new account. You'll need to provide your name, email address, and create a secure password. Once registered, you can start exploring products and creating your wishlist."
        },
        {
            question: "Is my personal information secure?",
            answer: "Yes! We take security seriously. All passwords are encrypted using bcrypt hashing, and we use JWT-based authentication for secure sessions. We never share your personal information with third parties without your consent."
        },
        {
            question: "How do I add products to my wishlist?",
            answer: "Once you're logged in, browse the product catalog and click the heart icon on any product you're interested in. The product will be added to your wishlist, which you can access anytime from the navigation menu."
        },
        {
            question: "Can I filter products by category or THC level?",
            answer: "Absolutely! Our platform offers smart filtering options. You can filter products by categories, effects, and THC ranges to find exactly what you're looking for. Use the filter options on the Discovery page to narrow down your search."
        },
        {
            question: "What's the difference between Admin and User accounts?",
            answer: "User accounts can browse products, create wishlists, and view product details. Admin accounts have additional privileges including adding/managing products, creating categories, and viewing the user list. Admin accounts are manually created and cannot be registered through the signup page."
        },
        {
            question: "How do I reset my password?",
            answer: "Currently, password reset functionality is being developed. For now, please contact our support team at cannabis@gmail.com if you need to reset your password."
        },
        {
            question: "Is this platform available on mobile devices?",
            answer: "Yes! CannaDiscovery is fully responsive and works seamlessly on desktop, tablet, and mobile devices. You can access all features from any device with an internet connection."
        },
        {
            question: "Do you sell cannabis products directly?",
            answer: "No, CannaDiscovery is a product discovery and information platform. We do not sell cannabis products directly. Our goal is to help you make informed decisions about cannabis products."
        },
        {
            question: "How often is the product catalog updated?",
            answer: "Our admin team regularly updates the product catalog with new strains and products. Check back frequently to discover new additions to our collection."
        },
        {
            question: "Can I suggest new features?",
            answer: "We'd love to hear your suggestions! Please contact us at cannabis@gmail.com with your feature requests and feedback. We're constantly working to improve the platform based on user input."
        },
        {
            question: "What browsers are supported?",
            answer: "CannaDiscovery works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated to the latest version for the best experience."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-page premium-bg">
            <div className="faq-container">
                {/* Hero Section */}
                <section className="faq-hero">
                    <div className="hero-icon-wrapper">
                        <HelpCircle size={64} className="hero-icon" />
                    </div>
                    <h1 className="faq-title">Frequently Asked Questions</h1>
                    <p className="faq-subtitle">
                        Find answers to common questions about CannaDiscovery
                    </p>
                </section>

                {/* FAQ List */}
                <section className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item glass-morphism ${openIndex === index ? 'active' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp size={24} className="faq-icon" />
                                ) : (
                                    <ChevronDown size={24} className="faq-icon" />
                                )}
                            </button>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Contact Section */}
                <section className="faq-contact glass-morphism">
                    <h2>Still have questions?</h2>
                    <p>Can't find the answer you're looking for? Please reach out to us at cannabis@gmail.com</p>
                    <a href="mailto:cannabis@gmail.com" className="btn-primary">Email Us</a>
                </section>
            </div>
        </div>
    );
};

export default FAQ;
