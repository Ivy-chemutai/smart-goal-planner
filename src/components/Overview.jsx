import React from 'react';

function Overview({ goals = [] }) {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + (parseFloat(g.savedAmount) || 0), 0);
  const totalTarget = goals.reduce((sum, g) => sum + (parseFloat(g.targetAmount) || 0), 0);
  const completed = goals.filter(g => (parseFloat(g.savedAmount) || 0) >= (parseFloat(g.targetAmount) || 0)).length;

  const today = new Date();
  const dueSoon = goals.filter(g => {
    const dl = new Date(g.deadline);
    const savedAmount = parseFloat(g.savedAmount || 0);
    const targetAmount = parseFloat(g.targetAmount || 0);
    return savedAmount < targetAmount && (dl - today) / (24*60*60*1000) <= 30 && (dl - today) > 0;
  }).length;

  const overdue = goals.filter(g => {
    const dl = new Date(g.deadline);
    const savedAmount = parseFloat(g.savedAmount || 0);
    const targetAmount = parseFloat(g.targetAmount || 0);
    return savedAmount < targetAmount && dl < today;
  }).length;

  // Calculate overall progress percentage
  const overallProgress = totalTarget > 0 ? Math.min(Math.round((totalSaved / totalTarget) * 100), 100) : 0;

  return (
    <div className="overview">
      <h3>Goal Statistics</h3>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div className="fill" style={{ width: `${overallProgress}%` }}></div>
        </div>
        <p className="progress-text">{overallProgress}% Overall Progress</p>
      </div>
      
      <div className="overview-stats">
        <div className="stat-item">
          <p><strong>Total Goals:</strong> {totalGoals}</p>
        </div>
        <div className="stat-item">
          <p><strong>Completed Goals:</strong> {completed}</p>
        </div>
        <div className="stat-item">
          <p><strong>Goals Due Soon:</strong> {dueSoon}</p>
        </div>
        <div className="stat-item">
          <p><strong>Overdue Goals:</strong> {overdue}</p>
        </div>
      </div>
    </div>
  );
}

export default Overview;