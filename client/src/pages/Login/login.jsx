import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setErrors({});
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    try {
      const response = await axios.post('http://localhost:8001/log-in', { email, password });

      login({
        name: response.data.name,
        role: response.data.role,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });

      toast.success('Login successful!');
      if (response.data.role === 'Admin') {
        navigate('/admindiscovery');
      } else {
        navigate('/discovery');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page premium-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-card glass-morphism"
      >
        <div className="login-header">
          <div className="login-icon">
            <LogIn size={32} />
          </div>
          <h1>Welcome Back</h1>
          <p className="text-muted">Sign in to your account to continue</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'var(--text-main)',
              }}
            >
              Email Address <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="input-group">
              <Mail className="input-icon" size={20} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            {errors.email && (
              <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'var(--text-main)',
              }}
            >
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="input-group">
              <Lock className="input-icon" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>



          <button type="submit" className="login-button btn-primary">
            <span>Sign In</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="signup-prompt">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
