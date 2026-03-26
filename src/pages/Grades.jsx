import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Bar, Radar } from 'react-chartjs-2';
import { GraduationCap, TrendingUp, AlertTriangle, BarChart2, BookOpen } from 'lucide-react';
import { grades, subjects } from '../data/mockData';
import InPageNav from '../components/Layout/InPageNav';
import './Grades.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Grades() {
  const avgScore = Math.round(grades.current.reduce((s, g) => s + g.score, 0) / grades.current.length);

  const barData = {
    labels: grades.current.map(g => g.subject.slice(0, 6)),
    datasets: [{
      label: 'Your Score',
      data: grades.current.map(g => g.score),
      backgroundColor: grades.current.map(g =>
        g.score >= 90 ? 'rgba(16,185,129,0.7)' :
        g.score >= 80 ? 'rgba(99,102,241,0.7)' :
        g.score >= 70 ? 'rgba(245,158,11,0.7)' : 'rgba(239,68,68,0.7)'
      ),
      borderRadius: 8,
      barPercentage: 0.6,
    }, {
      label: 'Class Average',
      data: [78, 72, 75, 74, 80, 68, 70],
      backgroundColor: 'rgba(100,116,139,0.3)',
      borderRadius: 8,
      barPercentage: 0.6,
    }]
  };

  const barOpts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 11 } } } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b' }, min: 50, max: 100 }
    }
  };

  const navSections = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp size={14} /> },
    { id: 'comparison', label: 'Subject Comparison', icon: <BarChart2 size={14} /> },
    { id: 'chapters', label: 'Chapter Breakdown', icon: <BookOpen size={14} /> },
  ];

  return (
    <div className="grades-page">
      <div className="page-header">
        <h1>Marks & Grades</h1>
        <p>Subject-wise performance and chapter-level insights</p>
      </div>

      <InPageNav sections={navSections} />

      <div className="grades-overview">
        <motion.div id="overview" style={{ scrollMarginTop: '180px' }} className="glass-card avg-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="avg-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="8" />
              <motion.circle cx="60" cy="60" r="52" fill="none" stroke="url(#avgGrad)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 52}`} initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - avgScore / 100) }}
                transition={{ duration: 2, ease: 'easeOut' }} strokeLinecap="round" transform="rotate(-90 60 60)" />
              <defs><linearGradient id="avgGrad"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs>
            </svg>
            <div className="avg-text">
              <span className="avg-num">{avgScore}%</span>
              <span className="avg-label">Average</span>
            </div>
          </div>
          <div className="avg-meta">
            <span className="badge badge-success">↑ +3.5% from last month</span>
            <p>Overall GPA: <strong>3.8</strong></p>
          </div>
        </motion.div>

        <motion.div id="comparison" style={{ scrollMarginTop: '180px' }} className="glass-card bar-chart-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3><GraduationCap size={16} /> Subject Comparison</h3>
          <div style={{ height: 280 }}><Bar data={barData} options={barOpts} /></div>
        </motion.div>
      </div>

      {/* Chapter Level Breakdown */}
      <div id="chapters" style={{ scrollMarginTop: '180px' }} className="section-header"><h2 className="section-title">Chapter-Level Breakdown</h2></div>
      <div className="chapters-grid">
        {grades.current.map((subj, i) => (
          <motion.div key={i} className="glass-card chapter-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
            <div className="chapter-header">
              <h4>{subj.subject}</h4>
              <span className={`badge ${subj.trend === 'up' ? 'badge-success' : subj.trend === 'down' ? 'badge-danger' : 'badge-info'}`}>
                {subj.trend === 'up' ? '↑' : subj.trend === 'down' ? '↓' : '—'} {subj.grade}
              </span>
            </div>
            {subj.chapters.map((ch, ci) => (
              <div key={ci} className="chapter-row">
                <span className="ch-name">{ch.name}</span>
                <div className="ch-bar-wrap">
                  <div className="progress-bar" style={{ height: 6 }}>
                    <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${ch.mastery}%` }}
                      transition={{ delay: 0.5 + ci * 0.1, duration: 1 }}
                      style={{ background: ch.mastery >= 85 ? 'var(--gradient-success)' : ch.mastery >= 70 ? 'var(--gradient-primary)' : 'var(--gradient-danger)' }} />
                  </div>
                  <span className="ch-score">{ch.mastery}%</span>
                </div>
                {ch.mastery < 70 && <span className="ai-tag danger" style={{ fontSize: 10, padding: '2px 8px' }}>⚠️ Needs Focus</span>}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
