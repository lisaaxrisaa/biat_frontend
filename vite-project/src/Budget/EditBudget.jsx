// this file is responsible for editing budgets
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBudgetQuery,
  useUpdateBudgetMutation,
} from "../store/budgetSlice";

const EditBudget = () => {
  const { budgetId } = useParams();
  const navigate = useNavigate();
  const { data: budget } = useGetBudgetQuery(budgetId);
  const [updateBudget, { error }] = useUpdateBudgetMutation();
  if (error) {
    console.error("Unable to update budget, due to: ", error);
  }

  const [categories, setCategories] = useState(budget.categories);

  const handleEditCategory = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBudget = { ...budget, categories: categories.map((categories) => ({
      name: category.name, 
      budgeted: category.budgeted,
      actual: category.actual,
      difference: createFactory.budgeted - category.actual,
    }))
  };
  return (
    <div>
      <h2>Edit</h2>
      <form onSubmit={handleSubmit}>
        {categories.map((category, index) => (
          <div key={category.id}>
            <input
              type="text"
              value={category.name}
              onChange={(e) =>
                handleEditCategory(index, "name", e.target.value)
              }
            />
            <input
              type="number"
              value={category.budgeted}
              onChange={(e) =>
                handleEditCategory(index, "budgeted", e.target.value)
              }
            />
            <input
              type="number"
              value={category.actual}
              onChange={(e) =>
                handleEditCategory(index, "actual", e.target.value)
              }
            />
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default EditBudget;
