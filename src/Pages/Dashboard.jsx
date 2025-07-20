import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSaved: 0,
    totalTarget: 0,
    completed: 0,
    inProgress: 0
  });

  useEffect(() => {
    console.log('Fetching goals from server...');
    
    fetch('http://localhost:3000/goals')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Goals data received:', data);
        setGoals(data);
        
        // Calculate stats
        const totalSaved = data.reduce((sum, goal) => sum + (parseFloat(goal.savedAmount) || 0), 0);
        const totalTarget = data.reduce((sum, goal) => sum + (parseFloat(goal.targetAmount) || 0), 0);
        const completed = data.filter(goal => (parseFloat(goal.savedAmount) || 0) >= (parseFloat(goal.targetAmount) || 0)).length;
        
        setStats({
          totalSaved,
          totalTarget,
          completed,
          inProgress: data.length - completed
        });
        
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching goals:', err);
        setError('Failed to load goals. Please check if the JSON server is running.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      fetch(`http://localhost:3000/goals/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          setGoals(goals.filter(goal => goal.id !== id));
          
          // Update stats after deletion
          const updatedGoals = goals.filter(goal => goal.id !== id);
          const totalSaved = updatedGoals.reduce((sum, goal) => sum + (parseFloat(goal.savedAmount) || 0), 0);
          const totalTarget = updatedGoals.reduce((sum, goal) => sum + (parseFloat(goal.targetAmount) || 0), 0);
          const completed = updatedGoals.filter(goal => (parseFloat(goal.savedAmount) || 0) >= (parseFloat(goal.targetAmount) || 0)).length;
          
          setStats({
            totalSaved,
            totalTarget,
            completed,
            inProgress: updatedGoals.length - completed
          });
        })
        .catch(err => {
          console.error('Error deleting goal:', err);
          alert('Failed to delete goal. Please check if the JSON server is running.');
        });
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  
  if (error) return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{error}</p>
      <div className="troubleshooting">
        <h3>Troubleshooting:</h3>
        <ol>
          <li>Make sure the JSON server is running with: <code>npm run server</code></li>
          <li>Check that it's running on port 3000</li>
          <li>Verify that db.json exists and has the correct structure</li>
        </ol>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Saved</h3>
          <p className="stat-value">${stats.totalSaved.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Target</h3>
          <p className="stat-value">${stats.totalTarget.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Goals</h3>
          <p className="stat-value">{stats.completed}</p>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-value">{stats.inProgress}</p>
        </div>
      </div>
      
      <div className="dashboard-actions">
        <Link to="/new">
          <button>Add New Goal</button>
        </Link>
      </div>
      
      <h3>Your Goals</h3>
      {goals.length === 0 ? (
        <p>No goals yet. Start by adding one!</p>
      ) : (
        <div className="goal-list">
          {goals.map(goal => {
            const savedAmount = parseFloat(goal.savedAmount || 0);
            const targetAmount = parseFloat(goal.targetAmount || 0);
            const progress = Math.min(Math.round((savedAmount / targetAmount) * 100) || 0, 100);
            
            return (
              <div key={goal.id} className="goal-card">
                <h3>{goal.name}</h3>
                <p className="category">{goal.category}</p>
                <p>Saved: ${savedAmount.toFixed(2)} / ${targetAmount.toFixed(2)}</p>
                
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="progress-text">{progress}% Complete</p>
                
                <div className="goal-actions">
                  <Link to={`/deposit/${goal.id}`}>
                    <button>Deposit</button>
                  </Link>
                  <button onClick={() => handleDelete(goal.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}