import { useState } from 'react';
import './ToolStyles.css';

/**
 * Env Var Encoder — converts between .env format and Docker/K8s secret formats.
 * Modes:
 *   env2b64  — encode each value in a .env file to Base64 (for K8s Secrets)
 *   b642env  — decode Base64 values back to plain .env
 *   env2docker — format as Docker --env-file or docker-compose env_file block
 */

const parseEnv = (text) => {
  const entries = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const val = line.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (key) entries.push({ key, val });
  }
  return entries;
};

const EnvVarEncoder = () => {
  const [input, setInput] = useState('DATABASE_URL=postgres://user:pass@localhost/db\nAPI_KEY=super-secret-key-123\nPORT=3000');
  const [mode, setMode] = useState('env2b64');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError(null);
    try {
      const entries = parseEnv(input);
      if (entries.length === 0) throw new Error('No valid KEY=VALUE pairs found');

      let result = '';

      if (mode === 'env2b64') {
        // K8s Secret data block
        result = '# Kubernetes Secret data block (Base64-encoded values)\n';
        result += 'data:\n';
        result += entries.map(({ key, val }) =>
          `  ${key}: ${btoa(unescape(encodeURIComponent(val)))}`
        ).join('\n');
      } else if (mode === 'b642env') {
        // Decode Base64 values back to .env
        result = entries.map(({ key, val }) => {
          try {
            return `${key}=${decodeURIComponent(escape(atob(val)))}`;
          } catch {
            return `${key}=${val}  # could not decode`;
          }
        }).join('\n');
      } else if (mode === 'env2docker') {
        // docker run --env flags
        result = '# docker run flags\n';
        result += entries.map(({ key, val }) => `  -e ${key}="${val}" \\`).join('\n');
        result += '\n\n# docker-compose environment block\nenvironment:\n';
        result += entries.map(({ key, val }) => `  - ${key}=${val}`).join('\n');
      }

      setOutput(result);
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="tool-card">
      <h3>ENV_VAR_ENCODER</h3>
      <div className="tool-controls" style={{ flexDirection: 'row', gap: '0.4rem', flexWrap: 'wrap' }}>
        <button className={`tool-btn small ${mode === 'env2b64' ? 'active' : ''}`} onClick={() => setMode('env2b64')}>
          .env → K8s Base64
        </button>
        <button className={`tool-btn small ${mode === 'b642env' ? 'active' : ''}`} onClick={() => setMode('b642env')}>
          Base64 → .env
        </button>
        <button className={`tool-btn small ${mode === 'env2docker' ? 'active' : ''}`} onClick={() => setMode('env2docker')}>
          .env → Docker
        </button>
      </div>

      <textarea
        className="tool-input area"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="KEY=value&#10;ANOTHER_KEY=another_value"
        style={{ minHeight: '100px' }}
      />

      <button className="tool-btn" onClick={convert}>CONVERT</button>

      {error && <div className="tool-error">{error}</div>}

      {output && (
        <div style={{ position: 'relative' }}>
          <pre className="code-block" style={{ maxHeight: '160px', overflowY: 'auto' }}>{output}</pre>
          <button
            className="tool-btn small"
            onClick={copyOutput}
            style={{ position: 'absolute', top: '0.4rem', right: '0.4rem' }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EnvVarEncoder;
