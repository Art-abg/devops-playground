/* eslint-disable react/prop-types */
import './TechStack.css';

const TechStack = ({ languages = [] }) => {
  // Fallback if no API data
  const defaultTechs = [
    { name: 'Terraform', color: '#7B42BC' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'React', color: '#61DAFB' },
    { name: 'GitHub Actions', color: '#2088FF' },
    { name: 'Nginx', color: '#009639' },
  ];

  const langColors = {
    JavaScript: '#f1e05a',
    CSS: '#563d7c',
    HTML: '#e34c26',
    HCL: '#844fba',
    Dockerfile: '#384d54',
    Shell: '#89e051',
  };

  return (
    <div className="tech-stack-container">
      <h3>TECHNOLOGY STACK</h3>
      
      {languages.length > 0 && (
        <div className="lang-bar">
          {languages.map(lang => (
            <div
              key={lang.name}
              className="lang-segment"
              style={{
                width: `${lang.percentage}%`,
                background: langColors[lang.name] || '#666',
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
      )}

      {languages.length > 0 && (
        <div className="lang-legend">
          {languages.map(lang => (
            <div key={lang.name} className="lang-item">
              <span className="lang-dot" style={{ background: langColors[lang.name] || '#666' }} />
              <span className="lang-name">{lang.name}</span>
              <span className="lang-pct">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      )}

      <div className="tech-grid">
        {defaultTechs.map((tech) => (
          <div key={tech.name} className="tech-card" style={{ borderColor: tech.color }}>
            <span className="tech-name" style={{ color: tech.color }}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
