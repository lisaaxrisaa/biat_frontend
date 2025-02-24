// this file should handle the format of the budget table

// replacing uuid with Date.now, uuid kept breaking code and causing errors

// Here is inspo for the budget table format: https://www.goskills.com/blobs/blogs/761/a9863aed-f2f7-4049-8f52-f76496738b8d.png

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateBudgetMutation,
  useGetBudgetsQuery,
} from "../store/budgetSlice";
import { v4 as uuidv4 } from "uuid";

const BudgetForm = () => {
  //   the following will allow users to create their own categories for their budget tables
  const navigate = useNavigate();
  const [createBudget, { isLoading, error }] = useCreateBudgetMutation();
  const { refetch } = useGetBudgetsQuery();
  const [tripName, setTripName] = useState("");
  const [tripType, setTripType] = useState("");
  const [currency, setCurrency] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState([
    {
      id: uuidv4(),
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
      { id: uuidv4(), name: "", budgeted: "", actual: "" },
    ]);
  };
  //   the following handleDelete deletes specific category from array of categories
  const handleDeleteCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };
  // the following will render the leftover amount to budget
  const calculateLeftover = () => {
    let totalBudgeted = 0;
    let totalActual = 0;
    categories.forEach((category) => {
      totalBudgeted += parseFloat(category.budgeted || 0);
      totalActual += parseFloat(category.actual || 0);
    });
    return totalBudgeted - totalActual;
  };
  const calculateAmount = () => {
    return categories.reduce(
      (sum, category) => sum + parseFloat(category.budgeted || 0),
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = new Date(date);
    const amount = calculateAmount();
    const budgetData = {
      name: tripName,
      tripType: tripType,
      currency: currency,
      date: formattedDate,
      categories: categories.map((category) => ({
        name: category.name, 
        budgeted: category.budgeted,
        actual: category.actual,
        difference: category.budgeted - category.actual,
      }))
    };
    try {
      await createBudget(budgetData).unwrap();
      alert("Budget saved.");
      refetch();
      navigate("/budget");
    } catch (error) {
      console.error("Could not create budget, due to:", error.message);
      alert("Unable to save the budget!");
    }
  };
  return (
    <div>
      <h2>Create New Budget</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            placeholder="Trip Name"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            placeholder="Trip Type"
            required
          />
        </div>
        <div>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            placeholder="Enter currency"
            required
          />
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        {categories.map((category, index) => (
          <div key={category.id}>
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              placeholder="Category Name"
              required
            />
            <input
              type="number"
              value={category.budgeted}
              onChange={(e) =>
                handleInputChange(index, "budgeted", e.target.value)
              }
              placeholder="Budgeted"
            />
            <input
              type="number"
              value={category.actual}
              onChange={(e) =>
                handleInputChange(index, "actual", e.target.value)
              }
              placeholder="Actual"
            />
            <button type="button" onClick={() => handleDeleteCategory(index)}>
              Delete Category
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>

        <div>
          <h3>Leftover Budget: ${calculateLeftover()}</h3>
        </div>
        <div>
          <h3>Total Amount: ${calculateAmount()}</h3>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Budget"}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
      <Link to="/budget">
        <button>Back to Budget List</button>
      </Link>
    </div>
  );
};
export default BudgetForm;
