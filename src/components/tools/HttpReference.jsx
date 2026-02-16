/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ToolStyles.css';

const HTTP_CODES = [
  { code: 100, text: 'Continue', desc: 'Server received request headers, client should proceed.' },
  { code: 200, text: 'OK', desc: 'Standard success response.' },
  { code: 201, text: 'Created', desc: 'Resource created successfully.' },
  { code: 204, text: 'No Content', desc: 'Success, but no response body.' },
  { code: 301, text: 'Moved Permanently', desc: 'Resource permanently moved to new URL.' },
  { code: 302, text: 'Found', desc: 'Temporary redirect to another URL.' },
  { code: 304, text: 'Not Modified', desc: 'Cached version is still valid.' },
  { code: 400, text: 'Bad Request', desc: 'Server could not understand the request.' },
  { code: 401, text: 'Unauthorized', desc: 'Authentication required or failed.' },
  { code: 403, text: 'Forbidden', desc: 'Server refuses to authorize this request.' },
  { code: 404, text: 'Not Found', desc: 'Requested resource does not exist.' },
  { code: 405, text: 'Method Not Allowed', desc: 'HTTP method not allowed for this endpoint.' },
  { code: 408, text: 'Request Timeout', desc: 'Server timed out waiting for the request.' },
  { code: 409, text: 'Conflict', desc: 'Request conflicts with current state of resource.' },
  { code: 413, text: 'Payload Too Large', desc: 'Request payload exceeds server limit.' },
  { code: 429, text: 'Too Many Requests', desc: 'Rate limit exceeded.' },
  { code: 500, text: 'Internal Server Error', desc: 'Generic server error.' },
  { code: 502, text: 'Bad Gateway', desc: 'Invalid response from upstream server.' },
  { code: 503, text: 'Service Unavailable', desc: 'Server temporarily unavailable.' },
  { code: 504, text: 'Gateway Timeout', desc: 'Upstream server did not respond in time.' },
];

const getCodeColor = (code) => {
  if (code < 200) return 'var(--text-secondary)';
  if (code < 300) return 'var(--accent-green)';
  if (code < 400) return 'var(--accent-cyan)';
  if (code < 500) return 'var(--accent-amber)';
  return 'var(--accent-red)';
};

const HttpReference = () => {
  const [search, setSearch] = useState('');

  const filtered = HTTP_CODES.filter(
    (c) =>
      c.code.toString().includes(search) ||
      c.text.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="tool-card">
      <h3>HTTP_REFERENCE</h3>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search codes... (e.g. 404, timeout)"
        className="tool-input"
      />
      <div className="tool-result" style={{ maxHeight: '280px', overflow: 'auto' }}>
        {filtered.map((c) => (
          <div key={c.code} className="result-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.15rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ 
                color: getCodeColor(c.code), 
                fontFamily: 'var(--font-mono)', 
                fontWeight: 700,
                fontSize: '0.9rem'
              }}>
                {c.code}
              </span>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.text}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{c.desc}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem', fontSize: '0.85rem' }}>
            No matching status codes.
          </div>
        )}
      </div>
    </div>
  );
};

export default HttpReference;
