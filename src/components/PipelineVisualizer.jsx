/* eslint-disable react/prop-types */
import './PipelineVisualizer.css';

const PipelineVisualizer = () => {
  return (
    <div className="pipeline-container">
      <h3>CICD_PIPELINE_STATUS</h3>
      <div className="pipeline-flow">
        
        {/* Step 1: GitHub */}
        <div className="pipeline-step">
          <div className="step-icon">🐙</div>
          <div className="step-label">GitHub Repo</div>
          <div className="step-status success">Push Main</div>
        </div>

        <div className="pipeline-arrow">➔</div>

        {/* Step 2: Actions */}
        <div className="pipeline-step">
          <div className="step-icon">⚙️</div>
          <div className="step-label">GitHub Actions</div>
          <div className="step-status processing">Building...</div>
        </div>

        <div className="pipeline-arrow">➔</div>

        {/* Step 3: Docker Hub */}
        <div className="pipeline-step">
          <div className="step-icon">🐳</div>
          <div className="step-label">Docker Hub</div>
          <div className="step-status pending">Waiting</div>
        </div>

        <div className="pipeline-arrow">➔</div>

        {/* Step 4: EC2 */}
        <div className="pipeline-step">
          <div className="step-icon">🚀</div>
          <div className="step-label">EC2 Deploy</div>
          <div className="step-status pending">Waiting</div>
        </div>

      </div>
    </div>
  );
};

export default PipelineVisualizer;
