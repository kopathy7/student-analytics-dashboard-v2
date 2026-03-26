import { useState, useEffect } from 'react';
import { Bell, Search, Clock, Flame, ChevronDown, Palette, LogOut } from 'lucide-react';
import { studentProfile, exams, alerts } from '../../data/mockData';
import { useTheme, themes } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import './TopBar.css';

export default function TopBar() {
  const [timeLeft, setTimeLeft] = useState('');
  const [showAlerts, setShowAlerts] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const { theme, switchTheme } = useTheme();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const unreadCount = alerts.filter(a => !a.read).length;

  useEffect(() => {
    const nextExam = exams[0];
    const updateCountdown = () => {
      const now = new Date();
      const examDate = new Date(nextExam.date);
      const diff = examDate - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClick = () => {
      setShowAlerts(false);
      setShowThemes(false);
      setShowProfile(false);
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search subjects, topics..." />
        </div>
      </div>

      <div className="topbar-center">
        <div className="exam-countdown">
          <Clock size={14} />
          <span className="countdown-label">Next: {exams[0].subject} {exams[0].type}</span>
          <span className="countdown-timer">{timeLeft}</span>
        </div>
      </div>

      <div className="topbar-right">
        <div className="streak-display">
          <Flame size={16} className="streak-icon" />
          <span className="streak-count">{studentProfile.streak}</span>
        </div>

        <div className="xp-mini">
          <span className="xp-value">Lv.{studentProfile.level}</span>
          <div className="xp-bar-mini">
            <div className="xp-fill-mini" style={{ width: `${(studentProfile.xp / studentProfile.xpToNext) * 100}%` }} />
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="theme-switcher" onClick={e => { e.stopPropagation(); setShowThemes(!showThemes); setShowAlerts(false); setShowProfile(false); }}>
          <Palette size={18} />
          {showThemes && (
            <div className="theme-dropdown" onClick={e => e.stopPropagation()}>
              <div className="theme-dropdown-header">Theme</div>
              {Object.entries(themes).map(([key, t]) => (
                <button
                  key={key}
                  className={`theme-option ${theme === key ? 'active' : ''}`}
                  onClick={() => { switchTheme(key); setShowThemes(false); }}
                >
                  <span className="theme-icon">{t.icon}</span>
                  <span className="theme-name">{t.name}</span>
                  {theme === key && <span className="theme-check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="notification-bell" onClick={e => { e.stopPropagation(); setShowAlerts(!showAlerts); setShowThemes(false); setShowProfile(false); }}>
          <Bell size={18} />
          {unreadCount > 0 && <span className="bell-badge">{unreadCount}</span>}
        </div>

        <div className="topbar-profile" onClick={e => { e.stopPropagation(); setShowProfile(!showProfile); setShowAlerts(false); setShowThemes(false); }}>
          <div className="avatar-small">{studentProfile.avatar}</div>
          <span className="profile-name">{user?.name?.split(' ')[0] || 'Alex'}</span>
          <ChevronDown size={14} />
          
          {showProfile && (
            <div className="profile-dropdown" onClick={e => e.stopPropagation()}>
              <div className="profile-dropdown-info">
                <span className="pd-name">{user?.name || 'Alex Rivera'}</span>
                <span className="pd-email">{user?.email || 'alex@student.edu'}</span>
              </div>
              <button className="pd-logout" onClick={logout}>
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>

        {showAlerts && (
          <div className="alerts-dropdown" onClick={e => e.stopPropagation()}>
            <div className="alerts-header">
              <h4>Notifications</h4>
              <span className="alerts-count">{unreadCount} new</span>
            </div>
            {alerts.slice(0, 5).map(alert => (
              <div key={alert.id} className={`alert-item ${!alert.read ? 'unread' : ''}`}>
                <span className="alert-icon">{alert.icon}</span>
                <div className="alert-content">
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-time">{alert.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
