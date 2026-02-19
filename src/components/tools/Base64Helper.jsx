  import { useState, useMemo } from 'react';
import './ToolStyles.css';

const Base64Helper = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);

  // Live processing using useMemo
  const result = useMemo(() => {
    if (!input) return { output: '', error: null };
    try {
      if (mode === 'encode') {
        let res = btoa(unescape(encodeURIComponent(input)));
        if (urlSafe) res = res.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        return { output: res, error: null };
      } else {
        let normalized = input;
        if (urlSafe) {
          normalized = input.replace(/-/g, '+').replace(/_/g, '/');
          while (normalized.length % 4) normalized += '=';
        }
        return { output: decodeURIComponent(escape(atob(normalized))), error: null };
      }
    } catch {
      return { output: '', error: 'Invalid input for ' + (mode === 'encode' ? 'encoding' : 'decoding') };
    }
  }, [input, mode, urlSafe]);

  const { output, error } = result;

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setInput('');
  };

  return (
    <div className="tool-card">
      <h3>BASE64_HELPER</h3>
      <div className="tool-controls" style={{ flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button className={`tool-btn small ${mode === 'encode' ? 'active' : ''}`} onClick={() => switchMode('encode')}>ENCODE</button>
        <button className={`tool-btn small ${mode === 'decode' ? 'active' : ''}`} onClick={() => switchMode('decode')}>DECODE</button>
        <label style={{ marginLeft: 'auto', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <input
            type="checkbox"
            checked={urlSafe}
            onChange={(e) => setUrlSafe(e.target.checked)}
          />
          URL-safe
        </label>
      </div>

      <textarea
        className="tool-input area"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
        style={{ minHeight: '90px' }}
      />

      {error && <div className="tool-error">{error}</div>}

      <div className="tool-result" style={{ position: 'relative' }}>
        <span className="value break-word" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
          {output || <span style={{ opacity: 0.4 }}>Result appears here as you type…</span>}
        </span>
        {output && (
          <button
            className="tool-btn small"
            onClick={copyOutput}
            style={{ alignSelf: 'flex-end', marginTop: '0.5rem' }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Base64Helper;
