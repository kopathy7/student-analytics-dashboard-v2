import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, Star, Award, Flame } from 'lucide-react';
import { leaderboard, studentProfile } from '../data/mockData';
import './Leaderboard.css';

export default function Leaderboard() {
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="leaderboard-page">
      <div className="page-header">
        <h1>Leaderboard</h1>
        <p>See how you stack up against your peers</p>
      </div>

      {/* Podium */}
      <div className="podium-section">
        {[top3[1], top3[0], top3[2]].map((student, i) => {
          const positions = [2, 1, 3];
          const pos = positions[i];
          const heights = [160, 200, 130];
          const medals = ['🥈', '🥇', '🥉'];

          return (
            <motion.div
              key={student.rank}
              className={`podium-item pos-${pos} ${student.isCurrentUser ? 'is-you' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, type: 'spring', stiffness: 200 }}
            >
              <div className="podium-avatar">
                <span className="avatar-emoji">{student.avatar}</span>
                <span className="podium-medal">{medals[i]}</span>
              </div>
              <h3 className="podium-name">{student.name}</h3>
              <p className="podium-score">{student.score}%</p>
              <div className="podium-xp"><Star size={12} /> {student.xp.toLocaleString()} XP</div>
              <motion.div
                className="podium-bar"
                initial={{ height: 0 }}
                animate={{ height: heights[i] }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              >
                <span className="podium-rank">#{pos}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Ranking Table */}
      <motion.div className="glass-card ranking-table" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <div className="table-header">
          <span>Rank</span><span>Student</span><span>Score</span><span>Level</span><span>XP</span><span>Change</span>
        </div>
        {leaderboard.map((student, i) => (
          <motion.div
            key={student.rank}
            className={`table-row ${student.isCurrentUser ? 'highlight-row' : ''}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.05 }}
          >
            <span className="rank-num">#{student.rank}</span>
            <div className="student-cell">
              <span className="table-avatar">{student.avatar}</span>
              <span className="table-name">{student.name} {student.isCurrentUser && <span className="you-badge">YOU</span>}</span>
            </div>
            <span className="score-cell">{student.score}%</span>
            <span className="level-cell">
              <span className="level-badge">Lv.{student.level}</span>
            </span>
            <span className="xp-cell">{student.xp.toLocaleString()}</span>
            <span className={`change-cell ${student.change > 0 ? 'up' : student.change < 0 ? 'down' : ''}`}>
              {student.change > 0 ? <TrendingUp size={14} /> : student.change < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
              {student.change !== 0 && Math.abs(student.change)}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
