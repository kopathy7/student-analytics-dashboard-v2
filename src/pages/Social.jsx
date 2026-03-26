import { motion } from 'framer-motion';
import { Users, UserPlus, Trophy, Swords, MessageCircle } from 'lucide-react';
import { leaderboard, studyGroups } from '../data/mockData';
import './Social.css';

export default function Social() {
  const friends = leaderboard.slice(0, 6).filter(s => !s.isCurrentUser);

  return (
    <div className="social-page">
      <div className="page-header">
        <h1>Social & Competition</h1>
        <p>Compare, compete, and collaborate with peers</p>
      </div>

      <div className="social-grid">
        {/* Friends Comparison */}
        <motion.div className="glass-card friends-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3><Users size={16} /> Friend Comparison</h3>
          <div className="friends-list">
            {friends.map((f, i) => (
              <motion.div key={i} className="friend-item" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }}>
                <div className="friend-left">
                  <span className="friend-avatar">{f.avatar}</span>
                  <div className="friend-info">
                    <span className="friend-name">{f.name}</span>
                    <span className="friend-level">Lv.{f.level}</span>
                  </div>
                </div>
                <div className="friend-score-compare">
                  <div className="compare-bar">
                    <div className="compare-you" style={{ width: '89%' }}>89%</div>
                    <div className="compare-them" style={{ width: `${f.score}%` }}>{f.score}%</div>
                  </div>
                </div>
                <button className="btn btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }}>
                  <Swords size={12} /> Challenge
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Study Groups */}
        <motion.div className="glass-card groups-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3><MessageCircle size={16} /> Study Groups</h3>
          <div className="groups-list">
            {studyGroups.map((g, i) => (
              <motion.div key={i} className="group-item" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.1 }}>
                <span className="group-avatar">{g.avatar}</span>
                <div className="group-info">
                  <span className="group-name">{g.name}</span>
                  <span className="group-meta">{g.members} members · {g.subject}</span>
                </div>
                <span className={`group-status ${g.active ? 'active' : ''}`}>
                  {g.active ? '● Active' : '○ Inactive'}
                </span>
              </motion.div>
            ))}
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
              <UserPlus size={16} /> Create Study Group
            </button>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Quick */}
      <motion.div className="glass-card collab-board" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3><Trophy size={16} /> Collaborative Leaderboard</h3>
        <div className="collab-grid">
          {leaderboard.slice(0, 5).map((s, i) => (
            <motion.div key={i} className={`collab-item ${s.isCurrentUser ? 'highlighted' : ''}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
              <span className="collab-rank">#{s.rank}</span>
              <span className="collab-avatar">{s.avatar}</span>
              <div className="collab-info">
                <span className="collab-name">{s.name} {s.isCurrentUser && <span className="you-badge">YOU</span>}</span>
                <div className="collab-stats">
                  <span>Score: {s.score}%</span>
                  <span>XP: {s.xp.toLocaleString()}</span>
                </div>
              </div>
              <div className="collab-medal">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🎖️'}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
