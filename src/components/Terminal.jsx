/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import './Terminal.css';

const Terminal = () => {
  const [lines, setLines] = useState([
    { type: 'info', text: 'System initialized. Welcome back, Admin.' },
    { type: 'success', text: 'Connected to AWS eu-central-1.' },
    { type: 'warning', text: 'Pending updates available for Docker daemon.' },
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    const interval = setInterval(() => {
      const messages = [
        { type: 'info', text: 'Heartbeat check: OK' },
        { type: 'info', text: 'Scraping metrics from Prometheus...' },
        { type: 'success', text: 'GET /api/v1/health 200 45ms' },
        { type: 'info', text: 'Auto-scaling group capacity: 1/1' },
        { type: 'success', text: 'Container health: healthy (uptime 14d 6h)' },
        { type: 'info', text: 'SSL cert valid: 89 days remaining' },
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      if (Math.random() > 0.6) {
        setLines(prev => [...prev.slice(-15), randomMsg]);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <span className="terminal-title">TERMINAL OUTPUT</span>
        <div className="terminal-controls">
          <span className="control minimize" />
          <span className="control maximize" />
          <span className="control close" />
        </div>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line ${line.type}`}>
            <span className="timestamp">{new Date().toLocaleTimeString()}</span>
            <span className="content">{line.text}</span>
          </div>
        ))}
        <div className="terminal-input-line">
          <span className="prompt">admin@devops ~$</span>
          <span className="cursor">▋</span>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;
