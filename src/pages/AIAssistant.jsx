import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, BookOpen, Calendar, Target } from 'lucide-react';
import { aiChatResponses, grades, exams, weeklySchedule } from '../data/mockData';
import StudyBuddy from '../components/Characters/StudyBuddy';
import './AIAssistant.css';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hi Alex! 👋 I'm your AI Study Assistant. Ask me anything about your studies — what to focus on, score predictions, study plans, or just need motivation!", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const getAIResponse = (msg) => {
    const lower = msg.toLowerCase();
    for (const r of aiChatResponses) {
      if (r.trigger !== 'default' && lower.includes(r.trigger)) return r.response;
    }
    return aiChatResponses.find(r => r.trigger === 'default').response;
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const resp = getAIResponse(input);
      setMessages(prev => [...prev, { role: 'ai', text: resp, timestamp: new Date() }]);
      setTyping(false);
    }, 1200);
  };

  const quickActions = [
    { label: '📚 What to study?', msg: 'What should I study today?' },
    { label: '📊 My weak areas', msg: 'What are my weak areas?' },
    { label: '🔮 Predict scores', msg: 'Predict my next exam scores' },
    { label: '📋 Study plan', msg: 'Create a study plan for today' },
    { label: '💪 Motivate me', msg: 'Give me some motivation' },
    { label: '📈 How to improve', msg: 'How can I improve my overall score?' },
  ];

  // Predict scores UI
  const [studyHours, setStudyHours] = useState(3);
  const predictedScore = Math.min(98, Math.round(60 + studyHours * 8.5 + Math.random() * 3));

  return (
    <div className="ai-page">
      <div className="page-header">
        <h1>AI Study Assistant</h1>
        <p>Your intelligent study companion powered by AI</p>
      </div>

      <div className="ai-layout">
        {/* Chat Panel */}
        <motion.div className="glass-card chat-panel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="chat-header">
            <StudyBuddy mood="studying" size="small" />
            <div>
              <h3>AI Chat</h3>
              <span className="online-badge">● Online</span>
            </div>
          </div>

          <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`chat-msg ${msg.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="msg-avatar">
                  {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className="msg-content">
                  <div className="msg-text">{msg.text}</div>
                  <div className="msg-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                </div>
              </motion.div>
            ))}
            {typing && (
              <div className="chat-msg ai">
                <div className="msg-avatar"><Bot size={16} /></div>
                <div className="msg-content">
                  <div className="typing-indicator">
                    <span /><span /><span />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="quick-actions">
            {quickActions.map((qa, i) => (
              <button key={i} className="quick-btn" onClick={() => { setInput(qa.msg); }}>
                {qa.label}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Ask me anything about your studies..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button className="send-btn" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </motion.div>

        {/* Right Panel */}
        <div className="ai-right">
          {/* Predictive Score */}
          <motion.div className="glass-card predict-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3><Sparkles size={16} /> Score Predictor</h3>
            <p className="predict-desc">If you study <strong>{studyHours} hrs/day</strong>:</p>
            <div className="predict-slider">
              <input type="range" min="1" max="8" value={studyHours} onChange={e => setStudyHours(Number(e.target.value))} />
              <div className="slider-labels">
                <span>1h</span><span>4h</span><span>8h</span>
              </div>
            </div>
            <div className="predict-result">
              <motion.span
                className="predict-score"
                key={studyHours}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                {predictedScore}%
              </motion.span>
              <span className="predict-label">Expected Score</span>
            </div>
          </motion.div>

          {/* Smart Study Plan */}
          <motion.div className="glass-card plan-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h3><Calendar size={16} /> Today's AI Plan</h3>
            <div className="plan-list">
              {[
                { time: '9:00 AM', task: 'Physics: Thermodynamics', dur: '45 min', priority: 'high' },
                { time: '10:00 AM', task: 'Math: Statistics Revision', dur: '45 min', priority: 'medium' },
                { time: '11:30 AM', task: 'Chemistry: Organic', dur: '45 min', priority: 'medium' },
                { time: '2:00 PM', task: 'CS: Algorithm Practice', dur: '60 min', priority: 'low' },
                { time: '3:30 PM', task: 'English: Essay Writing', dur: '45 min', priority: 'low' },
              ].map((item, i) => (
                <div key={i} className="plan-item">
                  <div className={`plan-priority ${item.priority}`} />
                  <span className="plan-time">{item.time}</span>
                  <div className="plan-task-info">
                    <span className="plan-task">{item.task}</span>
                    <span className="plan-dur">{item.dur}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Revision Planner */}
          <motion.div className="glass-card revision-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <h3><Target size={16} /> Smart Revision</h3>
            <div className="revision-list">
              {grades.current
                .flatMap(s => s.chapters.filter(c => c.mastery < 85).map(c => ({ chapter: c.name, subject: s.subject, mastery: c.mastery })))
                .sort((a, b) => a.mastery - b.mastery)
                .slice(0, 5)
                .map((item, i) => (
                  <div key={i} className="revision-item">
                    <div className="revision-info">
                      <span className="revision-chapter">{item.chapter}</span>
                      <span className="revision-subject">{item.subject}</span>
                    </div>
                    <span className={`revision-mastery ${item.mastery < 70 ? 'low' : 'mid'}`}>{item.mastery}%</span>
                  </div>
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
