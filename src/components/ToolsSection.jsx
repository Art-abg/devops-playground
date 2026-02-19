import { useState, useMemo } from 'react';
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
import UrlEncoder from './tools/UrlEncoder';
import UuidGenerator from './tools/UuidGenerator';
import JwtDecoder from './tools/JwtDecoder';
import MarkdownPreview from './tools/MarkdownPreview';
import './ToolsSection.css';

const TOOLS = [
  { id: 'cidr', component: CidrCalculator, name: 'CIDR Calculator', desc: 'IP range calculations' },
  { id: 'cron', component: CronGenerator, name: 'Cron Generator', desc: 'Schedule expression builder' },
  { id: 'chmod', component: ChmodCalculator, name: 'Chmod Calculator', desc: 'Linux permissions helper' },
  { id: 'regex', component: RegexTester, name: 'Regex Tester', desc: 'Regular expression validator' },
  { id: 'password', component: PasswordGenerator, name: 'Password Generator', desc: 'Secure credential creator' },
  { id: 'docker', component: DockerfileGenerator, name: 'Dockerfile Generator', desc: 'Container config builder' },
  { id: 'json-yaml', component: JsonYamlConverter, name: 'JSON/YAML Converter', desc: 'Format transformation' },
  { id: 'base64', component: Base64Helper, name: 'Base64 Helper', desc: 'Encoding and decoding' },
  { id: 'http', component: HttpReference, name: 'HTTP Reference', desc: 'Status codes & headers' },
  { id: 'diff', component: DiffChecker, name: 'Diff Checker', desc: 'Text comparison tool' },
  { id: 'url', component: UrlEncoder, name: 'URL Encoder', desc: 'Encoding/decoding URLs' },
  { id: 'uuid', component: UuidGenerator, name: 'UUID Generator', desc: 'Unique identifier creator' },
  { id: 'jwt', component: JwtDecoder, name: 'JWT Decoder', desc: 'Token payload inspector' },
  { id: 'markdown', component: MarkdownPreview, name: 'Markdown Preview', desc: 'Rich text visualization' },
];

const ToolsSection = () => {
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(search.toLowerCase()) || 
      tool.desc.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="tools-section">
      <div className="tools-header">
        <div className="header-content">
          <h2>DevOps Toolkit</h2>
          <p>Essential utilities for system administration and infrastructure engineering.</p>
        </div>
        <div className="search-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input 
            type="text" 
            placeholder="Search tools..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="tool-search"
          />
        </div>
      </div>
      <div className="tools-grid">
        {filteredTools.map(tool => (
          <tool.component key={tool.id} />
        ))}
        {filteredTools.length === 0 && (
          <div className="no-results">
            No tools found matching &quot;{search}&quot;
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsSection;

