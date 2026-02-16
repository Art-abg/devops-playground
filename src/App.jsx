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
