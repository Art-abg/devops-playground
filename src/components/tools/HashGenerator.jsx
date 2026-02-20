import { useState, useCallback } from 'react';
import { showToast } from '../Toast';
import './ToolStyles.css';

const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    md5: '',
    sha1: '',
    sha256: '',
    sha512: ''
  });

  const getHash = async (algorithm, data) => {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest(algorithm, dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const computeHashes = useCallback(async () => {
    if (!input) {
      setHashes({
        sha1: '',
        sha256: '',
        sha384: '',
        sha512: ''
      });
      return;
    }

    try {
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        getHash('SHA-1', input),
        getHash('SHA-256', input),
        getHash('SHA-384', input),
        getHash('SHA-512', input)
      ]);

      setHashes({ sha1, sha256, sha384, sha512 });
    } catch {
      showToast('Error generating hashes', 'error');
    }
  }, [input]);

  const copyHash = (hashValue) => {
    if (!hashValue) return;
    navigator.clipboard.writeText(hashValue).then(() => {
      showToast('Copied to clipboard!', 'success');
    });
  };

  return (
    <div className="tool-card">
      <h3>HASH_GENERATOR</h3>
      <div className="tool-input-group">
        <label>Input Text:</label>
        <textarea
          className="tool-input area"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          style={{ minHeight: '80px' }}
        />
      </div>
      
      <button className="tool-btn" onClick={computeHashes}>GENERATE HASHES</button>

      {hashes.sha256 && (
        <div className="tool-result" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {['sha1', 'sha256', 'sha384', 'sha512'].map((algo) => (
            <div key={algo} className="result-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.25rem' }}>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{algo.toUpperCase()}</span>
                <button 
                  className="tool-btn small copy-btn" 
                  onClick={() => copyHash(hashes[algo])}
                  style={{ padding: '0.1rem 0.5rem', fontSize: '0.7rem' }}
                >
                  COPY
                </button>
              </div>
              <span className="value" style={{ wordBreak: 'break-all', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                {hashes[algo]}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HashGenerator;
