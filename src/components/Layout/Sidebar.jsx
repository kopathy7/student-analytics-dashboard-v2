import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, CalendarCheck, GraduationCap, Trophy,
  Brain, Gamepad2, Grid3X3, BarChart3, Bell, Users, Sparkles,
  Map, MessageCircle, ChevronLeft, ChevronRight, Flame, Zap
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard', emoji: '🏠' },
  { path: '/profile', icon: User, label: 'Profile', emoji: '👤' },
  { path: '/attendance', icon: CalendarCheck, label: 'Attendance', emoji: '📅' },
  { path: '/grades', icon: GraduationCap, label: 'Grades', emoji: '📊' },
  { path: '/leaderboard', icon: Trophy, label: 'Leaderboard', emoji: '🏆' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics', emoji: '📈' },
  { path: '/ai-assistant', icon: Brain, label: 'AI Assistant', emoji: '🤖' },
  { path: '/behavioral', icon: Sparkles, label: 'Behavioral', emoji: '🧠' },
  { path: '/gamification', icon: Gamepad2, label: 'Gamification', emoji: '🎮' },
  { path: '/heatmaps', icon: Grid3X3, label: 'Heatmaps', emoji: '🔥' },
  { path: '/brain-map', icon: Map, label: 'Brain Map', emoji: '🗺️' },
  { path: '/social', icon: Users, label: 'Social', emoji: '👥' },
  { path: '/predictions', icon: Zap, label: 'Predictions', emoji: '🔮' },
  { path: '/alerts', icon: Bell, label: 'Alerts', emoji: '🔔' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Logo */}
      <div className="sidebar-logo">
        <motion.div
          className="logo-icon"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Flame size={28} />
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              className="logo-text"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <span className="logo-title">STULYTICS</span>
              <span className="logo-subtitle">AI Analytics</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <div className="nav-icon-wrap">
              <item.icon size={20} />
              {location.pathname === item.path && (
                <motion.div
                  className="nav-active-bg"
                  layoutId="activeNav"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className="nav-label"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Collapse Button */}
      <button
        className="sidebar-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Decorative Orb */}
      <div className="sidebar-orb" />
    </motion.aside>
  );
}
