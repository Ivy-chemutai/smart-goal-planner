import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditGoal() {
  const { id } = useParams();
  const [goal, setGoal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/goals/${id}`)
      .then(res => res.json())
      .then(setGoal);
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setGoal(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3001/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goal),
    }).then(() => navigate("/"));
  }

  if (!goal) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={goal.name} onChange={handleChange} />
      <input name="targetAmount" value={goal.targetAmount} onChange={handleChange} />
      <input name="category" value={goal.category} onChange={handleChange} />
      <input name="deadline" type="date" value={goal.deadline} onChange={handleChange} />
      <button type="submit">Update Goal</button>
    </form>
  );
}

export default EditGoal;
