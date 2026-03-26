import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { BarChart3, TrendingUp, AlertTriangle, Zap, Target, Sparkles } from 'lucide-react';
import { grades, behavioralData } from '../data/mockData';
import InPageNav from '../components/Layout/InPageNav';
import './Analytics.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function Analytics() {
  const trendData = {
    labels: grades.history.map(h => h.month),
    datasets: [{
      label: 'Your Average',
      data: grades.history.map(h => h.avg),
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.08)',
      fill: true, tension: 0.4, pointRadius: 5, pointBackgroundColor: '#6366f1',
    }, {
      label: 'Class Average',
      data: [74, 73, 75, 74, 76, 75],
      borderColor: '#64748b',
      backgroundColor: 'rgba(100,116,139,0.05)',
      fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#64748b', borderDash: [5, 5],
    }]
  };

  const opts = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { labels: { color: '#94a3b8', font: { size: 11 } } } },
    scales: {
      x: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b' }, min: 65, max: 100 }
    }
  };

  const studyVsScore = {
    labels: ['1h', '2h', '3h', '4h', '5h', '6h'],
    datasets: [{
      label: 'Score %',
      data: [62, 71, 79, 86, 89, 91],
      borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.08)',
      fill: true, tension: 0.4, pointRadius: 6, pointBackgroundColor: '#10b981',
    }]
  };

  const weakTopics = grades.current.flatMap(s =>
    s.chapters.filter(c => c.mastery < 80).map(c => ({ ...c, subject: s.subject }))
  ).sort((a, b) => a.mastery - b.mastery);

  const navSections = [
    { id: 'ai-insights', label: 'AI Highlights', icon: <Sparkles size={14} /> },
    { id: 'trends', label: 'Performance Trends', icon: <TrendingUp size={14} /> },
    { id: 'weak-topics', label: 'Weak Topics & Consistency', icon: <AlertTriangle size={14} /> },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Smart Analytics</h1>
        <p>Deep insights into your academic performance</p>
      </div>

      <InPageNav sections={navSections} />

      {/* AI Tags */}
      <div id="ai-insights" style={{ scrollMarginTop: '180px' }} className="ai-tags-row">
        <motion.div className="ai-tag warning" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          ⚠️ Risk of drop in Physics performance
        </motion.div>
        <motion.div className="ai-tag success" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          ✨ Math performance trending upward!
        </motion.div>
        <motion.div className="ai-tag info" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          📈 CS is your strongest subject
        </motion.div>
      </div>

      <div id="trends" style={{ scrollMarginTop: '180px' }} className="analytics-grid">
        {/* Performance Trend */}
        <motion.div className="glass-card" style={{ padding: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3><TrendingUp size={16} /> Performance Trend Analysis</h3>
          <div style={{ height: 280 }}><Line data={trendData} options={opts} /></div>
        </motion.div>

        {/* Study Time vs Score */}
        <motion.div className="glass-card" style={{ padding: 24 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3><Zap size={16} /> Study Time vs Score Correlation</h3>
          <div style={{ height: 280 }}><Line data={studyVsScore} options={{...opts, scales: {...opts.scales, y: {...opts.scales.y, min: 50}}}} /></div>
          <div className="ai-tag success" style={{ marginTop: 12 }}>📊 Sweet spot: 3-4 hours/day for optimal results</div>
        </motion.div>
      </div>

      {/* Weak Topic Detection + Consistency */}
      <div id="weak-topics" style={{ scrollMarginTop: '180px' }} className="analytics-bottom">
        <motion.div className="glass-card weak-topics-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3><AlertTriangle size={16} /> Weak Topic Detection</h3>
          <div className="weak-list">
            {weakTopics.map((t, i) => (
              <div key={i} className="weak-item">
                <div className="weak-info">
                  <span className={`weak-severity ${t.mastery < 65 ? 'critical' : t.mastery < 75 ? 'warning' : 'low'}`} />
                  <div>
                    <span className="weak-chapter">{t.name}</span>
                    <span className="weak-subject">{t.subject}</span>
                  </div>
                </div>
                <div className="weak-bar-wrap">
                  <div className="progress-bar" style={{ height: 6, flex: 1 }}>
                    <div className="progress-fill" style={{ width: `${t.mastery}%`, background: t.mastery < 65 ? 'var(--gradient-danger)' : t.mastery < 75 ? 'var(--gradient-gold)' : 'var(--gradient-primary)' }} />
                  </div>
                  <span className="weak-pct">{t.mastery}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="glass-card consistency-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3><Target size={16} /> Consistency Score</h3>
          <div className="consistency-gauge">
            <svg viewBox="0 0 200 120" className="gauge-svg">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="12" strokeLinecap="round" />
              <motion.path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#consGrad)" strokeWidth="12" strokeLinecap="round"
                strokeDasharray="251" initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 * (1 - behavioralData.consistencyScore / 100) }}
                transition={{ duration: 2, ease: 'easeOut' }} />
              <defs><linearGradient id="consGrad"><stop offset="0%" stopColor="#6366f1" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
            </svg>
            <div className="gauge-value">{behavioralData.consistencyScore}%</div>
            <div className="gauge-label">Discipline Index</div>
          </div>
          <div className="consistency-details">
            <div className="cons-item"><span>Peak Study Time</span><strong>{behavioralData.studyPatterns.peakHour}</strong></div>
            <div className="cons-item"><span>Avg Daily Hours</span><strong>{behavioralData.studyPatterns.avgDailyHours}h</strong></div>
            <div className="cons-item"><span>Break Frequency</span><strong>{behavioralData.studyPatterns.breakFrequency}</strong></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
