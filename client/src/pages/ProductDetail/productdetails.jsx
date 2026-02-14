import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart,
    ChevronLeft,
    Star,
    Crosshair,
    Droplets,
    Zap,
    ShoppingBag,
    ShieldCheck,
    Share2
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './productdetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);

    const addtoWishlist = async () => {
        try {
            const res = await axios.post('http://localhost:8001/user/wishlist', {
                productId: id
            }, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            const isRemoved = res.data.removed;
            setIsWishlisted(!isRemoved);
            import('react-toastify').then(({ toast }) => {
                if (isRemoved) {
                    toast.info('Removed from wishlist');
                } else {
                    toast.success('Added to wishlist! ✨');
                }
            });
        } catch (error) {
            import('react-toastify').then(({ toast }) => toast.error(error.response?.data?.message || 'Error updating wishlist'));
        }
    };

    useEffect(() => {
        if (user && id) {
            fetchProductDetails();
        }
    }, [user, id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);
            // Fetch product
            const res = await axios.get(`http://localhost:8001/user/product/${id}`, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            if (res.data && res.data.data) {
                setProduct(res.data.data);
            }

            // Sync wishlist state
            const wishlistRes = await axios.get('http://localhost:8001/user/wishlist', {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            if (wishlistRes.data && wishlistRes.data.data) {
                const found = wishlistRes.data.data.some(item => item.productId._id === id);
                setIsWishlisted(found);
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="product-details-page premium-bg">
                <div className="container center-content">
                    <div className="loader"></div>
                    <p>Fetching premium details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page premium-bg">
                <div className="container center-content">
                    <h2>Product not found</h2>
                    <button onClick={() => navigate('/discovery')} className="btn-primary">Back to Discovery</button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-page premium-bg">
            <div className="details-container">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/discovery')}
                    className="back-btn glass-morphism"
                >
                    <ChevronLeft size={20} />
                    <span>Back to Discovery</span>
                </motion.button>

                <div className="details-grid">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="details-visual-section glass-morphism"
                    >
                        <div className="vital-badge">
                            <ShieldCheck size={16} />
                            Verified Quality
                        </div>
                        <div className="visual-placeholder">
                            <Zap size={80} strokeWidth={1} className="animated-icon" />
                        </div>
                        <div className="visual-stats">
                            <div className="v-stat">
                                <span className="label">THC</span>
                                <span className="value">{product.THC}%</span>
                            </div>
                            <div className="divider"></div>
                            <div className="v-stat">
                                <span className="label">CBD</span>
                                <span className="value">{product.CBD}%</span>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="details-content-section"
                    >
                        <div className="content-header">
                            <div className="title-area">
                                <h1 className="product-title">{product.productName}</h1>
                            </div>
                            <button
                                className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
                                onClick={addtoWishlist}
                            >
                                <Heart size={24} fill={isWishlisted ? "var(--primary)" : "none"} />
                            </button>
                        </div>

                        <div className="price-section">
                            <span className="current-price">${product.price}</span>
                            <span className="price-sub">per unit</span>
                        </div>

                        <div className="description-section">
                            <h2>Description</h2>
                            <p>{product.description || 'This premium strain is meticulously grown and cured to ensure the highest terpene profile and maximum potency. Experience the unique aroma and smooth finish that defines our discovery collection.'}</p>
                        </div>

                        <div className="product-info-grid">
                            <div className="info-item glass-morphism">
                                <Crosshair size={20} />
                                <div className="info-text">
                                    <label>Effect Profile</label>
                                    <span>{product.effect || 'Energetic & Focused'}</span>
                                </div>
                            </div>
                            <div className="info-item glass-morphism">
                                <Droplets size={20} />
                                <div className="info-text">
                                    <label>Usage Type</label>
                                    <span>{product.usageType || 'Daytime / Creative'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button className={`reserve-action-btn ${isWishlisted ? 'remove-mode' : ''}`} onClick={addtoWishlist}>
                                <ShoppingBag size={20} />
                                <span>{isWishlisted ? 'Remove from WishList' : 'Add to WishList'}</span>
                            </button>
                        </div>

                        <div className="trust-badges">
                            <div className="t-badge">✨ Lab Tested</div>
                            <div className="t-badge">🌿 Organic Grown</div>
                            <div className="t-badge">📦 Secure Pack</div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
