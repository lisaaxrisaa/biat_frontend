// this file should handle the format of the budget table

// Here is inspo for the budget table format: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.goskills.com%2FExcel%2FResources%2FExcel-manage-travel-budget&psig=AOvVaw0igxRWTHhiT8gqM9zAOFED&ust=1740079175343000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCDv5260IsDFQAAAAAdAAAAABAE

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateBudgetItemMutation } from "../store/budgetSlice";

const BudgetForm = () => {
  const dispatch = useDispatch();
  //   the following will allow users to create their own categories for their budget tables
  const [categories, setCategories] = useState([]);
  const handleInputChange = () => {};
  const handleAddCategory = () => {};
  const handleDeleteCategory = () => {};
  const handleSubmit = (e) => {
    e.prevent();
  };
  return (
    <div>
        {/* change the header */}
        <h2>Budget Form</h2> 
        <table><thead>
            <tr>
                <th>Category</th>
                <th>Budgeted Amount</th>
                <th>Actual</th>
                <th>Difference</th>
            </tr>
            </thead></table>
    </div>
  )
};
