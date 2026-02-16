import { useEffect, useState } from 'react';
import './SystemLoad.css';

const SystemLoad = () => {
  const [loadHistory, setLoadHistory] = useState(new Array(20).fill(10));

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadHistory(prev => {
        const newLoad = Math.floor(Math.random() * 40) + 10; // Random load 10-50%
        return [...prev.slice(1), newLoad];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-load-container">
      <h3>SYSTEM_LOAD_METRICS</h3>
      <div className="chart-wrapper">
        <div className="bars">
          {loadHistory.map((load, i) => (
            <div 
              key={i} 
              className="bar" 
              style={{ height: `${load}%` }}
              title={`Load: ${load}%`}
            />
          ))}
        </div>
        <div className="chart-overlay"></div>
      </div>
      <div className="metrics-row">
        <span>CPU: {loadHistory[loadHistory.length - 1]}%</span>
        <span>MEM: 2.4GB / 8GB</span>
        <span className="network-activity">NET: ↑ 24KB/s</span>
      </div>
    </div>
  );
};

export default SystemLoad;
