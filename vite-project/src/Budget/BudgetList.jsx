// this file should list all budgets, only overviews not the information.

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetBudgetQuery } from "../store/budgetSlice";

const BudgetList = () => {
  const { data: budgets, error, isLoading, refetch } = useGetBudgetQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const renderBudgets = () => {
    if (!budgets || budgets.length === 0) {
      return (
        <div>
          <p>No budgets</p>
          <Link to={"/create-budget"}>
            <button>Create a New</button>
          </Link>
        </div>
      );
    }
    return budgets.map((budget) => (
      <div key={budget.id}>
        <h3>{budgets.name}</h3>
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
      <Link to="/create-budget">
        <button>Create a New Budget</button>
      </Link>
      {isLoading ? <p>Loading Budgets...</p> : renderBudgets()}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default BudgetList;
