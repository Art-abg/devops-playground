import './TechStack.css';

const TECHS = [
  { name: 'React',           color: '#61DAFB', icon: '⚛' },
  { name: 'Docker',          color: '#2496ED', icon: '🐳' },
  { name: 'Terraform',       color: '#7B42BC', icon: '◈' },
  { name: 'AWS',             color: '#FF9900', icon: '☁' },
  { name: 'GitHub Actions',  color: '#2088FF', icon: '⚙' },
  { name: 'Nginx',           color: '#009639', icon: '◉' },
  { name: 'Kubernetes',      color: '#326CE5', icon: '⎈' },
  { name: 'Vite',            color: '#646CFF', icon: '⚡' },
];

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  CSS: '#563d7c',
  HTML: '#e34c26',
  HCL: '#844fba',
  Dockerfile: '#384d54',
  Shell: '#89e051',
  Python: '#3572A5',
};

const TechStack = ({ languages = [] }) => {
  return (
    <div className="tech-stack-container">
      <h3>TECHNOLOGY STACK</h3>

      {/* Language bar */}
      {languages.length > 0 && (
        <>
          <div className="lang-bar">
            {languages.map(lang => (
              <div
                key={lang.name}
                className="lang-segment"
                style={{
                  width: `${lang.percentage}%`,
                  background: LANG_COLORS[lang.name] || '#64748b',
                }}
                title={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>
          <div className="lang-legend">
            {languages.map(lang => (
              <div key={lang.name} className="lang-item">
                <span className="lang-dot" style={{ background: LANG_COLORS[lang.name] || '#64748b' }} />
                <span className="lang-name">{lang.name}</span>
                <span className="lang-pct">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="tech-grid">
        {TECHS.map((tech) => (
          <div
            key={tech.name}
            className="tech-card"
            style={{ '--tech-color': tech.color }}
          >
            <span className="tech-icon">{tech.icon}</span>
            <span className="tech-name">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
