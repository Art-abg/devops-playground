import { useState, useMemo } from 'react';
import './ToolStyles.css';

const MarkdownPreview = () => {
  const [markdown, setMarkdown] = useState('# Markdown Preview\n\nType some **markdown** here to see it *rendered*.\n\n- List item 1\n- List item 2\n\n```bash\necho "Hello World"\n```');

  const htmlContent = useMemo(() => {
    let html = markdown
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*)\*/gim, '<i>$1</i>')
      .replace(/`(.*)`/gim, '<code>$1</code>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      .replace(/\n$/gim, '<br />');
    
    return html;
  }, [markdown]);

  return (
    <div className="tool-card" style={{ gridColumn: 'span 2' }}>
      <h3>MARKDOWN_PREVIEW</h3>
      <div className="tool-controls">
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Simple regex-based rendering</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', height: '300px' }}>
        <textarea
          className="tool-input area"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Enter markdown..."
          style={{ height: '100%', resize: 'none', margin: 0 }}
        />
        <div 
          className="tool-result" 
          style={{ 
            height: '100%', 
            overflowY: 'auto', 
            background: 'var(--bg-primary)', 
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-default)',
            margin: 0,
            display: 'block'
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
};

export default MarkdownPreview;
