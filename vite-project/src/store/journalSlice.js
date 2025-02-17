import { api } from "./api";

const journalSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getJournals: builder.query({
      query: () => {
        return "/api/journal/user/journal";
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    getJournal: builder.query({
      query: (id) => {
        return `/api/journal/user/journal/${id}`;
      },
    }),
    createEntry: builder.mutation({
      query: (newEntry) => ({
        url: "/api/journal/user/journal",
        method: "POST",
        body: newEntry,
      }),
    }),
    updateEntry: builder.mutation({
      query: ({ id, updatedEntry }) => ({
        url: `/api/journal/user/journal/${id}`,
        method: "PUT",
        body: updatedEntry,
      }),
    }),
    deleteEntry: builder.mutation({
      query: (id) => ({
        url: `/api/journal/user/journal/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetJournalsQuery,
  useGetJournalQuery,
  useCreateEntryMutation,
  useUpdateEntryMutation,
  useDeleteEntryMutation,
} = journalSlice;

export default journalSlice;
