import { useState, useCallback } from 'react';
import * as yaml from 'js-yaml';
import './ToolStyles.css';

const JsonYamlConverter = () => {
  const [input, setInput] = useState('{\n  "name": "devops-playground",\n  "version": "1.0.0",\n  "tags": ["docker", "ci", "react"]\n}');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('json2yaml');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const convert = useCallback(() => {
    setError(null);
    try {
      if (mode === 'json2yaml') {
        const obj = JSON.parse(input);
        const result = yaml.dump(obj, { indent: 2, lineWidth: -1 });
        setOutput(result);
      } else {
        const obj = yaml.load(input);
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch (err) {
      setError('Parse error: ' + err.message);
      setOutput('');
    }
  }, [input, mode]);

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setOutput('');
    setError(null);
  };

  return (
    <div className="tool-card">
      <h3>JSON_YAML_CONVERTER</h3>
      <div className="tool-controls" style={{ flexDirection: 'row', gap: '0.5rem' }}>
        <button
          className={`tool-btn small ${mode === 'json2yaml' ? 'active' : ''}`}
          onClick={() => switchMode('json2yaml')}
        >
          JSON → YAML
        </button>
        <button
          className={`tool-btn small ${mode === 'yaml2json' ? 'active' : ''}`}
          onClick={() => switchMode('yaml2json')}
        >
          YAML → JSON
        </button>
      </div>

      <div className="converter-grid">
        <textarea
          className="tool-input area"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'json2yaml' ? 'Paste JSON here...' : 'Paste YAML here...'}
          style={{ minHeight: '140px' }}
        />
        <div className="arrow">➔</div>
        <div style={{ position: 'relative', flex: 1 }}>
          <textarea
            className="tool-input area"
            value={output}
            readOnly
            placeholder="Result appears here..."
            style={{ minHeight: '140px', width: '100%', boxSizing: 'border-box' }}
          />
          {output && (
            <button
              className="tool-btn small copy-btn"
              onClick={copyOutput}
              style={{ position: 'absolute', top: '0.4rem', right: '0.4rem' }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      <button className="tool-btn" onClick={convert}>CONVERT &amp; VALIDATE</button>
      {error && <div className="tool-error">{error}</div>}
    </div>
  );
};

export default JsonYamlConverter;
