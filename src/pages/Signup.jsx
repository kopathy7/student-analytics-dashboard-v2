import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, UserPlus, User, AlertCircle, CheckCircle, Flame } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

function PasswordStrength({ password }) {
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const levels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
  const colors = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4'];

  if (!password) return null;

  return (
    <div className="password-strength">
      <div className="strength-bars">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            className="strength-bar"
            animate={{
              backgroundColor: i < strength ? colors[strength - 1] : 'rgba(100,116,139,0.2)',
              scaleY: i < strength ? 1 : 0.6,
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          />
        ))}
      </div>
      <span className="strength-label" style={{ color: colors[strength - 1] || '#64748b' }}>
        {password.length > 0 ? levels[strength - 1] || 'Too short' : ''}
      </span>
    </div>
  );
}

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password || !confirmPass) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPass) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = signup(name, email, password);
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
          <div className="auth-header">
            <motion.div
              className="auth-logo"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Flame size={32} />
            </motion.div>
            <h1>STULYTICS</h1>
            <p>Create your account to get started</p>
          </div>

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

          <form onSubmit={handleSignup} className="auth-form">
            <div className="input-group">
              <label>Full Name</label>
              <div className="input-wrap">
                <User size={16} />
                <input
                  type="text"
                  placeholder="Alex Rivera"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrap">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrap">
                <Lock size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="input-group">
              <label>Confirm Password</label>
              <div className="input-wrap">
                <Lock size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={confirmPass}
                  onChange={e => setConfirmPass(e.target.value)}
                />
                {confirmPass && (
                  <span className={`match-icon ${password === confirmPass ? 'match' : 'no-match'}`}>
                    {password === confirmPass ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  </span>
                )}
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
                  <UserPlus size={18} />
                  Create Account
                </>
              )}
            </motion.button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
