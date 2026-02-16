/* eslint-disable react/prop-types */
import './SystemLoad.css';

const SystemLoad = ({ languages = [] }) => {
  // Show language breakdown as bars instead of random CPU data
  const maxPct = languages.length > 0 ? Math.max(...languages.map(l => parseFloat(l.percentage))) : 100;

  return (
    <div className="system-load-container">
      <h3>REPO LANGUAGE BREAKDOWN</h3>
      {languages.length > 0 ? (
        <>
          <div className="chart-wrapper">
            <div className="bars">
              {languages.map((lang, i) => (
                <div
                  key={lang.name}
                  className="bar"
                  style={{ 
                    height: `${(parseFloat(lang.percentage) / maxPct) * 95}%`,
                    animationDelay: `${i * 100}ms`,
                  }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>
          </div>
          <div className="metrics-row">
            {languages.slice(0, 3).map((lang) => (
              <span key={lang.name}>{lang.name}: {lang.percentage}%</span>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="chart-wrapper">
            <div className="bars">
              {Array.from({ length: 8 }, (_, i) => (
                <div key={i} className="bar placeholder-bar" style={{ height: `${20 + i * 8}%` }} />
              ))}
            </div>
          </div>
          <div className="metrics-row">
            <span>Loading language data...</span>
          </div>
        </>
      )}
    </div>
  );
};

export default SystemLoad;
