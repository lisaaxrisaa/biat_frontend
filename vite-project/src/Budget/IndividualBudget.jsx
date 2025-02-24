// this file should display a specific budget table
// with the option (buttons and links to) to edit, and save it or delete it

import React from "react";
import { useGetBudgetQuery } from "../store/budgetSlice";
import { useParams, Link } from "react-router-dom";

const IndividualBudget = () => {
  const { id } = useParams();
  const { data: budget, error } = useGetBudgetQuery(id);

  if (error) return <p>Error: {error.message}</p>;
  if (!budget) return <p>Budget not found</p>; // add a redirect back to budget list
  const totalBudgeted = budget.categories.reduce(
    (sum, category) => sum + parseFloat(category.budgeted || 0),
    0
  );
  return (
    <div>
      <h2>{budget.name}</h2>
      <p>Total: ${totalBudgeted}</p>
      <p>Currency: {budget.currency}</p>
      <p>Trip Type: {budget.tripType}</p>
      {/* <p>Remaining left to budget: {budget.remainingBalance}</p> */}
      <div>
        <h3>Categories</h3>
        {budget.categories.length > 0 ? (
          <ul>
            {budget.categories.map((category) => (
              <li key={category.id}>
                {category.name}: {category.budgeted}, {category.actual}
              </li>
            ))}
          </ul>
        ) : (
          <p>No categories.</p>
        )}
      </div>
      <Link to={`/budget/${id}/edit}`}>
        <button>Edit</button>
      </Link>
      <Link to={`/budget/${id}/delete`}>
        <button>Delete</button>
      </Link>
      <Link to={"/budget-list"}>Back to Budgets</Link>
    </div>
  );
};
export default IndividualBudget;

