import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Deposit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching goal with ID:', id);
    
    // Use fetch instead of axios for better error handling
    fetch(`http://localhost:3000/goals/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Goal data received:', data);
        setGoal(data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching goal:', err);
        setError('Failed to load goal. Please check if the JSON server is running.');
      });
  }, [id]);

  function handleDeposit(e) {
    e.preventDefault();
    
    if (!goal) return;
    
    
    const currentSaved = parseFloat(goal.savedAmount) || 0;
    const depositAmount = parseFloat(amount);
    const newSavedAmount = currentSaved + depositAmount;
    
    
    fetch(`http://localhost:3000/goals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ savedAmount: newSavedAmount })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => navigate('/dashboard'))
      .catch(err => {
        console.error('Error updating goal:', err);
        setError('Failed to update goal. Please check if the JSON server is running.');
      });
  }

  if (error) return (
    <div className="error-container">
      <h2>Error</h2>
      <p>{error}</p>
      <div className="troubleshooting">
        <h3>Troubleshooting:</h3>
        <ol>
          <li>Make sure the JSON server is running with: <code>npm run server</code></li>
          <li>Check that it's running on port 3000</li>
          <li>Verify that the goal ID {id} exists in the database</li>
        </ol>
        <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
      </div>
    </div>
  );

  if (!goal) return <div className="loading">Loading goal data...</div>;

  
  const savedAmount = parseFloat(goal.savedAmount) || 0;
  const targetAmount = parseFloat(goal.targetAmount) || 0;
  const progress = Math.min(Math.round((savedAmount / targetAmount) * 100) || 0, 100);

  return (
    <div className="deposit-container">
      <h2>Make a Deposit</h2>
      
      <div className="goal-card">
        <h3>{goal.name}</h3>
        <p className="category">{goal.category}</p>
        
        <div className="amount-info">
          <p><strong>Currently Saved:</strong> ${savedAmount.toFixed(2)}</p>
          <p><strong>Target Amount:</strong> ${targetAmount.toFixed(2)}</p>
          <p><strong>Remaining:</strong> ${Math.max(0, targetAmount - savedAmount).toFixed(2)}</p>
        </div>
        
        <div className="progress-bar">
          <div className="fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{progress}% Complete</p>
      </div>
      
      <form onSubmit={handleDeposit}>
        <div>
          <label htmlFor="amount">Deposit Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Make Deposit</button>
          <button type="button" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}