import './style.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddRtransaction = () => {
  const navigate = useNavigate();

  return (
    <div className="container page">
      <h2>Add Recurring Transaction</h2>
      <form>
        <div className="form-group">
          <label>Amount</label>
          <input type="number" className="form-control" placeholder="Enter amount" />
        </div>
        <div className="form-group">
          <label>Frequency</label>
          <select className="form-control">
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <button type="submit" className="btn btn-info">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Back</button>
      </form>
    </div>
  );
};

export default AddRtransaction;
