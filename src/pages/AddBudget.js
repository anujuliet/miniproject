
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const AddBudget = () => {
  const navigate = useNavigate();

  return (
    <div className="container page">
      <h2>Add Budget</h2>
      <form>
        <div className="form-group">
          <label>Budget Amount</label>
          <input type="number" className="form-control" placeholder="Enter budget amount" />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" className="form-control" placeholder="Enter category name" />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default AddBudget;
