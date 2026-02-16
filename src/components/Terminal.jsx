/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { getCommits } from '../services/github';
import './Terminal.css';

const Terminal = () => {
  const [lines, setLines] = useState([
    { type: 'info', text: 'Initializing terminal...' },
  ]);
  const [loaded, setLoaded] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // Load real commits on mount
  useEffect(() => {
    async function loadCommits() {
      const commits = await getCommits(10);
      if (commits && commits.length > 0) {
        const commitLines = commits.map(c => ({
          type: 'success',
          text: `[${c.sha}] ${c.author}: ${c.message}`,
        }));
        setLines([
          { type: 'info', text: 'System initialized. Connected to GitHub API.' },
          { type: 'success', text: 'Fetched latest commits from Art-abg/devops-playground' },
          { type: 'info', text: '─── Recent Commit History ───' },
          ...commitLines,
          { type: 'info', text: '─── End of commit log ───' },
        ]);
      } else {
        setLines([
          { type: 'info', text: 'System initialized.' },
          { type: 'warning', text: 'Could not fetch commits from GitHub API.' },
        ]);
      }
      setLoaded(true);
    }
    loadCommits();
  }, []);

  // Simulate heartbeat after initial load
  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      const messages = [
        { type: 'info', text: 'Heartbeat check: OK' },
        { type: 'success', text: 'GET /api/v1/health 200 45ms' },
        { type: 'info', text: 'Container health: healthy' },
        { type: 'info', text: 'SSL cert valid: 89 days remaining' },
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      if (Math.random() > 0.7) {
        setLines(prev => [...prev.slice(-20), randomMsg]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [loaded]);

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <span className="terminal-title">TERMINAL — LIVE FEED</span>
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
