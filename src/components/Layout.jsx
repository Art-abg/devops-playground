/* eslint-disable react/prop-types */
import './Layout.css';
import Terminal from './Terminal';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="logo-glitch" data-text="DEVOPS_PLAYGROUND">DEVOPS_PLAYGROUND</div>
        <nav className="layout-nav">
          <span className="nav-item active">DASHBOARD</span>
          <span className="nav-item">LOGS</span>
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
