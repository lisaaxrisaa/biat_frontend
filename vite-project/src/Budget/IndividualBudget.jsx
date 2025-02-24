// this file should display a specific budget table
// with the option (buttons and links to) to edit, and save it or delete it

import React from 'react';
import { useGetBudgetQuery } from '../store/budgetSlice';
import { useParams, Link } from 'react-router-dom';

const IndividualBudget = () => {
  const { budgetId } = useParams(); // LF- use id not budgetID, it needs to fetch a SINGLE budget, not all
  const { data: budget } = useGetBudgetQuery(budgetId); // LF- same here

  if (!budget) return <p>Budget not found</p>; // add a redirect back to budget list
  return (
    <div>
      <h2>{budget.name}</h2>
      <p>Total: {budget.amount}</p>
      <p>Currency: {budget.currency}</p>
      <p>Trip Type: {budget.tripType}</p>
      <p>Remaining left to budget: {budget.remainingBalance}</p>{' '}
      {/*LF- remaining balance doesn't exist in the backend, you need to update schema and router if you want to include it */}
      <div>
        <h3>Expenses</h3>{' '}
        {/*LF- You named the schema category in the backend, need to change all the expense to categories or else nothing below will work  */}
        {budget.expenses.length > 0 ? (
          <ul>
            {budget.expenses.map((expense) => (
              <li key={expense.id}>
                {' '}
                {/*LF- category.id */}
                {expense.name}: {expense.amount}
                {/*LF- If this is for a category then amount won't work here because there is no 'amount' in the category schema, 'amount is under Budget. You need to use budgeted and actual, so --  {category.name} - Budgeted: ${category.budgeted}, Actual: ${category.actual}*/}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses.</p>
        )}
      </div>
      <Link to={`/budget/${budgetId}/edit}`}>
        {' '}
        {/*LF- change to id*/}
        <button>Edit</button>
      </Link>
      <Link to={`/budget/${budgetId}/delete`}>
        {/*LF- change to id*/}
        <button>Delete</button>
      </Link>
    </div>
  );
};
export default IndividualBudget;
