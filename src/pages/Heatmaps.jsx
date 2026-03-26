import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Grid3X3, Sun, BookOpen, Calendar } from 'lucide-react';
import { studyHeatmap, grades, productivityByHour } from '../data/mockData';
import './Heatmaps.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function Heatmaps() {
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
    if (hours <= 1) return 'rgba(99, 102, 241, 0.15)';
    if (hours <= 2) return 'rgba(99, 102, 241, 0.3)';
    if (hours <= 3) return 'rgba(99, 102, 241, 0.5)';
    if (hours <= 4) return 'rgba(99, 102, 241, 0.7)';
    return 'rgba(99, 102, 241, 0.9)';
  };

  const subjectStrength = grades.current.map(g => ({
    subject: g.subject,
    chapters: g.chapters.map(c => ({ name: c.name, score: c.mastery }))
  }));

  const getStrengthColor = (score) => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#6366f1';
    if (score >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const prodData = {
    labels: productivityByHour.map(p => p.hour),
    datasets: [{
      data: productivityByHour.map(p => p.productivity),
      backgroundColor: productivityByHour.map(p =>
        p.productivity >= 85 ? 'rgba(16,185,129,0.7)' :
        p.productivity >= 70 ? 'rgba(99,102,241,0.7)' :
        p.productivity >= 55 ? 'rgba(245,158,11,0.7)' : 'rgba(239,68,68,0.7)'
      ),
      borderRadius: 4,
    }]
  };

  return (
    <div className="heatmaps-page">
      <div className="page-header">
        <h1>Heatmaps & Visual Insights</h1>
        <p>Visualize your study patterns and performance</p>
      </div>

      {/* Study Heatmap */}
      <motion.div className="glass-card heatmap-main" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3><Grid3X3 size={16} /> Weekly Study Heatmap</h3>
        <p className="hm-sub">Your study activity over the past 6 months — like GitHub but for studying!</p>
        <div className="heatmap-container">
          <div className="heatmap-days">
            {['Mon', '', 'Wed', '', 'Fri', '', 'Sun'].map((d, i) => <span key={i}>{d}</span>)}
          </div>
          <div className="heatmap-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="heatmap-col">
                {week.map((day, di) => (
                  <motion.div key={di} className="heatmap-cell" style={{ background: getHeatColor(day.hours) }}
                    title={`${day.date}: ${day.hours}h`}
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: wi * 0.02 }} whileHover={{ scale: 1.5 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="heatmap-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4, 5].map(h => <div key={h} className="heatmap-cell" style={{ background: getHeatColor(h) }} />)}
          <span>More</span>
        </div>
      </motion.div>

      <div className="heatmaps-grid">
        {/* Subject Strength */}
        <motion.div className="glass-card strength-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3><BookOpen size={16} /> Subject Strength Heatmap</h3>
          <div className="strength-grid">
            {subjectStrength.map((subj, si) => (
              <div key={si} className="strength-row">
                <span className="strength-subject">{subj.subject.slice(0, 10)}</span>
                <div className="strength-cells">
                  {subj.chapters.map((ch, ci) => (
                    <motion.div key={ci} className="strength-cell" title={`${ch.name}: ${ch.score}%`}
                      style={{ background: getStrengthColor(ch.score) }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + si * 0.05 + ci * 0.05 }}
                      whileHover={{ scale: 1.2 }}>
                      <span>{ch.score}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="strength-legend">
            <span style={{ color: '#ef4444' }}>● {'<'}70</span>
            <span style={{ color: '#f59e0b' }}>● 70-79</span>
            <span style={{ color: '#6366f1' }}>● 80-89</span>
            <span style={{ color: '#10b981' }}>● 90+</span>
          </div>
        </motion.div>

        {/* Productivity */}
        <motion.div className="glass-card prod-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3><Sun size={16} /> Time-of-Day Productivity</h3>
          <div style={{ height: 280 }}>
            <Bar data={prodData} options={{
              responsive: true, maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b', font: { size: 9 }, maxRotation: 45 } },
                y: { grid: { color: 'rgba(99,102,241,0.05)' }, ticks: { color: '#64748b' }, min: 40, max: 100 }
              }
            }} />
          </div>
          <div className="ai-tag success" style={{ marginTop: 12 }}>⭐ Peak: 9-11 AM — schedule hard topics here!</div>
        </motion.div>
      </div>

      {/* Performance Calendar */}
      <motion.div className="glass-card calendar-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3><Calendar size={16} /> Performance Calendar — March 2026</h3>
        <div className="perf-calendar">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
            <div key={d} className="cal-header">{d}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const day = i + 1;
            const score = 60 + Math.floor(Math.random() * 35);
            const dayOfWeek = new Date(2026, 2, day).getDay();
            return (
              <motion.div key={i} className="cal-day" style={{
                gridColumnStart: day === 1 ? dayOfWeek + 1 : undefined,
                background: `rgba(${score > 85 ? '16,185,129' : score > 70 ? '99,102,241' : '245,158,11'}, ${score / 200})`
              }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.02 }}
              whileHover={{ scale: 1.1 }}>
                <span className="cal-num">{day}</span>
                <span className="cal-score">{score}%</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
