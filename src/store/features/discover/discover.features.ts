import { baseApi } from "../../baseApi";

export const discoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDiscover: builder.query({
      query: (params) => ({
        url: "/discover",
        params,
      }),
      // FIX: The cache key should stay the same for the SAME search terms,
      // but change if the name or gender changes.
      serializeQueryArgs: ({ queryArgs, endpointName }) => {
        const { name, gender } = queryArgs;
        return `${endpointName}-${name}-${gender}`; 
      },
      
      merge: (currentCache, newItemData, { arg }) => {
        // If no cursor, it's a fresh search or reset - replace all data
        if (!arg.cursor) {
          return newItemData;
        }
        
        // Append new data to existing array
        // We use a Set or filter to prevent duplicate IDs if the backend overlaps
        const existingIds = new Set(currentCache.data.map(item => item.id));
        const uniqueNewData = newItemData.data.filter(item => !existingIds.has(item.id));
        
        currentCache.data.push(...uniqueNewData);
        currentCache.nextCursor = newItemData.nextCursor;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetDiscoverQuery } = discoverApi;