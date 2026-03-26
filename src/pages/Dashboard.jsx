import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { TrendingUp, BookOpen, Target, Clock, Award, Flame, Calendar, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StudyBuddy from '../components/Characters/StudyBuddy';
import { studentProfile, grades, attendance, exams, motivationalQuotes, dailyChallenges } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

function CountUp({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [quote] = useState(() => motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  const avgScore = Math.round(grades.current.reduce((s, g) => s + g.score, 0) / grades.current.length);

  const attendanceData = {
    labels: ['Present', 'Late', 'Absent'],
    datasets: [{
      data: [attendance.summary.present, attendance.summary.late, attendance.summary.absent],
      backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0,
      cutout: '75%',
    }]
  };

  const trendData = {
    labels: grades.history.map(h => h.month.split(' ')[0]),
    datasets: [{
      label: 'Average Score',
      data: grades.history.map(h => h.avg),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#6366f1',
    }]
  };

  const trendOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b', font: { size: 11 } } },
      y: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b', font: { size: 11 } }, min: 70, max: 100 }
    }
  };

  const nextExam = exams[0];
  const daysToExam = Math.ceil((new Date(nextExam.date) - new Date()) / (1000 * 60 * 60 * 24));

  return (
    <div className="dashboard-page">
      {/* Welcome Banner */}
      <motion.div
        className="welcome-banner glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="welcome-left">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Welcome back, {user?.name?.split(' ')[0] || studentProfile.name.split(' ')[0]}! 👋
          </motion.h1>
          <p className="welcome-subtitle">Ready to crush your goals today? Your consistency score is looking great!</p>
          <div className="welcome-quote">
            <Sparkles size={14} />
            <em>"{quote.quote}"</em>
            <span>— {quote.author}</span>
          </div>
        </div>
        <div className="welcome-right">
          <StudyBuddy mood="happy" message="Let's study! 🚀" />
        </div>
        <div className="welcome-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid-4 stats-grid">
        {[
          { label: 'Average Score', value: avgScore, suffix: '%', icon: <Target size={22} />, color: '#6366f1', change: '+3.5%', positive: true },
          { label: 'Attendance', value: attendance.summary.percentage, suffix: '%', icon: <Calendar size={22} />, color: '#10b981', change: '+1.2%', positive: true },
          { label: 'XP Points', value: studentProfile.totalXP, suffix: '', icon: <Award size={22} />, color: '#a855f7', change: '+450', positive: true },
          { label: 'Study Streak', value: studentProfile.streak, suffix: ' days', icon: <Flame size={22} />, color: '#f97316', change: 'On fire!', positive: true },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="glass-card stat-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (i + 1), duration: 0.5 }}
          >
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-value" style={{ color: stat.color }}>
              <CountUp end={stat.value} suffix={stat.suffix} />
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
              {stat.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Performance Trend */}
        <motion.div
          className="glass-card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={18} />
              <h3>Performance Trend</h3>
            </div>
            <span className="badge badge-success">↑ Improving</span>
          </div>
          <div className="chart-wrapper" style={{ height: 220 }}>
            <Line data={trendData} options={trendOptions} />
          </div>
        </motion.div>

        {/* Attendance Donut */}
        <motion.div
          className="glass-card chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="card-header">
            <div className="card-title">
              <Calendar size={18} />
              <h3>Attendance</h3>
            </div>
            <span className="badge badge-info">{attendance.summary.percentage}%</span>
          </div>
          <div className="donut-wrapper">
            <div className="donut-chart">
              <Doughnut data={attendanceData} options={{ plugins: { legend: { display: false } }, cutout: '75%' }} />
              <div className="donut-center">
                <span className="donut-value">{attendance.summary.percentage}%</span>
                <span className="donut-label">Present</span>
              </div>
            </div>
            <div className="donut-legend">
              <div className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }} /> Present ({attendance.summary.present})</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }} /> Late ({attendance.summary.late})</div>
              <div className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }} /> Absent ({attendance.summary.absent})</div>
            </div>
          </div>
        </motion.div>

        {/* Subject Performance */}
        <motion.div
          className="glass-card subjects-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="card-header">
            <div className="card-title">
              <BookOpen size={18} />
              <h3>Subject Scores</h3>
            </div>
          </div>
          <div className="subjects-list">
            {grades.current.map((g, i) => (
              <div key={i} className="subject-row">
                <div className="subject-info">
                  <span className="subject-name">{g.subject}</span>
                  <span className="subject-grade">{g.grade}</span>
                </div>
                <div className="subject-bar-wrap">
                  <div className="progress-bar">
                    <motion.div
                      className="progress-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${g.score}%` }}
                      transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                      style={{
                        background: g.score >= 90 ? 'var(--gradient-success)' :
                                   g.score >= 80 ? 'var(--gradient-primary)' :
                                   g.score >= 70 ? 'var(--gradient-gold)' : 'var(--gradient-danger)'
                      }}
                    />
                  </div>
                  <span className="subject-score">{g.score}%</span>
                </div>
                <div className={`subject-trend ${g.trend === 'up' ? 'positive' : g.trend === 'down' ? 'negative' : ''}`}>
                  {g.trend === 'up' ? <ArrowUpRight size={14} /> : g.trend === 'down' ? <ArrowDownRight size={14} /> : '—'}
                  {g.change !== 0 && <span>{g.change > 0 ? '+' : ''}{g.change}%</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming & Challenges */}
        <motion.div
          className="glass-card upcoming-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="card-header">
            <div className="card-title">
              <Clock size={18} />
              <h3>Upcoming Exams</h3>
            </div>
          </div>
          <div className="upcoming-list">
            {exams.slice(0, 3).map((exam, i) => {
              const days = Math.ceil((new Date(exam.date) - new Date()) / (1000 * 60 * 60 * 24));
              return (
                <div key={i} className="upcoming-item">
                  <div className="upcoming-date">
                    <span className="date-day">{new Date(exam.date).getDate()}</span>
                    <span className="date-month">{new Date(exam.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                  <div className="upcoming-info">
                    <span className="upcoming-subject">{exam.subject}</span>
                    <span className="upcoming-type">{exam.type}</span>
                  </div>
                  <div className={`upcoming-days ${days <= 7 ? 'urgent' : ''}`}>
                    {days}d
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-divider" />

          <div className="card-header">
            <div className="card-title">
              <Target size={18} />
              <h3>Daily Challenges</h3>
            </div>
          </div>
          <div className="challenges-list">
            {dailyChallenges.map((ch, i) => (
              <div key={i} className={`challenge-item ${ch.completed ? 'completed' : ''}`}>
                <span className="challenge-icon">{ch.icon}</span>
                <div className="challenge-info">
                  <span className="challenge-title">{ch.title}</span>
                  <span className="challenge-xp">+{ch.xp} XP</span>
                </div>
                <div className={`challenge-check ${ch.completed ? 'done' : ''}`}>
                  {ch.completed ? '✓' : ''}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
