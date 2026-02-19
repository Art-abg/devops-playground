import { useState } from 'react';
import './ToolStyles.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(24);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (charset.length === 0) {
      setPassword('Select at least one character type');
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    const result = Array.from(array, (n) => charset[n % charset.length]).join('');
    setPassword(result);
  };

  const getStrength = () => {
    // types variable removed as it was unused
    const charsetSize = (includeUpper ? 26 : 0) + (includeLower ? 26 : 0) + (includeNumbers ? 10 : 0) + (includeSymbols ? 26 : 0);
    const entropy = Math.log2(Math.pow(charsetSize || 1, length));

    if (entropy >= 100) return { label: 'Very Strong', color: 'var(--accent-green)', pct: 100 };
    if (entropy >= 60) return { label: 'Strong', color: 'var(--accent-cyan)', pct: 75 };
    if (entropy >= 40) return { label: 'Medium', color: 'var(--accent-amber)', pct: 50 };
    return { label: 'Weak', color: 'var(--accent-red)', pct: 25 };
  };

  const strength = getStrength();

  const copyToClipboard = () => {
    if (password) navigator.clipboard.writeText(password);
  };

  return (
    <div className="tool-card">
      <h3>PASSWORD_GEN</h3>
      <div className="tool-input-group">
        <label>Length: {length}</label>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          style={{ accentColor: 'var(--accent-cyan)', width: '100%' }}
        />
      </div>
      <div className="tool-controls">
        <label>
          <input 
            type="checkbox" 
            checked={includeUpper} 
            onChange={(e) => setIncludeUpper(e.target.checked)} 
          />
          Uppercase (A-Z)
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeLower} 
            onChange={(e) => setIncludeLower(e.target.checked)} 
          />
          Lowercase (a-z)
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeNumbers} 
            onChange={(e) => setIncludeNumbers(e.target.checked)} 
          />
          Numbers (0-9)
        </label>
        <label>
          <input 
            type="checkbox" 
            checked={includeSymbols} 
            onChange={(e) => setIncludeSymbols(e.target.checked)} 
          />
          Symbols (!@#$...)
        </label>
      </div>

      {/* Strength meter */}
      <div style={{ marginTop: '0.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Strength:</span>
          <span style={{ color: strength.color, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{strength.label}</span>
        </div>
        <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${strength.pct}%`, height: '100%', background: strength.color, borderRadius: '2px', transition: 'width 0.3s ease, background 0.3s ease' }} />
        </div>
      </div>

      <button className="tool-btn" onClick={generate}>GENERATE</button>

      {password && (
        <div className="tool-result">
          <div className="code-block break-word" style={{ fontSize: '0.85rem' }}>{password}</div>
          <button className="tool-btn small copy-btn" onClick={copyToClipboard}>COPY</button>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
