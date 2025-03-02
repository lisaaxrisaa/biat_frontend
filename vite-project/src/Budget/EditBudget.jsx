import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useGetBudgetQuery,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
} from '../store/budgetSlice';
import './edit-budget.css';

const EditBudget = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: budget, error, isLoading, refetch } = useGetBudgetQuery(id);

  useEffect(() => {
    document.body.classList.add('edit-budget-page');
    return () => {
      document.body.classList.remove('edit-budget-page');
    };
  }, []);

  if (isLoading) return <p>Loading budget...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const [categories, setCategories] = useState([]);
  const categoriesRef = useRef(false);

  useEffect(() => {
    if (budget && !categoriesRef.current) {
      setCategories(budget.categories);
      categoriesRef.current = true;
    }
  }, [budget]);

  const [tripName, setTripName] = useState(budget?.name || '');
  const [tripType, setTripType] = useState(budget?.tripType || '');
  const [currency, setCurrency] = useState(budget?.currency || '');
  const [date, setDate] = useState(budget?.date?.slice(0, 10) || '');

  const [updateBudget] = useUpdateBudgetMutation();
  const [deleteBudget] = useDeleteBudgetMutation();

  const handleEditCategory = (index, field, value) => {
    const updatedCategories = [...categories];
    const updatedCategory = { ...updatedCategories[index] };
    updatedCategory[field] = value;
    updatedCategories[index] = updatedCategory;
    setCategories(updatedCategories);
  };
  const handleDeleteCategory = (index) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleAddCategory = async () => {
    const newCategory = {
      name: '',
      budgeted: '',
      actual: '',
    };

    setCategories([...categories, newCategory]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      console.error('Budget ID is missing.', error);
      return;
    }

    const updatedBudget = {
      id,
      name: tripName,
      tripType: tripType,
      currency: currency.trim(),
      amount: parseFloat(budget.amount),
      date: date,
      categories: categories.map((category) => ({
        id: category.id || undefined,
        name: category.name,
        budgeted: parseFloat(category.budgeted) || 0,
        actual: parseFloat(category.actual) || 0,
        difference: parseFloat(category.budgeted) - parseFloat(category.actual),
      })),
    };

    try {
      await updateBudget({ id, updatedBudget }).unwrap();
      await refetch();
      navigate(`/budget/${id}`);
    } catch (err) {
      console.error('Failed to update budget:', err);
    }
  };
  const handleDeleteBudget = async () => {
    const confirmed = window.confirm(
      'Are you sure you would like to delete this budget?'
    );
    if (!confirmed) return;

    try {
      await deleteBudget(id).unwrap();
      alert('Budget has been deleted successfully!');
      navigate('/budget');
    } catch (error) {
      console.error('Unable to delete the budget, due to: ', error);
      alert('Unable to delete budget!');
    }
  };

  return (
    <div className="edit-budget-container">
      <button className="back-to-list-btn" onClick={() => navigate('/budget')}>
        Back to Budgets
      </button>

      <h2>Edit Budget</h2>
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
            placeholder="Enter Currency"
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
              onChange={(e) =>
                handleEditCategory(index, 'name', e.target.value)
              }
              placeholder="Category Name"
              required
            />
            <input
              type="number"
              value={category.budgeted}
              onChange={(e) =>
                handleEditCategory(index, 'budgeted', e.target.value)
              }
              placeholder="Budgeted"
            />
            <input
              type="number"
              value={category.actual}
              onChange={(e) =>
                handleEditCategory(index, 'actual', e.target.value)
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

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={handleDeleteBudget} className="delete-budget-btn">
        Delete Budget
      </button>
    </div>
  );
};

export default EditBudget;
