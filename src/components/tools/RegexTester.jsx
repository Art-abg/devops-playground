import { useState } from 'react';
import './ToolStyles.css';

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
