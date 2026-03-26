import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, BookOpen, Brain, Target } from 'lucide-react';
import { grades, exams } from '../../data/mockData';
import './StudyNowButton.css';

export default function StudyNowButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Find weakest subject with upcoming exam
  const getRecommendation = () => {
    const weakest = [...grades.current].sort((a, b) => a.score - b.score);
    const nextExam = exams[0];
    const weakSubj = weakest[0];

    return {
      primary: {
        subject: weakSubj.subject,
        chapter: weakSubj.chapters.sort((a, b) => a.mastery - b.mastery)[0],
        reason: `Lowest mastery at ${weakSubj.chapters.sort((a, b) => a.mastery - b.mastery)[0].mastery}%`
      },
      exam: {
        subject: nextExam.subject,
        days: Math.ceil((new Date(nextExam.date) - new Date()) / (1000 * 60 * 60 * 24)),
        topics: nextExam.topics,
      },
      studyPlan: [
        { time: '45 min', topic: weakSubj.chapters.sort((a, b) => a.mastery - b.mastery)[0].name, subject: weakSubj.subject },
        { time: '30 min', topic: nextExam.topics[0], subject: nextExam.subject },
        { time: '20 min', topic: 'Quick Revision', subject: 'Mixed' },
      ]
    };
  };

  const rec = getRecommendation();

  return (
    <>
      <motion.button
        className="study-now-fab"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(99, 102, 241, 0.3)',
            '0 0 40px rgba(99, 102, 241, 0.6)',
            '0 0 20px rgba(99, 102, 241, 0.3)',
          ]
        }}
        transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
      >
        <Sparkles size={22} />
        <span>What Should I Study Now?</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="study-now-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="study-now-modal glass-card"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setIsOpen(false)}>
                <X size={18} />
              </button>

              <div className="study-now-header">
                <Brain size={32} className="study-now-icon" />
                <h2>AI Study Recommendation</h2>
                <p>Based on your performance data and upcoming exams</p>
              </div>

              <div className="study-now-content">
                <div className="recommendation-card primary">
                  <div className="rec-badge">🎯 TOP PRIORITY</div>
                  <h3>{rec.primary.subject}</h3>
                  <p className="rec-chapter">{rec.primary.chapter.name}</p>
                  <p className="rec-reason">{rec.primary.reason}</p>
                  <div className="rec-mastery">
                    <span>Mastery</span>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${rec.primary.chapter.mastery}%`, background: rec.primary.chapter.mastery < 70 ? 'var(--gradient-danger)' : 'var(--gradient-primary)' }} />
                    </div>
                    <span>{rec.primary.chapter.mastery}%</span>
                  </div>
                </div>

                <div className="recommendation-card exam">
                  <div className="rec-badge exam-badge">📝 EXAM IN {rec.exam.days} DAYS</div>
                  <h3>{rec.exam.subject}</h3>
                  <div className="rec-topics">
                    {rec.exam.topics.map((t, i) => (
                      <span key={i} className="topic-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="study-plan-section">
                  <h3><BookOpen size={16} /> Suggested Session</h3>
                  {rec.studyPlan.map((step, i) => (
                    <div key={i} className="plan-step">
                      <div className="step-time">{step.time}</div>
                      <div className="step-divider" />
                      <div className="step-info">
                        <span className="step-topic">{step.topic}</span>
                        <span className="step-subject">{step.subject}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="btn btn-primary start-studying" onClick={() => setIsOpen(false)}>
                  <Target size={16} />
                  Start Studying Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
