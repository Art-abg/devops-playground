/* eslint-disable react/prop-types */
import './PipelineVisualizer.css';

const PipelineVisualizer = ({ runs = [], loading }) => {
  if (loading) {
    return (
      <div className="pipeline-container">
        <h3>CICD PIPELINE</h3>
        <div className="pipeline-loading">Loading workflow data...</div>
      </div>
    );
  }

  if (runs.length === 0) {
    return (
      <div className="pipeline-container">
        <h3>CICD PIPELINE</h3>
        <div className="pipeline-loading">No workflow runs found.</div>
      </div>
    );
  }

  const getStatusClass = (run) => {
    if (run.status === 'in_progress') return 'processing';
    if (run.conclusion === 'success') return 'success';
    if (run.conclusion === 'failure') return 'failure';
    return 'pending';
  };

  const getStatusLabel = (run) => {
    if (run.status === 'in_progress') return 'Running...';
    if (run.conclusion === 'success') return 'Success';
    if (run.conclusion === 'failure') return 'Failed';
    if (run.status === 'queued') return 'Queued';
    return run.conclusion || run.status;
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
  };

  return (
    <div className="pipeline-container">
      <h3>CICD PIPELINE — RECENT RUNS</h3>
      <div className="pipeline-runs">
        {runs.slice(0, 6).map((run) => (
          <a
            key={run.id}
            className={`pipeline-run ${getStatusClass(run)}`}
            href={run.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="run-header">
              <span className={`run-indicator ${getStatusClass(run)}`} />
              <span className="run-number">#{run.runNumber}</span>
              <span className="run-time">{timeAgo(run.createdAt)}</span>
            </div>
            <div className="run-name">{run.name}</div>
            <div className="run-commit">
              <span className="commit-sha">{run.commitSha}</span>
              <span className="commit-msg">{run.commitMsg.slice(0, 40)}</span>
            </div>
            <div className={`run-status ${getStatusClass(run)}`}>
              {getStatusLabel(run)}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
