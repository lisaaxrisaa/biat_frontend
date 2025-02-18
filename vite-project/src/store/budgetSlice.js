import { api } from "./api";

const budgetSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getBudget: builder.query({
      query: () => {
        return "/api/budget/user/budget";
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    getBudgetItem: builder.query({
      query: (id) => {
        return `/api/budget/user/budget/${id}`;
      },
    }),
    createBudgetItem: builder.query({
      query: (newBudgetItem) => ({
        url: "/api/budget/user/budget",
        method: "POST",
        body: newBudgetItem,
      }),
    }),
    updateBudgetItem: builder.mutation({
      query: ({ id, updatedBudgetItem }) => ({
        url: `/api/budget/user/budget/${id}`,
        method: "PUT",
        body: updatedBudgetItem,
      }),
    }),
    deleteBudgetItem: builder.mutation({
      query: (id) => ({
        url: `/api/budget/user/budget/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBudgetQuery,
  useGetBudgetItemQuery,
  useCreateBudgetItemMutation,
  useUpdateBudgetItemMutation,
  useDeleteBudgetItemMutation,
} = budgetSlice;
