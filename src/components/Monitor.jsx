import { useState, useEffect } from 'react';
import './Monitor.css';

const Monitor = ({ commits = [], runs = [], repoInfo }) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (dateStr) => {
    const diff = now - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  const runDuration = (run) => {
    if (!run.createdAt || !run.updatedAt) return null;
    const secs = Math.round((new Date(run.updatedAt) - new Date(run.createdAt)) / 1000);
    if (secs < 60) return `${secs}s`;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const getStatusClass = (run) => {
    if (run.status === 'in_progress') return 'processing';
    if (run.conclusion === 'success') return 'success';
    if (run.conclusion === 'failure') return 'failure';
    return 'pending';
  };

  return (
    <div className="monitor-page">
      <div className="monitor-header">
        <div>
          <h2>Live Monitor</h2>
          <p>Real-time GitHub activity and deployment history</p>
        </div>
        {repoInfo && (
          <a
            href={`https://github.com/Art-abg/devops-playground`}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View on GitHub
          </a>
        )}
      </div>

      <div className="monitor-grid">
        {/* Stats cards */}
        <div className="monitor-stats">
          <div className="stat-card">
            <div className="stat-value">{repoInfo?.stars ?? '—'}</div>
            <div className="stat-label">Stars</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{repoInfo?.forks ?? '—'}</div>
            <div className="stat-label">Forks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{repoInfo?.watchers ?? '—'}</div>
            <div className="stat-label">Watchers</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{repoInfo?.openIssues ?? '—'}</div>
            <div className="stat-label">Issues</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{commits.length}</div>
            <div className="stat-label">Recent Commits</div>
          </div>
        </div>

        {/* Commit Feed */}
        <div className="monitor-section">
          <h3>Commit History</h3>
          <div className="commit-feed">
            {commits.length === 0 && (
              <div className="empty-state">Loading commits...</div>
            )}
            {commits.map((c) => (
              <a
                key={c.sha}
                className="commit-row"
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="commit-left">
                  <span className="commit-sha">{c.sha}</span>
                  <span className="commit-message">{c.message}</span>
                </div>
                <div className="commit-right">
                  <span className="commit-author">{c.author}</span>
                  <span className="commit-time">{timeAgo(c.date)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Deployment Timeline */}
        <div className="monitor-section">
          <h3>Deployment Timeline</h3>
          <div className="deploy-timeline">
            {runs.length === 0 && (
              <div className="empty-state">Loading deployments...</div>
            )}
            {runs.map((run) => {
              const duration = runDuration(run);
              return (
                <a
                  key={run.id}
                  className="deploy-item"
                  href={run.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={`deploy-dot ${getStatusClass(run)}`} />
                  <div className="deploy-info">
                    <div className="deploy-title">
                      {run.name} <span className="deploy-number">#{run.runNumber}</span>
                    </div>
                    <div className="deploy-detail">
                      {run.commitSha} — {run.commitMsg.slice(0, 50)}
                    </div>
                  </div>
                  <div className="deploy-meta">
                    <span className={`deploy-status ${getStatusClass(run)}`}>
                      {run.conclusion || run.status}
                    </span>
                    {duration && (
                      <span className="deploy-duration" title="Run duration">⏱ {duration}</span>
                    )}
                    <span className="deploy-time">{timeAgo(run.createdAt)}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
