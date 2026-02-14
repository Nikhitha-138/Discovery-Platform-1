import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, ChevronLeft, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './wishlist.css';

const WishList = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:8001/user/wishlist', {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            if (res.data && res.data.data) {
                setWishlist(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWishlist = async (itemId) => {
        try {
            await axios.delete(`http://localhost:8001/user/wishlist/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setWishlist(wishlist.filter(item => item._id !== itemId));
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchWishlist();
        }
    }, [user]);

    return (
        <div className="wishlist-page premium-bg">
            <div className="wishlist-container">
                <header className="wishlist-header">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="header-intro"
                    >
                        <button onClick={() => navigate('/discovery')} className="back-link">
                            <ChevronLeft size={20} />
                            <span>Return to Discovery</span>
                        </button>
                        <h1>Your Wishlist</h1>
                        <p>Track the premium strains you're most interested in.</p>
                    </motion.div>
                </header>

                <div className="wishlist-grid">
                    <AnimatePresence mode='popLayout'>
                        {loading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={`skeleton-${i}`} className="skeleton-card glass-morphism animate-pulse"></div>
                            ))
                        ) : wishlist.length > 0 ? (
                            wishlist.map((item, index) => {
                                const p = item.productId;
                                if (!p) return null;
                                return (
                                    <motion.div
                                        key={item._id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="wishlist-card glass-morphism"
                                    >
                                        <div className="card-top">
                                            <div className="product-info">
                                                <div className="category-tag">{p.category?.categoryName || 'General'}</div>
                                                <h3>{p.productName}</h3>
                                                <div className="stats-row">
                                                    <span>THC: {p.THC}%</span>
                                                    <span className="dot"></span>
                                                    <span>CBD: {p.CBD}%</span>
                                                </div>
                                            </div>
                                            <button
                                                className="remove-btn"
                                                onClick={() => removeFromWishlist(item._id)}
                                                title="Remove from wishlist"
                                            >
                                                x
                                            </button>
                                        </div>

                                        <div className="card-bottom">
                                            <div className="price">${p.price}</div>
                                            <div className="actions">
                                                <button
                                                    className="view-btn-text"
                                                    onClick={() => navigate(`/product-details/${p._id}`)}
                                                >
                                                    View Details
                                                </button>

                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="empty-wishlist glass-morphism"
                            >
                                <Heart size={48} className="empty-icon" />
                                <h2>Your wishlist is empty</h2>
                                <p>Start exploring and save your favorite products here.</p>
                                <button onClick={() => navigate('/discovery')} className="btn-primary">
                                    Start Discovering
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default WishList;
