/* eslint-disable react/prop-types */
import { useState } from 'react';
import './ToolStyles.css';

const CidrCalculator = () => {
  const [cidr, setCidr] = useState('192.168.1.0/24');
  const [result, setResult] = useState(null);

  const calculateCidr = (input) => {
    try {
      const [ip, mask] = input.split('/');
      const maskBits = parseInt(mask, 10);
      
      if (!ip || isNaN(maskBits) || maskBits < 0 || maskBits > 32) {
        throw new Error('Invalid CIDR format');
      }

      const ipParts = ip.split('.').map(Number);
      if (ipParts.length !== 4 || ipParts.some(part => isNaN(part) || part < 0 || part > 255)) {
        throw new Error('Invalid IP address');
      }

      const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
      const maskNum = 0xffffffff << (32 - maskBits);
      const networkNum = ipNum & maskNum;
      const broadcastNum = networkNum | (~maskNum);

      const numHosts = Math.pow(2, 32 - maskBits) - 2;

      const numToIp = (num) => {
        return [
          (num >>> 24) & 0xff,
          (num >>> 16) & 0xff,
          (num >>> 8) & 0xff,
          num & 0xff
        ].join('.');
      };

      setResult({
        network: numToIp(networkNum),
        broadcast: numToIp(broadcastNum),
        firstHost: numToIp(networkNum + 1),
        lastHost: numToIp(broadcastNum - 1),
        netmask: numToIp(maskNum),
        hosts: numHosts > 0 ? numHosts : 0
      });
    } catch (error) {
       setResult({ error: 'Invalid CIDR block' });
    }
  };

  return (
    <div className="tool-card">
      <h3>CIDR_CALCULATOR</h3>
      <div className="tool-input-group">
        <label>CIDR Block:</label>
        <div className="input-row">
            <input 
            type="text" 
            value={cidr} 
            onChange={(e) => setCidr(e.target.value)} 
            placeholder="e.g. 10.0.0.0/16"
            className="tool-input"
            />
            <button className="tool-btn" onClick={() => calculateCidr(cidr)}>CALCULATE</button>
        </div>
      </div>

      {result && !result.error && (
        <div className="tool-result">
          <div className="result-item"><span>Network:</span> <span className="value">{result.network}</span></div>
          <div className="result-item"><span>Netmask:</span> <span className="value">{result.netmask}</span></div>
          <div className="result-item"><span>First Host:</span> <span className="value">{result.firstHost}</span></div>
          <div className="result-item"><span>Last Host:</span> <span className="value">{result.lastHost}</span></div>
          <div className="result-item"><span>Broadcast:</span> <span className="value">{result.broadcast}</span></div>
          <div className="result-item"><span>Total Hosts:</span> <span className="value">{result.hosts.toLocaleString()}</span></div>
        </div>
      )}
      {result && result.error && <div className="tool-error">{result.error}</div>}
    </div>
  );
};

export default CidrCalculator;
