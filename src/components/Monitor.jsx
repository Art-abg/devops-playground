/* eslint-disable react/prop-types */
import './Monitor.css';

const Monitor = ({ commits = [], runs = [], repoInfo }) => {
  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
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
        <h2>Live Monitor</h2>
        <p>Real-time GitHub activity and deployment history</p>
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
            {runs.map((run) => (
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
                  <span className="deploy-time">{timeAgo(run.createdAt)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
