/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './ToolStyles.css';

const CronGenerator = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [day, setDay] = useState('*');
  const [month, setMonth] = useState('*');
  const [weekday, setWeekday] = useState('*');
  const [cronString, setCronString] = useState('* * * * *');

  useEffect(() => {
    setCronString(`${minute} ${hour} ${day} ${month} ${weekday}`);
  }, [minute, hour, day, month, weekday]);

  const handlePreset = (preset) => {
    switch (preset) {
      case 'hourly': setMinute('0'); setHour('*'); setDay('*'); setMonth('*'); setWeekday('*'); break;
      case 'daily': setMinute('0'); setHour('0'); setDay('*'); setMonth('*'); setWeekday('*'); break;
      case 'weekly': setMinute('0'); setHour('0'); setDay('*'); setMonth('*'); setWeekday('0'); break;
      case 'monthly': setMinute('0'); setHour('0'); setDay('1'); setMonth('*'); setWeekday('*'); break;
      default: break;
    }
  };

  return (
    <div className="tool-card">
      <h3>CRON_GENERATOR</h3>
      <div className="tool-controls">
        <label>Presets:</label>
        <div className="button-group">
          <button className="tool-btn small" onClick={() => handlePreset('hourly')}>Hourly</button>
          <button className="tool-btn small" onClick={() => handlePreset('daily')}>Daily</button>
          <button className="tool-btn small" onClick={() => handlePreset('weekly')}>Weekly</button>
          <button className="tool-btn small" onClick={() => handlePreset('monthly')}>Monthly</button>
        </div>
      </div>

      <div className="cron-builder">
        <div className="cron-field">
          <label>Minute</label>
          <input type="text" value={minute} onChange={(e) => setMinute(e.target.value)} className="tool-input short" />
        </div>
        <div className="cron-field">
          <label>Hour</label>
          <input type="text" value={hour} onChange={(e) => setHour(e.target.value)} className="tool-input short" />
        </div>
        <div className="cron-field">
          <label>Day</label>
          <input type="text" value={day} onChange={(e) => setDay(e.target.value)} className="tool-input short" />
        </div>
        <div className="cron-field">
          <label>Month</label>
          <input type="text" value={month} onChange={(e) => setMonth(e.target.value)} className="tool-input short" />
        </div>
        <div className="cron-field">
          <label>Weekday</label>
          <input type="text" value={weekday} onChange={(e) => setWeekday(e.target.value)} className="tool-input short" />
        </div>
      </div>

      <div className="tool-result large">
        <span className="value">{cronString}</span>
      </div>
    </div>
  );
};

export default CronGenerator;
