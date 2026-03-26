import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CalendarCheck, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { attendance, studyHeatmap } from '../data/mockData';
import InPageNav from '../components/Layout/InPageNav';
import './Attendance.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Attendance() {
  const [heatmapView] = useState('6months');
  const summary = attendance.summary;

  // GitHub-style heatmap
  const weeks = useMemo(() => {
    const w = [];
    let currentWeek = [];
    studyHeatmap.forEach((day, i) => {
      currentWeek.push(day);
      if (day.dayOfWeek === 6 || i === studyHeatmap.length - 1) {
        w.push([...currentWeek]);
        currentWeek = [];
      }
    });
    return w;
  }, []);

  const getHeatColor = (hours) => {
    if (hours === 0) return 'rgba(99, 102, 241, 0.05)';
    if (hours <= 1) return 'rgba(99, 102, 241, 0.2)';
    if (hours <= 2) return 'rgba(99, 102, 241, 0.35)';
    if (hours <= 3) return 'rgba(99, 102, 241, 0.5)';
    if (hours <= 4) return 'rgba(99, 102, 241, 0.7)';
    return 'rgba(99, 102, 241, 0.9)';
  };

  // Monthly attendance bar chart
  const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
  const monthlyData = months.map((m, idx) => {
    const monthNum = idx < 3 ? idx + 10 : idx - 2;
    const year = idx < 3 ? 2025 : 2026;
    const monthRecords = attendance.records.filter(r => {
      const d = new Date(r.date);
      return d.getMonth() + 1 === monthNum && d.getFullYear() === year;
    });
    const present = monthRecords.filter(r => r.status === 'present' || r.status === 'late').length;
    return Math.round((present / (monthRecords.length || 1)) * 100);
  });

  const barData = {
    labels: months,
    datasets: [{
      label: 'Attendance %',
      data: monthlyData,
      backgroundColor: monthlyData.map(v => v >= 90 ? '#10b981' : v >= 75 ? '#f59e0b' : '#ef4444'),
      borderRadius: 6,
      barPercentage: 0.6,
    }]
  };

  const barOpts = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
      y: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b' }, min: 60, max: 100 }
    }
  };

  const navSections = [
    { id: 'summary', label: 'Overview', icon: <CalendarCheck size={14} /> },
    { id: 'heatmap', label: 'Study Hour Heatmap', icon: <Clock size={14} /> },
    { id: 'monthly', label: 'Monthly Attendance', icon: <TrendingUp size={14} /> },
    { id: 'impact', label: 'Attendance vs Performance', icon: <AlertTriangle size={14} /> },
  ];

  return (
    <div className="attendance-page">
      <div className="page-header">
        <h1>Attendance Tracking</h1>
        <p>Your daily attendance patterns and study hours</p>
      </div>

      <InPageNav sections={navSections} />

      {/* Summary Cards */}
      <div id="summary" className="grid-4" style={{ scrollMarginTop: '180px' }}>
        {[
          { label: 'Total Days', value: summary.total, icon: <CalendarCheck size={20} />, color: '#6366f1' },
          { label: 'Present', value: summary.present, icon: <CheckCircle size={20} />, color: '#10b981' },
          { label: 'Late', value: summary.late, icon: <AlertTriangle size={20} />, color: '#f59e0b' },
          { label: 'Absent', value: summary.absent, icon: <AlertTriangle size={20} />, color: '#ef4444' },
        ].map((s, i) => (
          <motion.div key={i} className="glass-card stat-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <div className="stat-icon" style={{ background: `${s.color}20`, color: s.color }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="attendance-grid">
        {/* Heatmap */}
        <motion.div id="heatmap" style={{ scrollMarginTop: '180px' }} className="glass-card heatmap-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3>📅 Study Hours Heatmap</h3>
          <p className="heatmap-subtitle">Daily study hours over the past 6 months</p>
          <div className="heatmap-container">
            <div className="heatmap-days">
              {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="heatmap-grid">
              {weeks.map((week, wi) => (
                <div key={wi} className="heatmap-col">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      className="heatmap-cell"
                      style={{ background: getHeatColor(day.hours) }}
                      title={`${day.date}: ${day.hours}h studied`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            {[0, 1, 2, 3, 4, 5].map(h => (
              <div key={h} className="heatmap-cell" style={{ background: getHeatColor(h) }} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        {/* Monthly Bar */}
        <motion.div id="monthly" style={{ scrollMarginTop: '180px' }} className="glass-card monthly-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3><TrendingUp size={16} /> Monthly Attendance</h3>
          <div style={{ height: 250 }}>
            <Bar data={barData} options={barOpts} />
          </div>
        </motion.div>
      </div>

      {/* Attendance Impact */}
      <motion.div id="impact" style={{ scrollMarginTop: '180px' }} className="glass-card impact-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h3>📊 Attendance vs Performance Impact</h3>
        <div className="impact-content">
          <div className="impact-stat">
            <div className="impact-circle" style={{ '--pct': '87%', '--clr': '#10b981' }}>
              <span>87%</span>
            </div>
            <p>Avg score in months with {'>'}90% attendance</p>
          </div>
          <div className="impact-arrow">→</div>
          <div className="impact-stat">
            <div className="impact-circle" style={{ '--pct': '72%', '--clr': '#ef4444' }}>
              <span>72%</span>
            </div>
            <p>Avg score in months with {'<'}80% attendance</p>
          </div>
          <div className="ai-tag success">✨ Strong correlation: Higher attendance = better scores</div>
        </div>
      </motion.div>
    </div>
  );
}
