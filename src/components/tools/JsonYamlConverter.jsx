import { useState, useCallback } from 'react';
import * as yaml from 'js-yaml';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { showToast } from '../Toast';
import './ToolStyles.css';

const JsonYamlConverter = () => {
  const [input, setInput] = useLocalStorage('json-yaml-input', '{\n  "name": "devops-playground",\n  "version": "1.0.0",\n  "tags": ["docker", "ci", "react"]\n}');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useLocalStorage('json-yaml-mode', 'json2yaml');
  const [error, setError] = useState(null);

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
      showToast('Copied to clipboard!', 'success');
    });
  };

  const downloadOutput = () => {
    if (!output) return;
    const ext = mode === 'json2yaml' ? 'yaml' : 'json';
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded converted.${ext}`, 'success');
  };

  const clearInput = () => {
    setInput('');
    setOutput('');
    showToast('Input cleared', 'info');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setOutput('');
    setError(null);
  };

  return (
    <div className="tool-card">
      <h3>JSON_YAML_CONVERTER</h3>
      <div className="tool-controls" style={{ flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
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
        <button className="tool-btn small danger" onClick={clearInput} style={{ marginLeft: 'auto' }}>Clear</button>
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
            <div style={{ position: 'absolute', top: '0.4rem', right: '0.4rem', display: 'flex', gap: '0.4rem' }}>
              <button
                className="tool-btn small copy-btn"
                onClick={copyOutput}
              >
                Copy
              </button>
              <button
                className="tool-btn small copy-btn"
                onClick={downloadOutput}
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>

      <button className="tool-btn" onClick={convert}>CONVERT &amp; VALIDATE</button>
      {error && <div className="tool-error">{error}</div>}
    </div>
  );
};

export default JsonYamlConverter;
