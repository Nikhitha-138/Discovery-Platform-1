
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, SlidersHorizontal, Info, Search, ShoppingBag, ChevronLeft, ChevronRight, Package, Crosshair, Droplets } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './discovery.css';

const Discovery = () => {
    const { user } = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');
    const [wishlistIds, setWishlistIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minTHC, setMinTHC] = useState(0);
    const [maxTHC, setMaxTHC] = useState(100);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:8001/user/categories', {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            if (res.data && res.data.data) {
                setCategories(res.data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchWishlist = async () => {
        try {
            const res = await axios.get('http://localhost:8001/user/wishlist', {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            if (res.data && res.data.data) {
                // Store only IDs for quick lookup
                setWishlistIds(res.data.data.map(item => item.productId._id));
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    const addtoWishlist = async (productId) => {
        try {
            const res = await axios.post('http://localhost:8001/user/wishlist', {
                productId
            }, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            const isRemoved = res.data.removed;

            // Update local state immediately
            if (isRemoved) {
                setWishlistIds(prev => prev.filter(id => id !== productId));
            } else {
                setWishlistIds(prev => [...prev, productId]);
            }

            import('react-toastify').then(({ toast }) => {
                if (isRemoved) {
                    toast.info('Removed from wishlist');
                } else {
                    toast.success('Added to wishlist! ✨');
                }
            });
        } catch (error) {
            console.error('Wishlist error:', error);
            import('react-toastify').then(({ toast }) => toast.error(error.response?.data?.message || 'Failed to update wishlist'));
        }
    };

    const fetchProducts = async (page = 1) => {
        try {
            setLoading(true);
            let url = `http://localhost:8001/user/productlist?page=${page}&limit=${limit}`;

            if (selectedCategory) url += `&category=${selectedCategory}`;
            if (minTHC > 0) url += `&minTHC=${minTHC}`;
            if (maxTHC < 100) url += `&maxTHC=${maxTHC}`;
            if (searchTerm) url += `&productName=${searchTerm}`; // Assuming backend supports this or filtering client-side

            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            if (res.data && res.data.data) {
                setProducts(res.data.data);
                setTotalPages(res.data.pagination.totalPages);
                setCurrentPage(res.data.pagination.page);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchProducts(1);
            fetchWishlist();
            fetchCategories();
        }
    }, [user]);

    // Refetch when filters change
    useEffect(() => {
        if (user) {
            const timeoutId = setTimeout(() => {
                fetchProducts(1);
            }, 500); // Debounce search/range changes
            return () => clearTimeout(timeoutId);
        }
    }, [selectedCategory, minTHC, maxTHC, searchTerm]);

    const handlePrevPage = () => {
        if (currentPage > 1) fetchProducts(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) fetchProducts(currentPage + 1);
    };

    return (
        <div className="discovery-page premium-bg">
            <div className="discovery-container">
                <header className="discovery-header">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="header-intro"
                    >
                        <h1>Discovery</h1>
                        <p>Explore premium cannabis products curated for you.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="header-actions"
                    >
                        <div className="search-bar glass-morphism">
                            <Search size={18} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            className={`filter-toggle-btn glass-morphism ${isFilterOpen ? 'active' : ''}`}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <SlidersHorizontal size={18} />
                            <span>Filters</span>
                        </button>
                    </motion.div>
                </header>

                <AnimatePresence>
                    {isFilterOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="filters-section glass-morphism"
                        >
                            <div className="filter-group">
                                <label>Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="filter-select"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label>THC Range ({minTHC}% - {maxTHC}%)</label>
                                <div className="range-inputs">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={minTHC}
                                        onChange={(e) => setMinTHC(Number(e.target.value))}
                                    />
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={maxTHC}
                                        onChange={(e) => setMaxTHC(Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <button
                                className="clear-filters-btn"
                                onClick={() => {
                                    setSelectedCategory('');
                                    setMinTHC(0);
                                    setMaxTHC(100);
                                    setSearchTerm('');
                                }}
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="discovery-grid no-images">
                    <AnimatePresence mode='popLayout'>
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={`skeleton-${i}`} className="skeleton-card glass-morphism animate-pulse"></div>
                            ))
                        ) : products.length > 0 ? (
                            products.map((p, index) => (
                                <motion.div
                                    key={p._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="product-card glass-morphism pure-content"
                                >
                                    <div className="card-header-actions">
                                        <div className="category-badge">{p.category?.categoryName || 'General'}</div>
                                        <button
                                            className={`wishlist-btn-compact ${wishlistIds.includes(p._id) ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addtoWishlist(p._id);
                                            }}
                                        >
                                            <Heart size={20} fill={wishlistIds.includes(p._id) ? "var(--primary)" : "none"} />
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        <div className="title-row">
                                            <h3>{p.productName}</h3>
                                            <div className="price-tag">${p.price}</div>
                                        </div>

                                        <p className="description">{p.description || 'No description available for this premium product.'}</p>

                                        <div className="product-specs">
                                            <div className="spec-item">
                                                <Crosshair size={14} />
                                                <span>THC: <strong>{p.THC}%</strong></span>
                                            </div>
                                            <div className="spec-item">
                                                <Droplets size={14} />
                                                <span>CBD: <strong>{p.CBD}%</strong></span>
                                            </div>
                                        </div>

                                        <div className="extra-info">
                                            {p.effect && <div className="info-chip">✨ {p.effect}</div>}
                                            {p.usageType && <div className="info-chip">🛍️ {p.usageType}</div>}
                                        </div>
                                    </div>

                                    <div className="card-footer-buttons">
                                        <button className="action-btn-primary" onClick={() => navigate(`/product-details/${p._id}`)}>
                                            <Info size={16} />
                                            <span>View Details</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="no-results glass-morphism">
                                <p>No products found matching your search.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {totalPages > 1 && (
                    <div className="pagination-wrapper">
                        <button onClick={handlePrevPage} disabled={currentPage === 1} className="pagination-arrow glass-morphism">
                            <ChevronLeft size={20} />
                        </button>
                        <div className="page-numbers">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => fetchProducts(i + 1)}
                                    className={`page-num ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-arrow glass-morphism">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Discovery;
