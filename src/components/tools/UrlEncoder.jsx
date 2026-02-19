import { useState, useMemo } from 'react';
import { showToast } from '../Toast';
import './ToolStyles.css';

const UrlEncoder = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState('encode');

  const result = useMemo(() => {
    if (!input) return { output: '', error: null };
    try {
      if (mode === 'encode') {
        return { output: encodeURIComponent(input), error: null };
      } else {
        return { output: decodeURIComponent(input), error: null };
      }
    } catch (e) {
      return { output: '', error: 'Failed to ' + mode + ': ' + e.message };
    }
  }, [input, mode]);

  const { output, error } = result;

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      showToast('Copied to clipboard!', 'success');
    });
  };

  const clearInput = () => {
    setInput('');
    showToast('Input cleared', 'info');
  };

  return (
    <div className="tool-card">
      <h3>URL_ENCODE_DECODE</h3>
      <div className="tool-controls" style={{ flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button className={`tool-btn small ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')}>ENCODE</button>
        <button className={`tool-btn small ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')}>DECODE</button>
        <button className="tool-btn small danger" onClick={clearInput} style={{ marginLeft: 'auto' }}>Clear</button>
      </div>

      <textarea
        className="tool-input area"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL encoded text to decode...'}
        style={{ minHeight: '90px' }}
      />

      {error && <div className="tool-error">{error}</div>}

      <div className="tool-result">
        <span className="value break-word" style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
          {output || <span style={{ opacity: 0.4 }}>Result appears here…</span>}
        </span>
        {output && (
          <button
            className="tool-btn small"
            onClick={copyOutput}
            style={{ alignSelf: 'flex-end', marginTop: '0.5rem' }}
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
};

export default UrlEncoder;
