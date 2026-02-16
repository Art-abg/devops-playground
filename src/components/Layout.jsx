/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Layout.css';
import Terminal from './Terminal';

const Layout = ({ children, activeTab, onTabChange }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  return (
    <div className="layout">
      {/* Ambient background glow */}
      <div className="ambient-glow" />

      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">DevOps</span>
            <span className="logo-accent">Playground</span>
          </div>
        </div>

        <nav className="nav">
          <button
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            Dashboard
          </button>
          <button
            className={`nav-btn ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => onTabChange('tools')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
            Toolkit
          </button>
        </nav>

        <div className="header-right">
          <button
            className={`terminal-toggle ${terminalOpen ? 'active' : ''}`}
            onClick={() => setTerminalOpen(!terminalOpen)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
            Terminal
          </button>
          <div className="user-badge">
            <span className="status-dot" />
            <span>admin</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      {/* Collapsible terminal */}
      <div className={`terminal-drawer ${terminalOpen ? 'open' : ''}`}>
        <Terminal />
      </div>
    </div>
  );
};

export default Layout;
