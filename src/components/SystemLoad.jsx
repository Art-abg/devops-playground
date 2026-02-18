/* eslint-disable react/prop-types */
import { useState } from 'react';
import './SystemLoad.css';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  CSS: '#563d7c',
  HTML: '#e34c26',
  HCL: '#844fba',
  Dockerfile: '#384d54',
  Shell: '#89e051',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#dea584',
};

const SystemLoad = ({ languages = [] }) => {
  const [hovered, setHovered] = useState(null);

  const placeholders = Array.from({ length: 5 }, (_, i) => ({
    name: `lang-${i}`,
    percentage: String(10 + i * 15),
    placeholder: true,
  }));

  const items = languages.length > 0 ? languages : placeholders;

  return (
    <div className="system-load-container">
      <h3>REPO LANGUAGE BREAKDOWN</h3>
      <div className="lang-bars">
        {items.map((lang, i) => {
          const color = LANG_COLORS[lang.name] || '#64748b';
          const pct = parseFloat(lang.percentage);
          return (
            <div
              key={lang.name}
              className={`lang-bar-row${lang.placeholder ? ' placeholder' : ''}`}
              onMouseEnter={() => setHovered(lang.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="lang-bar-label">
                <span className="lang-dot-sm" style={{ background: color }} />
                <span className="lang-bar-name">{lang.placeholder ? '···' : lang.name}</span>
              </div>
              <div className="lang-bar-track">
                <div
                  className="lang-bar-fill"
                  style={{
                    width: `${pct}%`,
                    background: lang.placeholder ? 'rgba(100,116,139,0.2)' : color,
                    animationDelay: `${i * 80}ms`,
                    opacity: hovered && hovered !== lang.name ? 0.35 : 1,
                  }}
                />
              </div>
              <span className="lang-bar-pct">
                {lang.placeholder ? '' : `${lang.percentage}%`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SystemLoad;
