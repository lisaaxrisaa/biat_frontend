// this file should list all budgets, only overviews not the information.

import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGetBudgetsQuery } from '../store/budgetSlice';

const BudgetList = () => {
  const { data: budgets, error, isLoading, refetch } = useGetBudgetsQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const renderBudgets = () => {
    if (!budgets || budgets.length === 0) {
      return (
        <div>
          <p>No budgets</p>
          <Link to="/create-budget">
            <button>Create a New</button>
          </Link>
        </div>
      );
    }
    return budgets.map((budget) => (
      <div key={budget.id}>
        <h3>{budget.name}</h3>
        <p>{budget.description}</p>
        <Link to={`/budget/${budget.id}`}>
          <button>View</button>
        </Link>
      </div>
    ));
  };

  return (
    <div>
      <h2>Your Budgets</h2>
      {/* LF- 'Create' button shouldn't only show once, it should always show so users can continue to create new budgets 
      
      Remove the ternary operator and just leave:
        <Link to="/create-budget">
        <button>Create a New Budget</button>
      </Link>
      
      and 

      {isLoading && <p>Loading Budgets...</p>}
      {error && <p>Could not fetch budgets: {error.message || "Unknown error"}</p>}
      {renderBudgets()}
      */}
      {budgets && budgets.length === 0 ? (
        <Link to="/create-budget">
          <button>Create a New Budget</button>
        </Link>
      ) : (
        renderBudgets()
      )}
      {isLoading && <p>Loading Budgets...</p>}
      {error && (
        <p>
          Could not fetch budgets, due to: {error.message || 'Unknown error'}
        </p>
      )}
    </div>
  );
};

export default BudgetList;
