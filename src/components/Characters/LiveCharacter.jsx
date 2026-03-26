import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LiveCharacter.css';

const tips = [
  "💡 Remember to take breaks every 45 min!",
  "📚 Focus on your weakest subject first!",
  "🎯 You're doing great, keep going!",
  "⏰ Best study time: 9-11 AM!",
  "🧠 Active recall > passive reading!",
  "🔥 Don't break your streak!",
  "💪 Small progress is still progress!",
  "🌟 Consistency beats intensity!",
  "📊 Check your analytics for insights!",
  "🏆 You're closer to your goals today!",
];

const faces = {
  idle: { eyes: '◕ ◕', mouth: '◡' },
  wave: { eyes: '◕ ◕', mouth: '∀' },
  think: { eyes: '◔ ◔', mouth: '~' },
  happy: { eyes: '★ ★', mouth: '◡' },
  sleep: { eyes: '– –', mouth: 'z' },
};

export default function LiveCharacter() {
  const [mood, setMood] = useState('idle');
  const [showTip, setShowTip] = useState(false);
  const [tipText, setTipText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Show a tip every 30 seconds
    const tipInterval = setInterval(() => {
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setTipText(randomTip);
      setMood('wave');
      setShowTip(true);
      setTimeout(() => {
        setShowTip(false);
        setMood('idle');
      }, 6000);
    }, 30000);

    // Initial tip after 3 seconds
    const initialTimer = setTimeout(() => {
      setTipText("👋 Hi! I'm your study buddy! Click me for tips!");
      setMood('wave');
      setShowTip(true);
      setTimeout(() => { setShowTip(false); setMood('idle'); }, 5000);
    }, 3000);

    return () => {
      clearInterval(tipInterval);
      clearTimeout(initialTimer);
    };
  }, []);

  const handleClick = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTipText(randomTip);
    setMood('happy');
    setShowTip(true);
    setTimeout(() => { setShowTip(false); setMood('idle'); }, 5000);
  };

  const face = faces[mood];

  if (isMinimized) {
    return (
      <motion.div
        className="char-minimized"
        onClick={() => setIsMinimized(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        🤖
      </motion.div>
    );
  }

  return (
    <div className="live-character">
      <AnimatePresence>
        {showTip && (
          <motion.div
            className="char-bubble"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
          >
            {tipText}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="char-body"
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }}
      >
        {/* Glow ring */}
        <div className="char-glow" />
        
        {/* Antenna */}
        <motion.div
          className="char-antenna"
          animate={{ rotate: mood === 'wave' ? [0, 15, -15, 0] : 0 }}
          transition={{ duration: 0.6, repeat: mood === 'wave' ? 3 : 0 }}
        >
          <div className="antenna-stem" />
          <motion.div
            className="antenna-orb"
            animate={{
              boxShadow: [
                '0 0 5px var(--accent-primary)',
                '0 0 15px var(--accent-primary)',
                '0 0 5px var(--accent-primary)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* Head */}
        <div className="char-head">
          <motion.div
            className="char-eyes"
            animate={mood === 'wave' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5, repeat: mood === 'wave' ? 2 : 0 }}
          >
            {face.eyes}
          </motion.div>
          <div className="char-mouth">{face.mouth}</div>

          {/* Blush */}
          {(mood === 'happy' || mood === 'wave') && (
            <>
              <div className="char-blush left" />
              <div className="char-blush right" />
            </>
          )}
        </div>

        {/* Arms */}
        <motion.div
          className="char-arm-l"
          animate={mood === 'wave' ? { rotate: [0, -30, 0, -30, 0] } : { rotate: 0 }}
          transition={{ duration: 1.2 }}
        >
          ✋
        </motion.div>
        <motion.div
          className="char-arm-r"
          animate={mood === 'wave' ? { rotate: [0, 30, 0, 30, 0] } : { rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          ✋
        </motion.div>
      </motion.div>

      <button className="char-minimize" onClick={() => setIsMinimized(true)}>×</button>
    </div>
  );
}
