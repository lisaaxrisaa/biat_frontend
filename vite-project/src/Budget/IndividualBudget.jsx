// this file should display a specific budget table
// with the option (buttons and links to) to edit, and save it or delete it

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import edit budget
// import delete budget

const IndividualBudget = () => {
  const { budgetId } = useParams();
  const budget = useSelector((state) =>
    state.budget.budgets.find((budget) => budget.id === budgetId)
  );
  if (!budget) return <p>Budget not found</p>;
  return (
    <div>
      <h2>{budget.name}</h2>
      {/* <p></p> */}
      {/* <p></p> */}
      {/* <BudgetForm budgetId={budgetId}/> */}
      {/* editbudget */}
      {/* deletebudget */}
    </div>
  );
};
export default IndividualBudget;
