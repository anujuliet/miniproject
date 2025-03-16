import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="home">
      {/* Currency Settings Button */}
      <div className="top-right">
        <button className="btn btn-outline-primary small-btn">Change Currency Settings</button>
      </div>

      {/* Graph Section */}
      <div className="middle-graph">
        <h3>Monthly Overview</h3>
        {/* Add your graph component here */}
      </div>

      {/* Action Buttons */}
      <div className="bottom-actions">
        <button className="btn btn-primary m-2" onClick={() => navigate('/addIncome')}>Add Income</button>
        <button className="btn btn-secondary m-2" onClick={() => navigate('/addExpense')}>Add Expense</button>
        <button className="btn btn-info m-2" onClick={() => navigate('/addRtransaction')}>Add Recurring Transaction</button>
        <button className="btn btn-warning m-2">Add Budget</button>
        <button className="btn btn-success m-2">View Transaction History</button>
      </div>
    </div>
  );
};

export default Home;
