import { motion } from 'framer-motion';
import { Brain, Zap, AlertTriangle, Eye, Heart, Activity } from 'lucide-react';
import { behavioralData } from '../data/mockData';
import './Behavioral.css';

export default function Behavioral() {
  const { focusScore, procrastinationIndex, burnoutRisk, learningStyle, moodHistory } = behavioralData;
  const moodEmojis = { focused: '🎯', motivated: '💪', tired: '😴', stressed: '😰', calm: '😌', energetic: '⚡' };

  return (
    <div className="behavioral-page">
      <div className="page-header">
        <h1>Behavioral & Psychology</h1>
        <p>Understanding your study patterns and mental wellness</p>
      </div>

      <div className="behavioral-grid">
        {/* Focus Score */}
        <motion.div className="glass-card gauge-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3><Eye size={16} /> Focus Score</h3>
          <div className="speedometer">
            <svg viewBox="0 0 200 120">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="14" strokeLinecap="round" />
              <motion.path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#focusGrad)" strokeWidth="14" strokeLinecap="round"
                strokeDasharray="251" initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 * (1 - focusScore / 100) }}
                transition={{ duration: 2 }} />
              <defs><linearGradient id="focusGrad"><stop offset="0%" stopColor="#ef4444" /><stop offset="50%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
            </svg>
            <div className="speed-value">{focusScore}</div>
            <div className="speed-label">/ 100</div>
          </div>
          <div className="ai-tag success">✨ Above average focus level</div>
        </motion.div>

        {/* Procrastination */}
        <motion.div className="glass-card gauge-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3><Activity size={16} /> Procrastination Index</h3>
          <div className="speedometer">
            <svg viewBox="0 0 200 120">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="14" strokeLinecap="round" />
              <motion.path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#procGrad)" strokeWidth="14" strokeLinecap="round"
                strokeDasharray="251" initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 * (1 - procrastinationIndex / 100) }}
                transition={{ duration: 2 }} />
              <defs><linearGradient id="procGrad"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
            </svg>
            <div className="speed-value">{procrastinationIndex}%</div>
            <div className="speed-label">Low risk</div>
          </div>
          <div className="ai-tag success">👍 Well managed procrastination</div>
        </motion.div>

        {/* Burnout Risk */}
        <motion.div className="glass-card gauge-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3><AlertTriangle size={16} /> Burnout Risk</h3>
          <div className="speedometer">
            <svg viewBox="0 0 200 120">
              <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(99,102,241,0.1)" strokeWidth="14" strokeLinecap="round" />
              <motion.path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={burnoutRisk > 60 ? '#ef4444' : burnoutRisk > 40 ? '#f59e0b' : '#10b981'} strokeWidth="14" strokeLinecap="round"
                strokeDasharray="251" initial={{ strokeDashoffset: 251 }}
                animate={{ strokeDashoffset: 251 * (1 - burnoutRisk / 100) }}
                transition={{ duration: 2 }} />
            </svg>
            <div className="speed-value">{burnoutRisk}%</div>
            <div className="speed-label">Moderate</div>
          </div>
          <div className="ai-tag warning">⚡ Consider taking more breaks</div>
        </motion.div>
      </div>

      <div className="behavioral-bottom">
        {/* Learning Style */}
        <motion.div className="glass-card style-detect-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3><Brain size={16} /> Learning Style Detection</h3>
          <div className="style-bars">
            {Object.entries(learningStyle).map(([type, pct]) => (
              <div key={type} className="style-bar-row">
                <div className="style-type">
                  <span className="style-emoji">{type === 'visual' ? '👁️' : type === 'auditory' ? '👂' : '✋'}</span>
                  <span className="style-name">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
                </div>
                <div className="progress-bar" style={{ flex: 1, height: 10 }}>
                  <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 1.5 }}
                    style={{ background: type === 'visual' ? 'var(--gradient-primary)' : type === 'auditory' ? 'var(--gradient-success)' : 'var(--gradient-gold)' }} />
                </div>
                <span className="style-pct">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="style-recommendation">
            <h4>📋 Recommendations for Visual Learners:</h4>
            <ul>
              <li>Use mind maps and diagrams for note-taking</li>
              <li>Watch educational videos and animations</li>
              <li>Color-code your study materials</li>
              <li>Use flashcards with images</li>
              <li>Draw concepts instead of writing them</li>
            </ul>
          </div>
        </motion.div>

        {/* Mood Timeline */}
        <motion.div className="glass-card mood-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3><Heart size={16} /> Mood Timeline</h3>
          <div className="mood-timeline">
            {moodHistory.map((day, i) => (
              <motion.div key={i} className="mood-day" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.1 }}>
                <div className="mood-emoji" style={{ fontSize: day.score > 70 ? 32 : 24 }}>
                  {moodEmojis[day.mood]}
                </div>
                <div className="mood-bar-container">
                  <motion.div className="mood-bar" initial={{ height: 0 }} animate={{ height: `${day.score}%` }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                    style={{ background: day.score > 80 ? '#10b981' : day.score > 60 ? '#6366f1' : day.score > 40 ? '#f59e0b' : '#ef4444' }} />
                </div>
                <span className="mood-date">{new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}</span>
                <span className="mood-label">{day.mood}</span>
              </motion.div>
            ))}
          </div>

          <div className="mood-suggestions">
            <h4>💡 Mood-based Study Tips:</h4>
            <div className="suggestion-cards">
              <div className="suggest-card"><span>😰 Stressed?</span><p>Try breathing exercises before studying. Focus on easy wins first.</p></div>
              <div className="suggest-card"><span>😴 Tired?</span><p>Take a 20-min power nap. Then study with active recall methods.</p></div>
              <div className="suggest-card"><span>💪 Motivated?</span><p>Attack your weakest subjects now! This is the best time for hard topics.</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
