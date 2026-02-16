/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ToolStyles.css';

// Simple JSON <-> YAML simulation since we want to avoid heavy deps like js-yaml for now
// In a real app, we'd use 'js-yaml' package.
const JsonYamlConverter = () => {
  const [input, setInput] = useState('{"key": "value"}');
  const [output, setOutput] = useState('key: value');
  const [mode, setMode] = useState('json2yaml'); // or yaml2json
  const [error, setError] = useState(null);

  const convert = () => {
    setError(null);
    try {
      if (mode === 'json2yaml') {
        const obj = JSON.parse(input);
        // Simple YAML dump simulation for demo
        const yaml = Object.entries(obj).map(([k, v]) => `${k}: ${v}`).join('\n');
        setOutput(yaml);
      } else {
        // Simple YAML parse simulation
        const obj = {};
        input.split('\n').forEach(line => {
          const [k, v] = line.split(':');
          if (k && v) obj[k.trim()] = v.trim();
        });
        setOutput(JSON.stringify(obj, null, 2));
      }
    } catch (err) {
      setError('Invalid format: ' + err.message);
    }
  };

  return (
    <div className="tool-card">
      <h3>JSON_YAML_CONVERTER</h3>
      <div className="tool-controls">
        <button className={`tool-btn small ${mode === 'json2yaml' ? 'active' : ''}`} onClick={() => setMode('json2yaml')}>JSON &gt; YAML</button>
        <button className={`tool-btn small ${mode === 'yaml2json' ? 'active' : ''}`} onClick={() => setMode('yaml2json')}>YAML &gt; JSON</button>
      </div>
      
      <div className="converter-grid">
        <textarea 
          className="tool-input area" 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'json2yaml' ? 'Paste JSON here...' : 'Paste YAML here...'}
        />
        <div className="arrow">➔</div>
        <textarea 
          className="tool-input area" 
          value={output} 
          readOnly 
          placeholder="Result..."
        />
      </div>
      
      <button className="tool-btn" onClick={convert}>CONVERT & VALIDATE</button>
      {error && <div className="tool-error">{error}</div>}
    </div>
  );
};

export default JsonYamlConverter;
