import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/goals')
      .then(res => {
        setGoals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching goals:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      axios.delete(`http://localhost:3000/goals/${id}`)
        .then(() => {
          setGoals(goals.filter(goal => goal.id !== id));
        })
        .catch(err => console.error('Error deleting goal:', err));
    }
  };

  if (loading) return <p>Loading goals...</p>;

  return (
    <div>
      <div className="actions">
        <Link to="/new">
          <button>Add New Goal</button>
        </Link>
      </div>

      <div className="stats">
        <p>Total Goals: {goals.length}</p>
        <p>Total Saved: ${goals.reduce((sum, goal) => sum + (parseFloat(goal.savedAmount) || 0), 0).toFixed(2)}</p>
      </div>

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
                <p>Category: {goal.category}</p>
                <p>Saved: ${savedAmount.toFixed(2)} / ${targetAmount.toFixed(2)}</p>
                
                <div className="progress-bar">
                  <div className="fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p>{progress}% Complete</p>
                
                <div className="goal-actions">
                  <Link to={`/deposit/${goal.id}`}>
                    <button>Deposit</button>
                  </Link>
                  <button onClick={() => handleDelete(goal.id)}>Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}