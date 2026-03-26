import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles, AlertCircle, Flame } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    // Simulate delay
    await new Promise(r => setTimeout(r, 800));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="auth-stars" />
        <div className="auth-grid" />
      </div>

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <motion.div
              className="auth-logo"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Flame size={32} />
            </motion.div>
            <h1>STULYTICS</h1>
            <p>Welcome back! Sign in to continue</p>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="auth-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AlertCircle size={16} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleLogin} className="auth-form">
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrap">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrap">
                <Lock size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="auth-submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="auth-spinner" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>

          {/* Demo Hint */}
          <div className="demo-hint">
            <Sparkles size={12} />
            <span>First time? Create a free account to get started!</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
