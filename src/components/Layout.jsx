/* eslint-disable react/prop-types */
import './Layout.css';
import Terminal from './Terminal';

const Layout = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="logo-glitch" data-text="DEVOPS_PLAYGROUND">DEVOPS_PLAYGROUND</div>
        <nav className="layout-nav">
          <span 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => onTabChange('dashboard')}
          >
            DASHBOARD
          </span>
          <span 
            className={`nav-item ${activeTab === 'tools' ? 'active' : ''}`}
            onClick={() => onTabChange('tools')}
          >
            TOOLKIT
          </span>
          <span className="nav-item">SETTINGS</span>
        </nav>
        <div className="user-status">
          <span className="status-indicator online"></span>
          ADMIN@SYS
        </div>
      </header>
      
      <main className="layout-content">
        {children}
      </main>

      <footer className="layout-footer">
        <Terminal />
      </footer>
    </div>
  );
};

export default Layout;
