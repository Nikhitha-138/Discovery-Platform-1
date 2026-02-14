import React, { useState } from 'react';
import axios from 'axios';
import {
  User,
  Mail,
  Phone,
  Lock,
  UserPlus,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './signup.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('User');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = async e => {
    e.preventDefault();
    setErrors({});
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    if (!phonenumber || !/^\d{10}$/.test(phonenumber)) {
      setErrors({ phonenumber: 'Please enter a valid 10-digit mobile number' });
      return;
    }
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    try {
      const response = await axios.post('http://localhost:8001/sign-up', {
        name,
        email,
        phonenumber,
        password,
        role,
      });
      console.log('Sign up successful:', response.data);
      login({
        ...response.data.user,
        accessToken: response.data.accessToken
      });
      navigate('/discovery');
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div className="signup-page premium-bg">
      <div className="signup-card glass-morphism">
        <div className="signup-header">
          <div className="signup-icon">
            <UserPlus size={32} />
          </div>
          <h1>Create Account</h1>
          <p className="text-muted">Join our community today</p>
        </div>

        <form className="signup-form" onSubmit={handleSignUp}>
          <div className="input-row">
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'var(--text-main)',
              }}
            >
              Full Name <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="input-group">
              <User className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="input-row">
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

          <div className="input-row">
            <label
              style={{
                display: 'block',
                marginBottom: '5px',
                color: 'var(--text-main)',
              }}
            >
              Phone Number <span style={{ color: 'red' }}>*</span>
            </label>
            <div className="input-group">
              <Phone className="input-icon" size={20} />
              <input
                type="text"
                placeholder="Phone Number"
                value={phonenumber}
                onChange={e => setPhonenumber(e.target.value)}
              />
            </div>
            {errors.phonenumber && (
              <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
                {errors.phonenumber}
              </p>
            )}
          </div>

          <div className="input-row flex-row">
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
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  color: 'var(--text-main)',
                }}
              >
                Confirm Password <span style={{ color: 'red' }}>*</span>
              </label>
              <div className="input-group">
                <Lock className="input-icon" size={20} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {errors.confirmPassword && (
            <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '5px' }}>
              {errors.confirmPassword}
            </p>
          )}

          <button type="submit" className="signup-button btn-primary">
            <span>Sign Up</span>
            <ArrowRight size={20} />
          </button>
        </form>

        <p className="login-prompt">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
