/* eslint-disable react/prop-types */
import './TechStack.css';

const TechStack = () => {
  const techs = [
    { name: 'Terraform', color: '#7B42BC' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'AWS', color: '#FF9900' },
    { name: 'React', color: '#61DAFB' },
    { name: 'GitHub Actions', color: '#2088FF' },
    { name: 'Vite', color: '#646CFF' },
  ];

  return (
    <div className="tech-stack-container">
      <h3>TECHNOLOGY_STACK</h3>
      <div className="tech-grid">
        {techs.map((tech) => (
          <div key={tech.name} className="tech-card" style={{ borderColor: tech.color }}>
            <span className="tech-name" style={{ color: tech.color }}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
