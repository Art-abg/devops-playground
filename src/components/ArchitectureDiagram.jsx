/* eslint-disable react/prop-types */
import './ArchitectureDiagram.css';

const ArchitectureDiagram = () => {
  return (
    <div className="arch-diagram-container">
      <h3>LIVE_INFRASTRUCTURE_VIEW</h3>
      <div className="arch-grid">
        {/* User */}
        <div className="arch-node user">
          <div className="node-icon">👤</div>
          <div className="node-label">USER</div>
          <div className="connection-line"></div>
        </div>

        {/* AWS Cloud */}
        <div className="arch-group aws">
          <div className="group-label">AWS Cloud (eu-central-1)</div>
          
          {/* VPC */}
          <div className="arch-group vpc">
            <div className="group-label">VPC (10.0.0.0/16)</div>

            {/* Public Subnet */}
            <div className="arch-group subnet">
              <div className="group-label">Public Subnet</div>

              {/* Security Group */}
              <div className="arch-group sg">
                <div className="group-label">SecGroup (Allow 22, 80)</div>

                {/* EC2 Instance */}
                <div className="arch-node ec2">
                  <div className="node-icon">🖥️</div>
                  <div className="node-label">EC2 (t3.micro)</div>
                  
                  {/* Docker */}
                  <div className="arch-node docker">
                    <div className="node-icon">🐳</div>
                    <div className="node-label">Docker Container</div>
                    <div className="node-status active">Running</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureDiagram;
