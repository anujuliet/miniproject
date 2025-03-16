import './style.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
  const navigate = useNavigate();

  return (
    <div className="container page">
      <h2>Add Expense</h2>
      <form>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" className="form-control" placeholder="Enter amount" />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" className="form-control" placeholder="Enter expense category" />
        </div>
        <button type="submit" className="btn btn-danger">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default AddExpense;
