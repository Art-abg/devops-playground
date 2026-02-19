  import { useState } from 'react';
import './ToolStyles.css';

const ChmodCalculator = () => {
  const [permissions, setPermissions] = useState({
    owner: { r: true, w: true, x: false },
    group: { r: true, w: false, x: false },
    other: { r: true, w: false, x: false }
  });

  const updatePermission = (type, action) => {
    setPermissions(prev => ({
      ...prev,
      [type]: { ...prev[type], [action]: !prev[type][action] }
    }));
  };

  // Calculate derived values directly
  const calculate = (p) => (p.r ? 4 : 0) + (p.w ? 2 : 0) + (p.x ? 1 : 0);
  const o = calculate(permissions.owner);
  const g = calculate(permissions.group);
  const ot = calculate(permissions.other);
  const octal = `${o}${g}${ot}`;

  const sym = [
    permissions.owner.r ? 'r' : '-',
    permissions.owner.w ? 'w' : '-',
    permissions.owner.x ? 'x' : '-',
    permissions.group.r ? 'r' : '-',
    permissions.group.w ? 'w' : '-',
    permissions.group.x ? 'x' : '-',
    permissions.other.r ? 'r' : '-',
    permissions.other.w ? 'w' : '-',
    permissions.other.x ? 'x' : '-'
  ].join('');
  const symbolic = `-${sym}`;

  return (
    <div className="tool-card">
      <h3>CHMOD_CALCULATOR</h3>
      <div className="chmod-grid">
        <div className="chmod-col">
          <h4>Owner</h4>
          <label><input type="checkbox" checked={permissions.owner.r} onChange={() => updatePermission('owner', 'r')} /> Read</label>
          <label><input type="checkbox" checked={permissions.owner.w} onChange={() => updatePermission('owner', 'w')} /> Write</label>
          <label><input type="checkbox" checked={permissions.owner.x} onChange={() => updatePermission('owner', 'x')} /> Execute</label>
        </div>
        <div className="chmod-col">
          <h4>Group</h4>
          <label><input type="checkbox" checked={permissions.group.r} onChange={() => updatePermission('group', 'r')} /> Read</label>
          <label><input type="checkbox" checked={permissions.group.w} onChange={() => updatePermission('group', 'w')} /> Write</label>
          <label><input type="checkbox" checked={permissions.group.x} onChange={() => updatePermission('group', 'x')} /> Execute</label>
        </div>
        <div className="chmod-col">
          <h4>Other</h4>
          <label><input type="checkbox" checked={permissions.other.r} onChange={() => updatePermission('other', 'r')} /> Read</label>
          <label><input type="checkbox" checked={permissions.other.w} onChange={() => updatePermission('other', 'w')} /> Write</label>
          <label><input type="checkbox" checked={permissions.other.x} onChange={() => updatePermission('other', 'x')} /> Execute</label>
        </div>
      </div>

      <div className="tool-result">
        <div className="result-item"><span>Octal:</span> <span className="value large">{octal}</span></div>
        <div className="result-item"><span>Symbolic:</span> <span className="value larger">{symbolic}</span></div>
      </div>
    </div>
  );
};

export default ChmodCalculator;
