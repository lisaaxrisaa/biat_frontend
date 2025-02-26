import { api } from "./api";

const budgetSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: () => {
        return "/api/budget/user/budget";
      },
      transformResponse: (response) => {
        return response.map((budget) => {
          const updatedCategories = budget.categories.map((category) => {
            const amountLeftToBudget = category.budgeted - category.actual;
            return {
              ...category,
              amountLeftToBudget:
                amountLeftToBudget > 0 ? amountLeftToBudget : 0,
            };
          });
          return { ...budget, categories: updatedCategories };
        });
      },
    }),
    getBudget: builder.query({
      query: (id) => {
        return `/api/budget/user/budget/${id}`;
      },
    }),
    createBudget: builder.mutation({
      query: (newBudget) => ({
        url: "/api/budget/user/budget",
        method: "POST",
        body: newBudget,
      }),
    }),
    updateBudget: builder.mutation({
      query: ({ id, updatedBudget }) => ({
        url: `/api/budget/user/budget/${id}`,
        method: "PUT",
        body: updatedBudget,
      }),
    }),
    deleteBudget: builder.mutation({
      query: (id) => ({
        url: `/api/budget/user/budget/${id}`,
        method: "DELETE",
      }),
      onSuccess: () => {
        api.util.invalidateTags([{ type: 'Budget', id: 'LIST' }]); 
      }
    }),
    createCategory: builder.mutation({
      query: ({ id, newCategory }) => ({
        url: `/api/budget/user/budget/${id}/category`,
        method: "POST",
        body: newCategory,
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ budgetId, categoryId, updatedCategory }) => ({
        url: `/api/budget/user/budget/${budgetId}/category/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ budgetId, categoryId }) => ({
        url: `/api/budget/user/budget/${budgetId}/category/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBudgetsQuery,
  useGetBudgetQuery,
  useCreateBudgetMutation,
  useUpdateBudgetMutation,
  useDeleteBudgetMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = budgetSlice;
