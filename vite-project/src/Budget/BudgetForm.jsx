// this file should handle the format of the budget table

// Here is inspo for the budget table format: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goskills.com%2FExcel%2FResources%2FExcel-manage-travel-budget&psig=AOvVaw0igxRWTHhiT8gqM9zAOFED&ust=1740079175343000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCDv5260IsDFQAAAAAdAAAAABAE

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateBudgetItemMutation } from "../store/budgetSlice";
import { v4 as uuidv4 } from "uuid";

const BudgetForm = () => {
  const dispatch = useDispatch();
  //   the following will allow users to create their own categories for their budget tables
  const [createBudget, { idLoading, error }] = useCreateBudgetItemMutation();

  const [categories, setCategories] = useState([
    {
      id: uuidv4(),
      name: "",
      budgeted: "",
      actual: "",
      difference: "",
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
      { id: uuidv4(), name: "", budgeted: "", actual: "", difference: "" },
    ]);
  };
  //   the following handleDelete deletes specific category from array of categories
  const handleDeleteCategory = (index) => {
    const newCategories = [
      ...categories.slice(0, index),
      ...categories.slice(index + 1),
    ];
    setCategories(newCategories);
  };
  const handleSubmit = async (e) => {
    e.prevent();
    const budgetData = { categories 
  }; 
  try {
    await createBudget(budgetData)
  } catch(error) {
    console.error("Could not create budget, due to:", error)
  }};
  return (
    <div>
      <h2>Create New Budget</h2>
      <form onSubmit={handleSubmit}>
        {categories.map((category), index) => (
            <div key={category.id}>
<input type="text" value={category.name} onChange={(e) => handleInputChange(index, "name", e.target.value)} placeholder="Category Name" required />
          <input type="number" value={category.budgeted} onChange={(e) => handleInputChange(index, "budgeted", e.target.value)} placeholder="Budgeted" />
          <input type="number" value={category.actual} onChange={(e) => handleInputChange(index, "actual", e.target.value)} placeholder="Actual" />
          <button type="button" onClick={() => handleDeleteCategory(index)}>Delete Category</button>
            </div>
        )}
        <button type="button" onClick={handleAddCategory}>Add Category</button>
        <button type="submit" disabled={isLoading}>{isLoading ? "Saving change..." : "Save"}</button>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Budgeted Amount</th>
            <th>Actual</th>
            <th>Difference</th>
          </tr>
        </thead>
      </table>
      </form>
      {error && <p>Error: {error.message}</p>}
      <Link to="/budget-list">
      <button>Back to Budgets</button></Link>
    </div>
  );
};
