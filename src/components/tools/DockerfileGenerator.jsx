  import { useState, useMemo } from 'react';
import './ToolStyles.css';

const DockerfileGenerator = () => {
  const [stack, setStack] = useState('node');
  const [version, setVersion] = useState('18-alpine');
  const [port, setPort] = useState('3000');

  const dockerfile = useMemo(() => {
    if (stack === 'node') {
      return `# Node.js Dockerfile
FROM node:${version}

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE ${port}
CMD ["npm", "start"]`;
    } else if (stack === 'python') {
      return `# Python Dockerfile
FROM python:${version}

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE ${port}
CMD ["python", "app.py"]`;
    } else if (stack === 'go') {
      return `# Go Dockerfile
FROM golang:${version} AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE ${port}
CMD ["./main"]`;
    }
    return '';
  }, [stack, version, port]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dockerfile);
    alert('Dockerfile copied to clipboard!');
  };

  return (
    <div className="tool-card">
      <h3>DOCKERFILE_GEN</h3>
      <div className="tool-input-group">
        <label>Stack:</label>
        <div className="button-group">
          <button className={`tool-btn small ${stack === 'node' ? 'active' : ''}`} onClick={() => setStack('node')}>Node</button>
          <button className={`tool-btn small ${stack === 'python' ? 'active' : ''}`} onClick={() => setStack('python')}>Python</button>
          <button className={`tool-btn small ${stack === 'go' ? 'active' : ''}`} onClick={() => setStack('go')}>Go</button>
        </div>
        
        <label>Version:</label>
        <input type="text" value={version} onChange={(e) => setVersion(e.target.value)} className="tool-input" placeholder="e.g. 18-alpine" />

        <label>Expose Port:</label>
        <input type="text" value={port} onChange={(e) => setPort(e.target.value)} className="tool-input" placeholder="e.g. 3000" />
      </div>

      <div className="tool-result">
        <pre className="code-block">{dockerfile}</pre>
        <button className="tool-btn small copy-btn" onClick={copyToClipboard}>COPY</button>
      </div>
    </div>
  );
};

export default DockerfileGenerator;
