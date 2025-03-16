import './style.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddIncome = () => {
  const navigate = useNavigate();

  return (
    <div className="container page">
      <h2>Add Income</h2>
      <form>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" className="form-control" placeholder="Enter amount" />
        </div>
        <div className="form-group">
          <label>Source</label>
          <input type="text" className="form-control" placeholder="Enter income source" />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default AddIncome;
