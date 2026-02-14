import React from 'react';
import { Search, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import './Main.css';

const Main = () => {
    return (
        <section className="premium-bg hero-section">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="hero-badge">
                    <Sparkles size={16} />
                    <span>Next Generation Discovery Platform</span>
                </div>

                <h1 className="hero-title">
                    Discover the Finest <br />
                    <span className="hero-gradient-text">
                        Cannabis Experience
                    </span>
                </h1>

                <p className="hero-subtitle">
                    Explore curated products, top-rated vendors, and AI-powered recommendations tailored to your unique preferences.
                </p>


            </motion.div>
        </section>
    );
};

export default Main;
