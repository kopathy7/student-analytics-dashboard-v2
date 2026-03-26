import { motion } from 'framer-motion';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Award, Star, BookOpen, Clock, MapPin, Mail, Phone, Calendar } from 'lucide-react';
import { studentProfile, grades, subjects } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export default function Profile() {
  const { user } = useAuth();

  const radarData = {
    labels: grades.current.map(g => g.subject.slice(0, 8)),
    datasets: [{
      label: 'Score',
      data: grades.current.map(g => g.score),
      backgroundColor: 'rgba(99, 102, 241, 0.15)',
      borderColor: '#6366f1',
      borderWidth: 2,
      pointBackgroundColor: '#6366f1',
      pointRadius: 4,
    }]
  };

  const radarOpts = {
    responsive: true,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        grid: { color: 'rgba(99,102,241,0.1)' },
        angleLines: { color: 'rgba(99,102,241,0.1)' },
        pointLabels: { color: '#94a3b8', font: { size: 11 } },
        ticks: { display: false },
      }
    },
    plugins: { legend: { display: false } }
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Student Profile</h1>
        <p>Your personalized academic identity</p>
      </div>

      <div className="profile-layout">
        {/* Profile Card */}
        <motion.div className="glass-card profile-main" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="profile-avatar-section">
            <div className="profile-avatar-large">
              <span>{studentProfile.avatar}</span>
              <div className="level-badge-large">Lv.{studentProfile.level}</div>
            </div>
            <h2>{user?.name || studentProfile.name}</h2>
            <p className="profile-id">{studentProfile.id}</p>
            <p className="profile-motto">"{studentProfile.motto}"</p>
          </div>

          <div className="profile-details">
            <div className="detail-row"><MapPin size={14} /><span>{studentProfile.school}</span></div>
            <div className="detail-row"><BookOpen size={14} /><span>{studentProfile.grade} — Section {studentProfile.section}</span></div>
            <div className="detail-row"><Mail size={14} /><span>{user?.email || studentProfile.email}</span></div>
            <div className="detail-row"><Phone size={14} /><span>{studentProfile.phone}</span></div>
            <div className="detail-row"><Calendar size={14} /><span>Joined {new Date(studentProfile.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span></div>
          </div>

          <div className="profile-bio">
            <h4>About</h4>
            <p>{studentProfile.bio}</p>
          </div>

          <div className="profile-stats-row">
            <div className="profile-stat">
              <span className="ps-value">#{studentProfile.rank}</span>
              <span className="ps-label">Rank</span>
            </div>
            <div className="profile-stat">
              <span className="ps-value">{studentProfile.totalXP.toLocaleString()}</span>
              <span className="ps-label">Total XP</span>
            </div>
            <div className="profile-stat">
              <span className="ps-value">{studentProfile.streak}🔥</span>
              <span className="ps-label">Streak</span>
            </div>
          </div>

          <div className="xp-section">
            <div className="xp-header">
              <span>Level {studentProfile.level}</span>
              <span>{studentProfile.xp} / {studentProfile.xpToNext} XP</span>
            </div>
            <div className="progress-bar" style={{ height: 10 }}>
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${(studentProfile.xp / studentProfile.xpToNext) * 100}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="profile-right">
          {/* Skills Radar */}
          <motion.div className="glass-card radar-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3><Star size={16} /> Skills Radar</h3>
            <div style={{ maxWidth: 300, margin: '0 auto' }}>
              <Radar data={radarData} options={radarOpts} />
            </div>
          </motion.div>

          {/* Learning Style */}
          <motion.div className="glass-card style-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3>🧠 Learning Style</h3>
            <div className="style-badge">{studentProfile.learningStyle} Learner</div>
            <p className="style-desc">You learn best through diagrams, charts, and visual representations. Use color-coded notes and mind maps for maximum retention.</p>
          </motion.div>

          {/* Badges Preview */}
          <motion.div className="glass-card badges-preview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3><Award size={16} /> Badges Earned</h3>
            <div className="badges-grid-small">
              {studentProfile.badges.filter(b => b.earned).map(badge => (
                <div key={badge.id} className="badge-mini" title={badge.desc}>
                  <span>{badge.icon}</span>
                  <span className="badge-mini-name">{badge.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
