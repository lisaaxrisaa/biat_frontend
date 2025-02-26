// this file should list all budgets, only overviews not the information.

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetBudgetsQuery } from "../store/budgetSlice";
import "./budget-list.css";

const BudgetList = () => {
  const { data: budgets, error, isLoading, refetch } = useGetBudgetsQuery();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("budget-page");
    return () => {
      document.body.classList.remove("budget-page");
    };
  }, []);

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  const renderBudgets = () => {
    if (!budgets || budgets.length === 0) {
      return (
        <div>
          <p>No budgets</p>
        </div>
      );
    }
    return budgets.map((budget) => (
      <div key={budget.id} className="budget-entry-box">
        <h3>{budget.name}</h3>
        <p>{budget.description}</p>
        <Link to={`/budget/${budget.id}`}>
          <button>View</button>
        </Link>
      </div>
    ));
  };

  return (
    <div className="budget-background">
      <div className="budget-content-wrapper">
        <h2>Your Budgets</h2>

        <Link to="/create-budget">
          <button>Create a New Budget</button>
        </Link>

        {isLoading && <p>Loading Budgets...</p>}
        {error ? (
          <p>
            Could not fetch budgets, due to: {error.message || "Unknown error"}
          </p>
        ) : (
          renderBudgets()
        )}
      </div>
    </div>
  );
};

export default BudgetList;
