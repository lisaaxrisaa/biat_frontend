// this file should handle the format of the budget table

// replacing uuid with Date.now, uuid kept breaking code and causing errors

// Here is inspo for the budget table format: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goskills.com%2FExcel%2FResources%2FExcel-manage-travel-budget&psig=AOvVaw0igxRWTHhiT8gqM9zAOFED&ust=1740079175343000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCDv5260IsDFQAAAAAdAAAAABAE

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateBudgetMutation } from "../store/budgetSlice";

const BudgetForm = () => {
  //   the following will allow users to create their own categories for their budget tables
  const [createBudget, { isLoading, error }] = useCreateBudgetMutation();

  const [categories, setCategories] = useState([
    {
      id: Date.now(),
      name: "",
      budgeted: "",
      actual: "",
    },
  ]);
  // the following allows the user to update/change their budget and budget items
  const handleInputChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };
  const handleAddCategory = () => {
    setCategories([
      ...categories,
      { id: Date.now(), name: "", budgeted: "", actual: "" },
    ]);
  };
  //   the following handleDelete deletes specific category from array of categories
  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const budgetData = { categories };
    try {
      await createBudget(budgetData);
    } catch (error) {
      console.error("Could not create budget, due to:", error);
    }
  };
  return (
    <div>
      <h2>Create New Budget</h2>
      <form onSubmit={handleSubmit}>
        {/* Added table structure for better layout */}
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Budgeted</th>
              <th>Actual</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category.id}>
                {/* Inputs inside table cells */}
                <td>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    placeholder="Category Name"
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={category.budgeted}
                    onChange={(e) =>
                      handleInputChange(index, "budgeted", e.target.value)
                    }
                    placeholder="Budgeted"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={category.actual}
                    onChange={(e) =>
                      handleInputChange(index, "actual", e.target.value)
                    }
                    placeholder="Actual"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(index)}
                  >
                    Delete Category
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Buttons */}
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>

      {error && <p>Error: {error.message}</p>}

      <Link to="/budget-list">
        <button>Back to Budgets</button>
      </Link>
    </div>
  );
};
export default BudgetForm;
