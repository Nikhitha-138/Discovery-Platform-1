import React from 'react';
import { Search, Sparkles, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section className="premium-bg" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: '100px', textAlign: 'center', padding: '0 1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--glass)', padding: '8px 16px', borderRadius: '30px', border: '1px solid var(--glass-border)', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--accent)' }}>
                    <Sparkles size={16} />
                    <span>Next Generation Discovery Platform</span>
                </div>

                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '900px' }}>
                    Discover the Finest <br />
                    <span style={{ background: 'linear-gradient(to right, #4A8B3C, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Cannabis Experience
                    </span>
                </h1>

                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
                    Explore curated products, top-rated vendors, and AI-powered recommendations tailored to your unique preferences.
                </p>


            </motion.div>
        </section>
    );
};

export default Hero;
