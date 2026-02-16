import CidrCalculator from './tools/CidrCalculator';
import CronGenerator from './tools/CronGenerator';
import ChmodCalculator from './tools/ChmodCalculator';
import './ToolsSection.css';

const ToolsSection = () => {
  return (
    <div className="tools-section">
      <div className="tools-header">
        <h2>DEVOPS_TOOLKIT</h2>
        <p>Essential utilities for system administration and engineering.</p>
      </div>
      <div className="tools-grid">
        <CidrCalculator />
        <CronGenerator />
        <ChmodCalculator />
      </div>
    </div>
  );
};

export default ToolsSection;
