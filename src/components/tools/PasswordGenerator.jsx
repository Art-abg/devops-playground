import { useState } from 'react';
import './ToolStyles.css';

const PasswordGenerator = () => {
  const [length, setLength] = useState(24);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('password'); // 'password' or 'passphrase'
  const [wordCount, setWordCount] = useState(4);
  const [separator, setSeparator] = useState('-');
  const generate = () => {
    if (mode === 'passphrase') {
      const words = [
        "apple", "brave", "crane", "drift", "eagle", "flint", "globe", "hover", "index", "joker",
        "karma", "lemon", "mango", "noble", "oasis", "pearl", "query", "raven", "scale", "train",
        "ultra", "vivid", "whale", "xenon", "yacht", "zebra", "amber", "brush", "cider", "delta",
        "earth", "flame", "grape", "heart", "ivory", "juice", "koala", "lunar", "magic", "ninja",
        "ocean", "panda", "quark", "radar", "solar", "tiger", "umbra", "venom", "water", "x-ray",
        "yield", "zonal", "alpha", "beta", "gamma", "cliff", "dune", "echo", "frost", "ghost",
        "hxagon", "igloo", "jazz", "kite", "laser", "maze", "nova", "orbit", "pixel", "quest",
        "robot", "storm", "turbo", "unity", "vault", "wire", "yeti", "zen", "acorn", "breeze",
        "cloud", "daisy", "ember", "fern", "grove", "hazel", "iris", "jade", "kiwi", "lotus"
      ];
      
      const array = new Uint32Array(wordCount);
      crypto.getRandomValues(array);
      const chosen = Array.from(array, (n) => words[n % words.length]);
      setPassword(chosen.join(separator));
      return;
    }

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
    if (mode === 'passphrase') {
      // rough entropy: list is 90 words. ~6.5 bits per word.
      const entropy = wordCount * Math.log2(90);
      if (entropy >= 80) return { label: 'Very Strong', color: 'var(--accent-green)', pct: 100 };
      if (entropy >= 50) return { label: 'Strong', color: 'var(--accent-cyan)', pct: 75 };
      if (entropy >= 30) return { label: 'Medium', color: 'var(--accent-amber)', pct: 50 };
      return { label: 'Weak', color: 'var(--accent-red)', pct: 25 };
    }

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
      <div className="tool-controls" style={{ marginBottom: '1rem' }}>
        <button 
          className={`tool-btn small ${mode === 'password' ? 'active' : ''}`}
          onClick={() => setMode('password')}
        >
          Password
        </button>
        <button 
          className={`tool-btn small ${mode === 'passphrase' ? 'active' : ''}`}
          onClick={() => setMode('passphrase')}
        >
          Passphrase
        </button>
      </div>

      {mode === 'password' ? (
        <>
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
        </>
      ) : (
        <>
          <div className="tool-input-group">
            <label>Word Count: {wordCount}</label>
            <input
              type="range"
              min="3"
              max="12"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              style={{ accentColor: 'var(--accent-cyan)', width: '100%' }}
            />
          </div>
          <div className="tool-input-group">
            <label>Separator:</label>
            <select 
              className="tool-input" 
              value={separator} 
              onChange={(e) => setSeparator(e.target.value)}
            >
              <option value="-">Hyphen (-)</option>
              <option value="_">Underscore (_)</option>
              <option value=".">Period (.)</option>
              <option value=" ">Space ( )</option>
              <option value="">None</option>
            </select>
          </div>
        </>
      )}

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
