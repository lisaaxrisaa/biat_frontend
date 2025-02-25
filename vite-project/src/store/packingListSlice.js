import { api } from './api';

const packingListSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getPackingLists: builder.query({
      query: () => `api/packing-list/user/packing-lists`,
      providesTags: ['PackingLists'],
    }),

    getPackingListItems: builder.query({
      query: (id) => `api/packing-list/user/packing-lists/${id}`,
      providesTags: (result, error, id) => [{ type: 'PackingLists', id }],
    }),

    createPackingList: builder.mutation({
      query: (newPackingList) => ({
        url: `api/packing-list/user/packing-lists`,
        method: 'POST',
        body: newPackingList,
      }),
      invalidatesTags: ['PackingLists'],
    }),

    addPackingItem: builder.mutation({
      query: ({ packingListId, item }) => ({
        url: `api/packing-list/user/packing-lists/${packingListId}/items`,
        method: 'POST',
        body: item,
      }),
      invalidatesTags: (result, error, { packingListId }) => [
        { type: 'PackingLists', id: packingListId },
      ],
    }),

    togglePackingItem: builder.mutation({
      query: ({ itemId, packed }) => ({
        url: `api/packing-list/user/packing-lists/items/${itemId}`,
        method: 'PUT',
        body: { packed },
      }),
      invalidatesTags: ['PackingLists'],
    }),

    editPackingItem: builder.mutation({
      query: ({ itemId, description }) => ({
        url: `api/packing-list/user/packing-lists/items/${itemId}`,
        method: 'PUT',
        body: { description },
      }),
      invalidatesTags: ['PackingLists'],
    }),

    deletePackingItem: builder.mutation({
      query: (itemId) => ({
        url: `api/packing-list/user/packing-lists/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PackingLists'],
    }),

    deletePackingList: builder.mutation({
      query: (id) => ({
        url: `api/packing-list/user/packing-lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PackingLists'],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetPackingListsQuery,
  useGetPackingListItemsQuery,
  useCreatePackingListMutation,
  useAddPackingItemMutation,
  useTogglePackingItemMutation,
  useEditPackingItemMutation,
  useDeletePackingItemMutation,
  useDeletePackingListMutation,
} = packingListSlice;

export default packingListSlice;
