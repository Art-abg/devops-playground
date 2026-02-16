/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ToolStyles.css';

const Base64Helper = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');

  const process = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Error: Invalid Input');
    }
  };

  return (
    <div className="tool-card">
      <h3>BASE64_HELPER</h3>
      <div className="tool-controls">
        <button className={`tool-btn small ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')}>ENCODE</button>
        <button className={`tool-btn small ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')}>DECODE</button>
      </div>

      <textarea 
        className="tool-input area" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder={`Enter text to ${mode}...`}
      />
      
      <button className="tool-btn" onClick={process}>PROCESS</button>
      
      <div className="tool-result">
        <span className="value break-word">{output}</span>
      </div>
    </div>
  );
};

export default Base64Helper;
