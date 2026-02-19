import { useState, useCallback } from 'react';
import './ToolStyles.css';

const UuidGenerator = () => {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateUuids = useCallback(() => {
    const newUuids = [];
    const limit = Math.min(Math.max(count, 1), 50); // Limit to 50
    for (let i = 0; i < limit; i++) {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        newUuids.push(crypto.randomUUID());
      } else {
        // Fallback for older browsers
        newUuids.push('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        }));
      }
    }
    setUuids(newUuids);
  }, [count]);

  const copyAll = () => {
    if (uuids.length === 0) return;
    navigator.clipboard.writeText(uuids.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="tool-card">
      <h3>UUID_GENERATOR</h3>
      <div className="tool-controls">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Count:</span>
          <input 
            type="number" 
            min="1" 
            max="50" 
            value={count} 
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            style={{ 
              width: '60px', 
              background: 'var(--bg-primary)', 
              border: '1px solid var(--border-default)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px 6px'
            }}
          />
        </div>
        <button className="tool-btn small active" onClick={generateUuids}>GENERATE</button>
      </div>

      <div className="tool-result" style={{ minHeight: '120px', maxHeight: '200px', overflowY: 'auto' }}>
        {uuids.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {uuids.map((uuid, idx) => (
              <span key={idx} className="value mono" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)' }}>
                {uuid}
              </span>
            ))}
          </div>
        ) : (
          <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>Click generate to create unique IDs…</span>
        )}
      </div>

      {uuids.length > 0 && (
        <button
          className="tool-btn small"
          onClick={copyAll}
          style={{ marginTop: '0.8rem', width: '100%' }}
        >
          {copied ? '✓ Copied All' : 'Copy All'}
        </button>
      )}
    </div>
  );
};

export default UuidGenerator;
