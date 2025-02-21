// this file should list all budgets, only overviews not the information.

import React from "react";
import { Link } from "react-router-dom";
import { useGetBudgetQuery } from "../store/budgetSlice";

const BudgetList = () => {
  const { data, error, isLoading } = useGetBudgetQuery();
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
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
