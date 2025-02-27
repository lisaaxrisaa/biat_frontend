// this file should display a specific budget table
// with the option (buttons and links to) to edit, and save it or delete it

import React, { useEffect } from "react";
import { useGetBudgetQuery } from "../store/budgetSlice";
import { useParams, Link } from "react-router-dom";
import "./individual-budget.css";

const IndividualBudget = () => {
  const { id } = useParams();
  const { data: budget, error, isLoading } = useGetBudgetQuery(id);

  useEffect(() => {
    document.body.classList.add("individual-budget-page");
    return () => {
      document.body.classList.remove("individual-budget-page");
    };
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  if (!budget) return <p>Budget not found</p>; // add a redirect back to budget list

  const totalBudgeted = budget.categories.reduce(
    (sum, category) => sum + parseFloat(category.budgeted || 0),
    0
  );
  return (
    <div>
      {/* Back to Budget List Button - Outside of Content Container */}
      <Link to="/budget">
        <button className="back-to-list-btn">Back to Budgets</button>
      </Link>

      <div className="individual-budget-container">
        {/* Title Section */}
        <div className="individual-budget-header">
          <h1 className="individual-budget-title">{budget.name}</h1>
          <p className="individual-budget-info">
            <span>Currency: {budget.currency}</span>
            <span>Trip Type: {budget.tripType}</span>
            <span>Date: {new Date(budget.date).toLocaleDateString()}</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="individual-budget-content">
          <div className="individual-budget-category-table">
            <div className="category-table-header">
              <div className="category-name">Category</div>
              <div className="category-budget">Budgeted</div>
              <div className="category-actual">Actual</div>
              <div className="category-difference">Difference</div>
            </div>

            {budget.categories.length > 0 ? (
              budget.categories.map((category) => (
                <div className="category-row" key={category.id}>
                  <div className="category-name">{category.name}</div>
                  <div className="category-budget">${category.budgeted}</div>
                  <div className="category-actual">${category.actual}</div>
                  <div className="category-difference">${category.difference}</div>
                </div>
              ))
            ) : (
              <p>No categories.</p>
            )}
          </div>
        </div>

        {/* Total Budget Section at the Bottom */}
        <div className="total-budget">
          <p>Total Budget: ${totalBudgeted}</p>
        </div>

        {/* Edit Budget Button */}
        <Link to={`/edit-budget/${id}`}>
          <button>Edit Budget</button>
        </Link>
      </div>
    </div>
  );
};

export default IndividualBudget;
