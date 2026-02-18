/* eslint-disable react/prop-types */
import { useState, useMemo } from 'react';
import './ToolStyles.css';

/**
 * Computes a simple line-by-line diff between two texts.
 * Returns an array of { type: 'equal'|'removed'|'added', line: string } objects.
 */
function computeDiff(left, right) {
  const leftLines = left.split('\n');
  const rightLines = right.split('\n');

  // Build LCS table
  const m = leftLines.length;
  const n = rightLines.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (leftLines[i - 1] === rightLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to build diff
  const diff = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && leftLines[i - 1] === rightLines[j - 1]) {
      diff.unshift({ type: 'equal', line: leftLines[i - 1] });
      i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: 'added', line: rightLines[j - 1] });
      j--;
    } else {
      diff.unshift({ type: 'removed', line: leftLines[i - 1] });
      i--;
    }
  }
  return diff;
}

const DiffChecker = () => {
  const [left, setLeft] = useState('');
  const [right, setRight] = useState('');
  const [showDiff, setShowDiff] = useState(false);

  const diff = useMemo(() => {
    if (!showDiff) return [];
    return computeDiff(left, right);
  }, [left, right, showDiff]);

  const stats = useMemo(() => {
    const added = diff.filter(d => d.type === 'added').length;
    const removed = diff.filter(d => d.type === 'removed').length;
    return { added, removed };
  }, [diff]);

  return (
    <div className="tool-card">
      <h3>DIFF_CHECKER</h3>
      <div className="converter-grid">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Original</span>
          <textarea
            className="tool-input area"
            value={left}
            onChange={(e) => { setLeft(e.target.value); setShowDiff(false); }}
            placeholder="Paste original text..."
            style={{ minHeight: '120px' }}
          />
        </div>
        <div className="arrow">⇄</div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Modified</span>
          <textarea
            className="tool-input area"
            value={right}
            onChange={(e) => { setRight(e.target.value); setShowDiff(false); }}
            placeholder="Paste modified text..."
            style={{ minHeight: '120px' }}
          />
        </div>
      </div>

      <button className="tool-btn" onClick={() => setShowDiff(true)}>COMPARE</button>

      {showDiff && diff.length > 0 && (
        <div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.78rem' }}>
            <span style={{ color: '#4ade80' }}>+{stats.added} added</span>
            <span style={{ color: '#f87171' }}>−{stats.removed} removed</span>
          </div>
          <div className="code-block" style={{ maxHeight: '220px', overflowY: 'auto', padding: '0.6rem' }}>
            {diff.map((entry, idx) => (
              <div
                key={idx}
                style={{
                  background:
                    entry.type === 'added' ? 'rgba(74,222,128,0.1)' :
                    entry.type === 'removed' ? 'rgba(248,113,113,0.1)' :
                    'transparent',
                  color:
                    entry.type === 'added' ? '#4ade80' :
                    entry.type === 'removed' ? '#f87171' :
                    'var(--text-secondary)',
                  padding: '0 0.25rem',
                  borderLeft: `2px solid ${
                    entry.type === 'added' ? '#4ade80' :
                    entry.type === 'removed' ? '#f87171' :
                    'transparent'
                  }`,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {entry.type === 'added' ? '+ ' : entry.type === 'removed' ? '− ' : '  '}
                {entry.line}
              </div>
            ))}
          </div>
        </div>
      )}

      {showDiff && diff.length === 0 && (
        <div className="tool-result">
          <span className="value" style={{ color: '#4ade80' }}>✓ Files are identical</span>
        </div>
      )}
    </div>
  );
};

export default DiffChecker;
