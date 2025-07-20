import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewGoal() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoal({
      ...goal,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGoal = {
      ...goal,
      targetAmount: parseFloat(goal.targetAmount),
      savedAmount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    axios.post('http://localhost:3000/goals', newGoal)
      .then(() => navigate('/dashboard'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Create New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Goal Name:</label>
          <input
            id="name"
            name="name"
            value={goal.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="targetAmount">Target Amount:</label>
          <input
            id="targetAmount"
            name="targetAmount"
            type="number"
            value={goal.targetAmount}
            onChange={handleChange}
            min="1"
            step="0.01"
            required
          />
        </div>
        
        <div>
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            name="category"
            value={goal.category}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="deadline">Deadline:</label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={goal.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="button-group">
          <button type="submit">Create Goal</button>
          <button type="button" onClick={() => navigate('/dashboard')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}