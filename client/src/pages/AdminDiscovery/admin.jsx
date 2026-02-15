import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import {
  Users,
  Package,
  Activity,
  PlusCircle,
  Settings,
  List,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './admin.css';

const AdminDiscovery = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      if (!user?.accessToken) return;

      const res = await axios.get('http://localhost:8001/dashboard', {
        headers: {
          Authorization: `Bearer ${user.accessToken}`
        }
      });
      setDashboardData(res.data.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  if (!user || user.role !== 'Admin') {
    return (
      <div className="admin-dashboard premium-bg" style={{ minHeight: '100vh', padding: '150px 2rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-morphism access-denied"
        >
          <h2>Access Denied</h2>
          <p>Admin credentials required to view this page.</p>
          <Link to="/login" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Go to Login</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard premium-bg">
      <div className="dashboard-content">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-header-section"
        >
          <div className="header-text">
            <h1 className="admin-welcome">Admin Dashboard</h1>
            <p className="admin-subtitle">Welcome back, {user?.name || 'Administrator'}</p>
          </div>
          <div className="header-actions">
            <Link to="/add-product" className="quick-action-btn primary">
              <PlusCircle size={20} />
              <span>Add Product</span>
            </Link>
          </div>
        </motion.div>

        <div className="stats-grid">
          <motion.div
            whileHover={{ y: -5 }}
            className="stat-card glass-morphism"
          >
            <div className="stat-icon-wrapper products">
              <Package size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Products</h3>
              <p className="stat-number">{loading ? '...' : dashboardData?.countProduct || 0}</p>
            </div>
            <TrendingUp size={16} className="trend-icon" />
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="stat-card glass-morphism"
          >
            <div className="stat-icon-wrapper users">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p className="stat-number">{loading ? '...' : dashboardData?.countUser || 0}</p>
            </div>
            <TrendingUp size={16} className="trend-icon" />
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="stat-card glass-morphism"
          >
            <div className="stat-icon-wrapper activity">
              <Activity size={24} />
            </div>
            <div className="stat-info">
              <h3>Platform Status</h3>
              <p className="stat-number active">Live</p>
            </div>
          </motion.div>
        </div>

        <div className="dashboard-main-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="activity-section glass-morphism"
          >
            <div className="section-header">
              <div className="title-with-icon">
                <Clock size={20} />
                <h2>Recent User Registrations</h2>
              </div>
              <Link to="/users" className="view-all">View All</Link>
            </div>

            <div className="activity-list">
              {loading ? (
                <div className="skeleton-loader">Loading activity...</div>
              ) : dashboardData?.RecentActivity?.length > 0 ? (
                dashboardData.RecentActivity.map((activity, index) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={activity._id}
                    className="activity-item"
                  >
                    <div className="user-avatar">
                      {activity.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="activity-details">
                      <p className="user-name">{activity.name}</p>
                      <p className="user-email">{activity.email}</p>
                    </div>
                    <div className="activity-time">
                      {new Date(activity.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="no-data">No recent activity found.</p>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="quick-links-section glass-morphism"
          >
            <h2>Management Tools</h2>
            <div className="tools-grid">
              <Link to="/categories" className="tool-card">
                <Settings size={20} />
                <span>Categories</span>
              </Link>
              <Link to="/add-product" className="tool-card">
                <PlusCircle size={20} />
                <span>New Product</span>
              </Link>
              <Link to="/users" className="tool-card">
                <List size={20} />
                <span>User List</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDiscovery