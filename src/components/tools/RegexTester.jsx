import { useState } from 'react';
import './ToolStyles.css';

const COMMON_PATTERNS = [
  { label: 'Custom', pattern: '', flags: 'g' },
  { label: 'Email Address', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { label: 'IPv4 Address', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'g' },
  { label: 'UUID v4', pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}', flags: 'g' },
  { label: 'MAC Address', pattern: '^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$', flags: 'g' }
];

const RegexTester = () => {
  const [pattern, setPattern] = useState('\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b');
  const [flags, setFlags] = useState('g');
  const [testStr, setTestStr] = useState('Server 192.168.1.1 connected.\nClient 10.0.0.42 timeout.\nInvalid host 999.999.999.999');
  const [result, setResult] = useState(null);

  const runTest = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [...testStr.matchAll(regex)];
      setResult({
        matches: matches.map(m => ({
          value: m[0],
          index: m.index,
          groups: m.groups || null,
        })),
        count: matches.length,
      });
    } catch (err) {
      setResult({ error: err.message });
    }
  };

  const highlightMatches = () => {
    if (!result || result.error || result.count === 0) return testStr;
    try {
      const regex = new RegExp(pattern, flags);
      return testStr.replace(regex, '【$&】');
    } catch {
      return testStr;
    }
  };

  return (
    <div className="tool-card">
      <h3>REGEX_TESTER</h3>
      
      <div className="tool-input-group">
        <label>Common Patterns:</label>
        <select 
          className="tool-input"
          onChange={(e) => {
            const selected = COMMON_PATTERNS.find(p => p.label === e.target.value);
            if (selected && selected.label !== 'Custom') {
              setPattern(selected.pattern);
              setFlags(selected.flags);
            }
          }}
          defaultValue="Custom"
        >
          {COMMON_PATTERNS.map(p => (
            <option key={p.label} value={p.label}>{p.label}</option>
          ))}
        </select>
      </div>

      <div className="tool-input-group">
        <label>Pattern:</label>
        <div className="input-row">
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Regular expression"
            className="tool-input"
          />
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="flags"
            className="tool-input short"
          />
        </div>
      </div>
      <div className="tool-input-group">
        <label>Test String:</label>
        <textarea
          className="tool-input area"
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="Text to test against"
        />
      </div>
      <button className="tool-btn" onClick={runTest}>TEST</button>

      {result && !result.error && (
        <div className="tool-result">
          <div className="result-item">
            <span>Matches:</span>
            <span className="value">{result.count}</span>
          </div>
          {result.matches.map((m, i) => (
            <div key={i} className="result-item">
              <span>Match {i + 1}:</span>
              <span className="value">{m.value}</span>
            </div>
          ))}
          <div className="code-block" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
            {highlightMatches()}
          </div>
        </div>
      )}
      {result?.error && <div className="tool-error">{result.error}</div>}
    </div>
  );
};

export default RegexTester;
