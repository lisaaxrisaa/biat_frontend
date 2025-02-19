// this file should list all budgets, only overviews not the information.

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const BudgetList = () => {
  const budgets = useSelector((state) => state.budget.budgets);
  const location = useLocation;

  useEffect(() => {
    // refetch if needed, like in journalList.jsx
  }, [location]);

  const handleViewClick = (budgetId) => {
    history.push(`/budget/${budgetId}`);
  };
  const renderBudgets = () => {
    if (!budgets || budgets.length === 0) {
      return (
        <div>
          {" "}
          <p>No budgets available</p>
          <Link to="/create-budget">
            <button>Create a New Budget</button>
          </Link>
        </div>
      );
    }
    return budgets.map((budget) => (
      <div key={budget.id}>
        <h3>{budget.name}</h3>
        <p>{budget.description}</p>
        <Link to={`/budget/${budget.id}`}>
          <button>View Budget</button>
        </Link>
      </div>
    ));
  };
  return (
    <div>
      <h2>Your Budgets</h2>
      <Link to="/create-budget">
        <button>Create New Budget</button>
      </Link>
      {renderBudgets()}
    </div>
  );
};

export default BudgetList;
