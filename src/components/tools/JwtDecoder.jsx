import { useState, useMemo } from 'react';
import './ToolStyles.css';

const JwtDecoder = () => {
  const [token, setToken] = useState('');

  const decoded = useMemo(() => {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format (must have 3 parts)');
      }

      const decode = (str) => {
        try {
          const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
          return JSON.parse(decodeURIComponent(escape(atob(base64))));
        } catch (err) {
          return 'Failed to decode part: ' + err.message;
        }
      };

      return {
        header: decode(parts[0]),
        payload: decode(parts[1]),
        signature: parts[2]
      };
    } catch (err) {
      return { error: err.message };
    }
  }, [token]);

  return (
    <div className="tool-card">
      <h3>JWT_DECODER</h3>
      <div className="tool-controls">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Client-side decoding only</span>
      </div>

      <textarea
        className="tool-input area"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Paste JWT here..."
        style={{ minHeight: '80px' }}
      />

      {decoded?.error && <div className="tool-error">{decoded.error}</div>}

      <div className="tool-result" style={{ maxHeight: '250px', overflowY: 'auto' }}>
        {decoded && !decoded.error ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-purple)', fontWeight: 'bold', marginBottom: '4px' }}>HEADER</div>
              <pre style={{ fontSize: '0.75rem', color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '8px', borderRadius: '4px', margin: 0 }}>
                {JSON.stringify(decoded.header, null, 2)}
              </pre>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-cyan)', fontWeight: 'bold', marginBottom: '4px' }}>PAYLOAD</div>
              <pre style={{ fontSize: '0.75rem', color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '8px', borderRadius: '4px', margin: 0 }}>
                {JSON.stringify(decoded.payload, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <span style={{ opacity: 0.4, fontSize: '0.85rem' }}>Decoded JWT will appear here…</span>
        )}
      </div>
    </div>
  );
};

export default JwtDecoder;
