import { motion } from 'framer-motion';
import { Flame, Award, Target, Star, Zap, Swords, Trophy, Shield, Crown, BookOpen } from 'lucide-react';
import { studentProfile, dailyChallenges, studyMissions } from '../data/mockData';
import './Gamification.css';

export default function Gamification() {
  const { level, xp, xpToNext, totalXP, streak, badges } = studentProfile;
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  const levelNames = ['Beginner', 'Novice', 'Apprentice', 'Scholar', 'Expert', 'Master', 'Grandmaster', 'Genius'];
  const levelName = levelNames[Math.min(Math.floor(level / 4), levelNames.length - 1)];

  return (
    <div className="gamification-page">
      <div className="page-header">
        <h1>Gamification</h1>
        <p>Level up, earn badges, and compete with friends</p>
      </div>

      {/* Level & XP */}
      <motion.div className="glass-card level-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="level-hero">
          <div className="level-circle">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(168,85,247,0.1)" strokeWidth="8" />
              <motion.circle cx="60" cy="60" r="52" fill="none" stroke="url(#lvlGrad)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 52}`} initial={{ strokeDashoffset: 2 * Math.PI * 52 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 52 * (1 - xp / xpToNext) }}
                transition={{ duration: 2 }} strokeLinecap="round" transform="rotate(-90 60 60)" />
              <defs><linearGradient id="lvlGrad"><stop offset="0%" stopColor="#a855f7" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
            </svg>
            <div className="level-num">{level}</div>
          </div>
          <div className="level-info">
            <h2>{levelName}</h2>
            <p className="xp-text">{xp.toLocaleString()} / {xpToNext.toLocaleString()} XP to Level {level + 1}</p>
            <div className="progress-bar" style={{ height: 12 }}>
              <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${(xp / xpToNext) * 100}%` }}
                transition={{ duration: 1.5 }} style={{ background: 'linear-gradient(90deg, #a855f7, #6366f1)' }} />
            </div>
            <p className="total-xp">Total XP: {totalXP.toLocaleString()}</p>
          </div>
          <div className="streak-hero">
            <div className="streak-flames">🔥</div>
            <span className="streak-num">{streak}</span>
            <span className="streak-text">Day Streak</span>
          </div>
        </div>
      </motion.div>

      <div className="gamification-grid">
        {/* Badges */}
        <motion.div className="glass-card badges-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3><Award size={16} /> Badge Collection</h3>
          <div className="badge-section">
            <h4 className="badge-section-title">✨ Earned ({earnedBadges.length})</h4>
            <div className="badges-earned-grid">
              {earnedBadges.map((badge, i) => (
                <motion.div key={badge.id} className="badge-full earned" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                  <span className="badge-emoji">{badge.icon}</span>
                  <span className="badge-name">{badge.name}</span>
                  <span className="badge-desc">{badge.desc}</span>
                  <span className="badge-date">{new Date(badge.date).toLocaleDateString()}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="badge-section">
            <h4 className="badge-section-title">🔒 Locked ({lockedBadges.length})</h4>
            <div className="badges-locked-grid">
              {lockedBadges.map((badge) => (
                <div key={badge.id} className="badge-full locked">
                  <span className="badge-emoji">{badge.icon}</span>
                  <span className="badge-name">{badge.name}</span>
                  <span className="badge-desc">{badge.desc}</span>
                  <div className="badge-progress">
                    <div className="progress-bar" style={{ height: 4 }}>
                      <div className="progress-fill" style={{ width: `${(badge.progress / (badge.id === 7 ? 10 : badge.id === 8 ? 5 : badge.id === 9 ? 30 : badge.id === 10 ? 5 : badge.id === 11 ? 30 : 7)) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Missions & Challenges */}
        <div className="missions-col">
          <motion.div className="glass-card missions-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3><Swords size={16} /> Active Missions</h3>
            {studyMissions.map((mission, i) => (
              <div key={mission.id} className="mission-item">
                <div className="mission-header">
                  <h4>{mission.title}</h4>
                  <span className="mission-xp">+{mission.xp} XP</span>
                </div>
                <p className="mission-desc">{mission.desc}</p>
                <div className="mission-progress">
                  <div className="progress-bar" style={{ height: 8 }}>
                    <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${mission.progress}%` }}
                      transition={{ delay: 0.5, duration: 1 }} />
                  </div>
                  <span>{mission.progress}%</span>
                </div>
                <span className="mission-deadline">⏰ Deadline: {new Date(mission.deadline).toLocaleDateString()}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className="glass-card daily-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3><Target size={16} /> Daily Challenges</h3>
            {dailyChallenges.map((ch) => (
              <div key={ch.id} className={`daily-item ${ch.completed ? 'done' : ''}`}>
                <span className="daily-icon">{ch.icon}</span>
                <div className="daily-info">
                  <span className="daily-title">{ch.title}</span>
                  <span className="daily-xp">+{ch.xp} XP</span>
                </div>
                <div className={`daily-check ${ch.completed ? 'checked' : ''}`}>
                  {ch.completed ? '✓' : ''}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
