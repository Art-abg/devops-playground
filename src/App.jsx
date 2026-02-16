import Layout from './components/Layout'
import ArchitectureDiagram from './components/ArchitectureDiagram'
import PipelineVisualizer from './components/PipelineVisualizer'
import TechStack from './components/TechStack'
import './App.css'

function App() {
  return (
    <Layout>
      <div className="dashboard-grid">
        <div className="dashboard-section hero">
          <h1>DEVOPS_PROJECT_01</h1>
          <p className="subtitle">Containerized React App on AWS EC2 via Terraform</p>
          <div className="status-badges">
            <span className="badge success">BUILD: PASSING</span>
            <span className="badge success">DEPLOY: SUCCESS</span>
            <span className="badge warning">UPTIME: 99.9%</span>
          </div>
        </div>

        <div className="dashboard-section architecture">
          <ArchitectureDiagram />
        </div>

        <div className="dashboard-section pipeline">
          <PipelineVisualizer />
        </div>

        <div className="dashboard-section tech">
          <TechStack />
        </div>
      </div>
    </Layout>
  )
}

export default App
