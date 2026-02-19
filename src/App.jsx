import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import PipelineVisualizer from './components/PipelineVisualizer'
import TechStack from './components/TechStack'
import ToolsSection from './components/ToolsSection'
import SystemLoad from './components/SystemLoad'
import Monitor from './components/Monitor'
import { getRepoInfo, getWorkflowRuns, getCommits, getLanguages } from './services/github'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [repoInfo, setRepoInfo] = useState(null);
  const [workflowRuns, setWorkflowRuns] = useState([]);
  const [commits, setCommits] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [repo, runs, cmts, langs] = await Promise.all([
        getRepoInfo(),
        getWorkflowRuns(8),
        getCommits(15),
        getLanguages(),
      ]);
      setRepoInfo(repo);
      setWorkflowRuns(runs);
      setCommits(cmts);
      setLanguages(langs);
      setLoading(false);
    }
    loadData();

    // Refresh every 2 minutes
    const interval = setInterval(loadData, 120_000);
    return () => clearInterval(interval);
  }, []);

  const latestRun = workflowRuns[0];
  const buildStatus = latestRun?.conclusion === 'success' ? 'PASSING' : 
                       latestRun?.conclusion === 'failure' ? 'FAILING' :
                       latestRun?.status === 'in_progress' ? 'RUNNING' : 'UNKNOWN';
  const deployStatus = latestRun?.conclusion === 'success' ? 'DEPLOYED' : 'PENDING';

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' ? (
        <div className="dashboard-grid">
          <div className="dashboard-section hero">
            <h1>{repoInfo?.name || 'DevOps Playground'}</h1>
            <p className="subtitle">{repoInfo?.description || 'Loading...'}</p>
            
            <div className="status-badges">
              <span className={`badge ${buildStatus === 'PASSING' ? 'success' : buildStatus === 'FAILING' ? 'danger' : 'warning'}`}>
                BUILD: {loading ? '...' : buildStatus}
              </span>
              <span className={`badge ${deployStatus === 'DEPLOYED' ? 'success' : 'warning'}`}>
                DEPLOY: {loading ? '...' : deployStatus}
              </span>
              {repoInfo && (
                <>
                  <span className="badge info">★ {repoInfo.stars}</span>
                  <span className="badge info">
                    ⑂ {repoInfo.forks}
                  </span>
                  <span className="badge info">
                    ISSUES: {repoInfo.openIssues}
                  </span>
                </>
              )}
            </div>

            {repoInfo && (
              <div className="repo-meta">
                <span>Last push: {new Date(repoInfo.pushedAt).toLocaleString()}</span>
                <span>Branch: {repoInfo.defaultBranch}</span>
                <span>Size: {(repoInfo.size / 1024).toFixed(1)} MB</span>
              </div>
            )}

            <div className="quick-actions" style={{ 
              marginTop: '1.5rem', 
              display: 'flex', 
              gap: '12px', 
              flexWrap: 'wrap' 
            }}>
              <button 
                onClick={() => setActiveTab('tools')} 
                className="btn-quick"
                style={{
                  background: 'rgba(34, 211, 238, 0.1)',
                  border: '1px solid var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                DevOps Toolkit
              </button>
              <button 
                onClick={() => setActiveTab('monitor')} 
                className="btn-quick"
                style={{
                  background: 'rgba(167, 139, 250, 0.1)',
                  border: '1px solid var(--accent-purple)',
                  color: 'var(--accent-purple)',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                Real-time Monitor
              </button>
            </div>

            <SystemLoad languages={languages} />
          </div>

          <div className="dashboard-section architecture">
            <ArchitectureDiagram />
          </div>

          <div className="dashboard-section pipeline">
            <PipelineVisualizer runs={workflowRuns} loading={loading} />
          </div>

          <div className="dashboard-section tech">
            <TechStack languages={languages} />
          </div>
        </div>
      ) : activeTab === 'tools' ? (
        <ToolsSection />
      ) : (
        <Monitor commits={commits} runs={workflowRuns} repoInfo={repoInfo} />
      )}
    </Layout>
  )
}

export default App
