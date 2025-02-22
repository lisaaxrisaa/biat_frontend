// this file should list all budgets, only overviews not the information.

import React from "react";
import { Link } from "react-router-dom";
import { useGetBudgetQuery } from "../store/budgetSlice";

const BudgetList = () => {
  const { data: budgets, error, isLoading } = useGetBudgetQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Your Budgets</h2>
      <Link to="/create-budget">
        <button>Create a New Budget</button>
      </Link>
      {budgets && budgets.length > 0 ? (
        budgets.map((budget) => (
          <div key={budget.id}>
            <h3>{budgets.name}</h3>
            <p>{budget.description}</p>
            <Link to={`/budget/${budget.id}`}>
              <button>View</button>
            </Link>
          </div>
        ))
      ) : (
        <p>No Budgets.</p>
      )}
    </div>
  );
};

export default BudgetList;
