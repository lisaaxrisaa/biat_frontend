// this file is responsible for deleting a budget as a whole and deleting different expenses within budgets
//  reminder: add deletion for individual items as well!!!!

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteBudgetMutation } from "../store/budgetSlice";

const DeleteBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteBudget] = useDeleteBudgetMutation();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you would like to delete this budget?"
    );
    if (!confirmed) return;
    try {
      await deleteBudget(id);
      navigate("/budget-list");
    } catch (error) {
      console.error("Unable to delete budget, due to:", error);
    }
  };

  return (
    <div>
      <h2>Delete</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
export default DeleteBudget;
