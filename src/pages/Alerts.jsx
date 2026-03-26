import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Info, Flame, Clock, Filter, Check } from 'lucide-react';
import { alerts, exams } from '../data/mockData';
import './Alerts.css';

export default function Alerts() {
  const [filter, setFilter] = useState('all');
  const [alertList, setAlertList] = useState(alerts);

  const filtered = filter === 'all' ? alertList : alertList.filter(a => a.type === filter);

  const markRead = (id) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle size={18} />;
      case 'success': return <CheckCircle size={18} />;
      case 'danger': return <Flame size={18} />;
      default: return <Info size={18} />;
    }
  };

  return (
    <div className="alerts-page">
      <div className="page-header">
        <h1>Alerts & Notifications</h1>
        <p>Stay informed about your academic journey</p>
      </div>

      <div className="alerts-layout">
        {/* Alerts Feed */}
        <motion.div className="glass-card alerts-feed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="alerts-toolbar">
            <h3><Bell size={16} /> Alert Feed</h3>
            <div className="filter-tabs">
              {['all', 'warning', 'success', 'danger', 'info'].map(f => (
                <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {filtered.map((alert, i) => (
              <motion.div
                key={alert.id}
                className={`alert-card ${alert.type} ${!alert.read ? 'unread' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(alert.id)}
              >
                <div className={`alert-icon-wrap ${alert.type}`}>
                  {getIcon(alert.type)}
                </div>
                <div className="alert-body">
                  <div className="alert-top">
                    <h4>{alert.title}</h4>
                    {!alert.read && <span className="new-dot" />}
                  </div>
                  <p>{alert.message}</p>
                  <span className="alert-time-stamp">
                    <Clock size={10} /> {alert.time}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Exam Countdown */}
        <div className="alerts-sidebar">
          <motion.div className="glass-card countdown-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3><Clock size={16} /> Exam Countdown</h3>
            {exams.map((exam, i) => {
              const days = Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <motion.div key={i} className="countdown-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <div className="countdown-days" style={{
                    background: days <= 10 ? 'rgba(239,68,68,0.15)' : days <= 20 ? 'rgba(245,158,11,0.15)' : 'rgba(99,102,241,0.15)',
                    color: days <= 10 ? '#ef4444' : days <= 20 ? '#f59e0b' : '#6366f1',
                  }}>
                    <span className="cd-num">{days}</span>
                    <span className="cd-label">DAYS</span>
                  </div>
                  <div className="countdown-info">
                    <span className="cd-subject">{exam.subject}</span>
                    <span className="cd-type">{exam.type} — {exam.difficulty}</span>
                    <div className="cd-topics">
                      {exam.topics.map((t, ti) => (
                        <span key={ti} className="cd-topic-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div className="glass-card tips-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h3>💡 Smart Tips</h3>
            <div className="tip-item">
              <span className="tip-bullet">📌</span>
              <p>Physics Thermodynamics needs urgent attention — only 60% mastery with exam in 16 days.</p>
            </div>
            <div className="tip-item">
              <span className="tip-bullet">⭐</span>
              <p>Your streak is at risk! Study at least 30 minutes today to keep your 14-day streak alive.</p>
            </div>
            <div className="tip-item">
              <span className="tip-bullet">🎯</span>
              <p>You're only 250 XP away from Level 28. Complete 2 daily challenges to level up!</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
