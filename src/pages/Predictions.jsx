import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, AlertTriangle, Sparkles, Lightbulb, BarChart3, Target, Eye } from 'lucide-react';
import { predictions, grades } from '../data/mockData';
import './Predictions.css';

export default function Predictions() {
  const [whatIfSubject, setWhatIfSubject] = useState('Math');
  const [whatIfImprove, setWhatIfImprove] = useState(10);

  const currentAvg = Math.round(grades.current.reduce((s, g) => s + g.score, 0) / grades.current.length);
  const whatIfScore = Math.round(currentAvg + (whatIfImprove * 0.7));

  return (
    <div className="predictions-page">
      <div className="page-header">
        <h1>Predictions & Simulations</h1>
        <p>AI-powered future insights and what-if scenarios</p>
      </div>

      <div className="predictions-grid">
        {/* Future You Simulator */}
        <motion.div className="glass-card future-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3><Sparkles size={16} /> Future You Simulator</h3>
          <p className="future-sub">Where you'll be in 6 months if current habits continue</p>
          <div className="future-timeline">
            {['Now', '1 Month', '3 Months', '6 Months'].map((label, i) => {
              const scores = [currentAvg, currentAvg + 2, currentAvg + 5, currentAvg + 8];
              return (
                <motion.div key={i} className="timeline-point" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.2 }}>
                  <div className="timeline-circle" style={{ background: i === 3 ? 'var(--gradient-success)' : i === 0 ? 'var(--gradient-primary)' : 'var(--gradient-secondary)' }}>
                    <span>{Math.min(99, scores[i])}%</span>
                  </div>
                  <span className="timeline-label">{label}</span>
                  {i < 3 && <div className="timeline-line" />}
                </motion.div>
              );
            })}
          </div>
          <div className="ai-tag success" style={{ marginTop: 16 }}>🚀 Projected rank improvement: #3 → #2 in 3 months!</div>
        </motion.div>

        {/* What-If Simulator */}
        <motion.div className="glass-card whatif-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3><Target size={16} /> What-If Simulation</h3>
          <div className="whatif-controls">
            <label>If I improve <strong>{whatIfSubject}</strong> by</label>
            <div className="whatif-slider">
              <input type="range" min="5" max="30" value={whatIfImprove} onChange={e => setWhatIfImprove(Number(e.target.value))} />
              <span className="whatif-pct">{whatIfImprove}%</span>
            </div>
            <select value={whatIfSubject} onChange={e => setWhatIfSubject(e.target.value)} className="whatif-select">
              {grades.current.map(g => <option key={g.subject} value={g.subject}>{g.subject}</option>)}
            </select>
          </div>
          <div className="whatif-result">
            <div className="whatif-before">
              <span className="whatif-label">Current</span>
              <span className="whatif-score">{currentAvg}%</span>
            </div>
            <div className="whatif-arrow">→</div>
            <motion.div className="whatif-after" key={whatIfScore} initial={{ scale: 1.2, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <span className="whatif-label">Projected</span>
              <span className="whatif-score glow">{Math.min(99, whatIfScore)}%</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="predictions-bottom">
        {/* Gauges Row */}
        <div className="gauge-row">
          <motion.div className="glass-card mini-gauge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <AlertTriangle size={20} className="gauge-icon risk" />
            <div className="gauge-info">
              <span className="gauge-val">{predictions.dropoutRisk}%</span>
              <span className="gauge-name">Dropout Risk</span>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${predictions.dropoutRisk}%`, background: 'var(--gradient-success)' }} />
            </div>
          </motion.div>

          <motion.div className="glass-card mini-gauge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <TrendingUp size={20} className="gauge-icon success" />
            <div className="gauge-info">
              <span className="gauge-val">{predictions.examSuccessProbability}%</span>
              <span className="gauge-name">Exam Success Probability</span>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${predictions.examSuccessProbability}%`, background: 'var(--gradient-primary)' }} />
            </div>
          </motion.div>

          <motion.div className="glass-card mini-gauge" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <BarChart3 size={20} className="gauge-icon info" />
            <div className="gauge-info">
              <span className="gauge-val">{predictions.efficiencyScore}%</span>
              <span className="gauge-name">Learning Efficiency</span>
            </div>
            <div className="progress-bar" style={{ height: 6 }}>
              <div className="progress-fill" style={{ width: `${predictions.efficiencyScore}%`, background: 'var(--gradient-gold)' }} />
            </div>
          </motion.div>
        </div>

        {/* Hidden Talents */}
        <motion.div className="glass-card talents-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3><Eye size={16} /> Hidden Talent Detector</h3>
          <div className="talents-grid">
            {predictions.hiddenTalents.map((talent, i) => (
              <motion.div key={i} className="talent-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                <div className="talent-header">
                  <span className="talent-emoji">{i === 0 ? '🧩' : i === 1 ? '✍️' : '📊'}</span>
                  <h4>{talent.talent}</h4>
                  <span className="talent-confidence">{talent.confidence}% confidence</span>
                </div>
                <p className="talent-desc">{talent.desc}</p>
                <div className="progress-bar" style={{ height: 4 }}>
                  <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${talent.confidence}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 1 }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
