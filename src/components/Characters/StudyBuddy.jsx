import './StudyBuddy.css';

const expressions = {
  happy: { eyes: '◕ ◕', mouth: '◡', color: '#10b981' },
  studying: { eyes: '◉ ◉', mouth: '—', color: '#6366f1' },
  warning: { eyes: '◑ ◑', mouth: '△', color: '#f59e0b' },
  celebrating: { eyes: '★ ★', mouth: '◡', color: '#a855f7' },
  thinking: { eyes: '◔ ◔', mouth: '~', color: '#06b6d4' },
  sleeping: { eyes: '– –', mouth: 'z', color: '#64748b' },
};

export default function StudyBuddy({ mood = 'happy', message = '', size = 'medium' }) {
  const expr = expressions[mood] || expressions.happy;

  return (
    <div className={`study-buddy ${size}`}>
      <div className="buddy-body" style={{ '--buddy-color': expr.color }}>
        {/* Antenna */}
        <div className="buddy-antenna">
          <div className="antenna-ball" />
        </div>
        
        {/* Head */}
        <div className="buddy-head">
          <div className="buddy-eyes">{expr.eyes}</div>
          <div className="buddy-mouth">{expr.mouth}</div>
        </div>
        
        {/* Arms */}
        <div className="buddy-arm left">✋</div>
        <div className="buddy-arm right">✋</div>
      </div>
      
      {message && (
        <div className="buddy-speech">
          <div className="speech-bubble">{message}</div>
        </div>
      )}
    </div>
  );
}
