/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import { getCommits } from '../services/github';
import './Terminal.css';

const COMMANDS = {
  help: () => [
    { type: 'info', text: 'Available commands:' },
    { type: 'info', text: '  help       — show this help' },
    { type: 'info', text: '  clear      — clear terminal' },
    { type: 'info', text: '  whoami     — show current user' },
    { type: 'info', text: '  date       — show current date/time' },
    { type: 'info', text: '  uptime     — show fake uptime' },
    { type: 'info', text: '  ls         — list project files' },
    { type: 'info', text: '  pwd        — print working directory' },
    { type: 'info', text: '  echo <msg> — print a message' },
    { type: 'info', text: '  ping       — ping the API' },
  ],
  whoami: () => [{ type: 'success', text: 'admin (devops-playground)' }],
  date: () => [{ type: 'info', text: new Date().toString() }],
  uptime: () => [{ type: 'info', text: `up ${Math.floor(Math.random() * 30 + 1)} days, load avg: 0.${Math.floor(Math.random() * 50 + 10)}` }],
  pwd: () => [{ type: 'info', text: '/home/admin/devops-playground' }],
  ls: () => [{ type: 'info', text: 'src/  Dockerfile  docker-compose.yml  terraform/  .github/  README.md  package.json' }],
  ping: () => [
    { type: 'info', text: 'PING api.github.com ...' },
    { type: 'success', text: `64 bytes from api.github.com: time=${Math.floor(Math.random() * 40 + 10)}ms` },
  ],
};

const Terminal = () => {
  const [lines, setLines] = useState([
    { type: 'info', text: 'Initializing terminal...' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

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
          { type: 'info', text: '─── End of commit log ─── (type "help" for commands)' },
        ]);
      } else {
        setLines([
          { type: 'info', text: 'System initialized. (type "help" for commands)' },
          { type: 'warning', text: 'Could not fetch commits from GitHub API.' },
        ]);
      }
      setLoaded(true);
    }
    loadCommits();
  }, []);

  // Heartbeat
  useEffect(() => {
    if (!loaded) return;
    const interval = setInterval(() => {
      const messages = [
        { type: 'info', text: 'Heartbeat check: OK' },
        { type: 'success', text: 'GET /api/v1/health 200 45ms' },
        { type: 'info', text: 'Container health: healthy' },
        { type: 'info', text: 'SSL cert valid: 89 days remaining' },
      ];
      if (Math.random() > 0.7) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        setLines(prev => [...prev.slice(-30), msg]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [loaded]);

  const addLine = (line) => setLines(prev => [...prev.slice(-50), line]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    // Echo the command
    addLine({ type: 'cmd', text: `admin@devops ~$ ${cmd}` });

    const [name, ...args] = cmd.split(' ');

    if (name === 'clear') {
      setLines([]);
    } else if (name === 'echo') {
      addLine({ type: 'info', text: args.join(' ') || '' });
    } else if (COMMANDS[name]) {
      COMMANDS[name]().forEach(l => addLine(l));
    } else {
      addLine({ type: 'error', text: `command not found: ${name}. Type "help" for available commands.` });
    }

    setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistIdx(-1);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(next);
      setInput(history[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : history[next]);
    }
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
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
            {line.type !== 'cmd' && (
              <span className="timestamp">{new Date().toLocaleTimeString()}</span>
            )}
            <span className="content">{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="terminal-input-row" onSubmit={handleSubmit}>
        <span className="prompt">admin@devops ~$</span>
        <input
          ref={inputRef}
          className="terminal-input-field"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          placeholder="type a command..."
        />
      </form>
    </div>
  );
};

export default Terminal;
