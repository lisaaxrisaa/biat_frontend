import { api } from "./api";

const journalSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getJournals: builder.query({
      query: () => {
        return "/api/user/journal";
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    getJournal: builder.query({
      query: (id) => {
        return `/api/user/journal/${id}`;
      },
    }),
    createEntry: builder.mutation({
      query: (newEntry) => ({
        url: "/api/user/journal",
        method: "POST",
        body: newEntry,
      }),
    }),
    updateEntry: builder.mutation({
      query: ({ id, updatedEntry }) => ({
        url: `/api/user/journal/${id}`,
        method: "PUT",
        body: updatedEntry,
      }),
    }),
    deleteEntry: builder.mutation({
      query: (id) => ({
        url: `/api/user/journal${id}`,
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
