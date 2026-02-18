import CidrCalculator from './tools/CidrCalculator';
import CronGenerator from './tools/CronGenerator';
import ChmodCalculator from './tools/ChmodCalculator';
import DockerfileGenerator from './tools/DockerfileGenerator';
import JsonYamlConverter from './tools/JsonYamlConverter';
import Base64Helper from './tools/Base64Helper';
import RegexTester from './tools/RegexTester';
import PasswordGenerator from './tools/PasswordGenerator';
import HttpReference from './tools/HttpReference';
import DiffChecker from './tools/DiffChecker';
import './ToolsSection.css';

const ToolsSection = () => {
  return (
    <div className="tools-section">
      <div className="tools-header">
        <h2>DevOps Toolkit</h2>
        <p>Essential utilities for system administration and infrastructure engineering.</p>
      </div>
      <div className="tools-grid">
        <CidrCalculator />
        <CronGenerator />
        <ChmodCalculator />
        <RegexTester />
        <PasswordGenerator />
        <DockerfileGenerator />
        <JsonYamlConverter />
        <Base64Helper />
        <HttpReference />
        <DiffChecker />
      </div>
    </div>
  );
};

export default ToolsSection;
