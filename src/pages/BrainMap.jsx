import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';
import { grades, subjects } from '../data/mockData';
import './BrainMap.css';

export default function BrainMap() {
  const canvasRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  const nodes = grades.current.map((g, i) => {
    const angle = (i / grades.current.length) * Math.PI * 2 - Math.PI / 2;
    const radius = 200;
    return {
      id: i,
      subject: g.subject,
      score: g.score,
      x: 350 + Math.cos(angle) * radius,
      y: 280 + Math.sin(angle) * radius,
      color: g.score >= 90 ? '#10b981' : g.score >= 80 ? '#6366f1' : g.score >= 70 ? '#f59e0b' : '#ef4444',
      size: 30 + (g.score / 100) * 30,
      chapters: g.chapters,
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 700;
    canvas.height = 560;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const correlation = Math.abs(nodes[i].score - nodes[j].score);
        const opacity = Math.max(0.05, 0.3 - correlation / 100);
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    // Draw center node
    ctx.beginPath();
    ctx.arc(350, 280, 40, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#a5b4fc';
    ctx.font = '12px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText('BRAIN', 350, 276);
    ctx.fillText('MAP', 350, 292);

    // Draw nodes
    nodes.forEach(node => {
      // Glow
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size + 10);
      gradient.addColorStop(0, node.color + '40');
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size + 10, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = node.color + '30';
      ctx.fill();
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = '#f1f5f9';
      ctx.font = 'bold 11px Inter';
      ctx.textAlign = 'center';
      ctx.fillText(node.subject.slice(0, 8), node.x, node.y - 4);
      ctx.fillStyle = node.color;
      ctx.font = 'bold 14px Orbitron';
      ctx.fillText(`${node.score}%`, node.x, node.y + 14);

      // Connection to center
      ctx.beginPath();
      ctx.moveTo(350, 280);
      ctx.lineTo(node.x, node.y);
      ctx.strokeStyle = node.color + '30';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });
  }, []);

  return (
    <div className="brainmap-page">
      <div className="page-header">
        <h1>Digital Brain Map</h1>
        <p>Visual map of your strengths & weaknesses — nodes represent subjects, colors show performance</p>
      </div>

      <div className="brainmap-layout">
        <motion.div className="glass-card brainmap-canvas-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <canvas ref={canvasRef} className="brainmap-canvas" />
        </motion.div>

        <motion.div className="brainmap-sidebar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <div className="glass-card brainmap-legend-card">
            <h3>🧠 Nodes Legend</h3>
            {nodes.map(node => (
              <div key={node.id} className="brain-legend-item">
                <div className="brain-dot" style={{ background: node.color, boxShadow: `0 0 10px ${node.color}50` }} />
                <div className="brain-legend-info">
                  <span className="brain-legend-name">{node.subject}</span>
                  <span className="brain-legend-score" style={{ color: node.color }}>{node.score}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card brain-insight-card">
            <h3>💡 AI Insights</h3>
            <div className="ai-tag success">Strongest: Computer Science (96%)</div>
            <div className="ai-tag danger" style={{ marginTop: 8 }}>Weakest: Physics (78%)</div>
            <div className="ai-tag info" style={{ marginTop: 8 }}>Correlation: Math ↔ CS are linked</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
