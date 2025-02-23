// this file should display a specific budget table
// with the option (buttons and links to) to edit, and save it or delete it

import React from "react";
import { useGetBudgetQuery } from "../store/budgetSlice";
import { useParams, Link } from "react-router-dom";

const IndividualBudget = () => {
  const { budgetId } = useParams();
  const { data: budget } = useGetBudgetQuery(budgetId);

  if (!budget) return <p>Budget not found</p>; // add a redirect back to budget list
  return (
    <div>
      <h2>{budget.name}</h2>
      <p>Total: {budget.amount}</p>
      <p>Currency: {budget.currency}</p>
      <p>Trip Type: {budget.tripType}</p>
      <p>Remaining left to budget: {budget.remainingBalance}</p>
      <div>
        <h3>Expenses</h3>
        {budget.expenses.length > 0 ? (
          <ul>
            {budget.expenses.map((expense) => (
              <li key={expense.id}>{expense.name}: {expense.amount}</li>
            ))}
          </ul>
        ) : (
          <p>No expenses.</p>
        )}
      </div>
      <Link to={`/budget/${budgetId}/edit}`}>
        <button>Edit</button>
      </Link>
      <Link to={`/budget/${budgetId}/delete`}>
        <button>Delete</button>
      </Link>
    </div>
  );
};
export default IndividualBudget;
