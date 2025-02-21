// this file is responsible for editing budgets
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
// import slice
const EditBudget = () => {
  const { budgetId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const budget = useSelector((state) =>
    state.budget.budgets.fine((budget) => budget.id === budgetId)
  );
  const [categories, setCategories] = useState(budget.categories);

  const HandleEditBudget = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };
  const handleSubmit = () => {
    const updatedBudget = { ...budget, categories };
    dispatch(updateBudget(updatedBudget));
    history.push(`/budget/${budgetId}`);
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
              onChange={(e) => handleEditCategory(index, 'name', e.target.value)}
            />
            <input
              type="number"
              value={category.budgeted}
              onChange={(e) => handleEditCategory(index, 'budgeted', e.target.value)}
            />
            <input
              type="number"
              value={category.actual}
              onChange={(e) => handleEditCategory(index, 'actual', e.target.value)}
            />
            <input
              type="number"
              value={category.difference}
              onChange={(e) => handleEditCategory(index, 'difference', e.target.value)}
              readOnly
            />
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
export default EditBudget;
