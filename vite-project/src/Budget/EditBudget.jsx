// this file is responsible for editing budgets
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetBudgetQuery,
  useUpdateBudgetMutation,
} from '../store/budgetSlice';

const EditBudget = () => {
  const { id } = useParams();
  console.log("Getting budget with id: ", id)
  const navigate = useNavigate();
  

  const { data: budget, error, isLoading } = useGetBudgetQuery(id);
  
 
  if (isLoading) return <p>Loading budget...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const [categories, setCategories] = useState([]);
  
  
  useEffect(() => {
    if (budget) {
      setCategories(budget.categories);
    }
  }, [budget]);
  
  
  const [updateBudget] = useUpdateBudgetMutation();

  const handleEditCategory = (index, field, value) => {
    const updatedCategories = [...categories];
    updatedCategories[index][field] = value;
    setCategories(updatedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBudget = {
      ...budget,
      categories: categories.map((category) => ({
        name: category.name,
        budgeted: category.budgeted,
        actual: category.actual,
        difference: category.budgeted - category.actual, 
      })),
    };


    try {
      await updateBudget(updatedBudget).unwrap(); 
      navigate(`/budget/${id}`); 
    } catch (err) {
      console.error('Failed to update budget:', err);
    }
  };

  return (
    <div>
      <h2>Edit Budget</h2>
      <form onSubmit={handleSubmit}>
        {categories.map((category, index) => (
          <div key={category.id}>
            <input
              type="text"
              value={category.name}
              onChange={(e) =>
                handleEditCategory(index, 'name', e.target.value)
              }
            />
            <input
              type="number"
              value={category.budgeted}
              onChange={(e) =>
                handleEditCategory(index, 'budgeted', e.target.value)
              }
            />
            <input
              type="number"
              value={category.actual}
              onChange={(e) =>
                handleEditCategory(index, 'actual', e.target.value)
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