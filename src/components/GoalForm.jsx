import React, { useState } from "react"; 

const GoalForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    targetAmount: initialData.targetAmount || "",
    savedAmount: initialData.savedAmount || 0,
    category: initialData.category || "",
    deadline: initialData.deadline || "",
    createdAt: initialData.createdAt || new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit(formData); 
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <label>
        Name:
        <input name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Target Amount:
        <input type="number" name="targetAmount" value={formData.targetAmount} onChange={handleChange} required />
      </label>
      <label>
        Saved Amount:
        <input type="number" name="savedAmount" value={formData.savedAmount} onChange={handleChange} />
      </label>
      <label>
        Category:
        <input name="category" value={formData.category} onChange={handleChange} required />
      </label>
      <label>
        Deadline:
        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} required />
      </label>
      <button type="submit">Save Goal</button>
    </form>
  );
};

export default GoalForm; 

