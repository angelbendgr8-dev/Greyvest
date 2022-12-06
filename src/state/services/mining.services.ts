import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getUrl} from '../../helpers/constants';
// console.log(getUrl());
// Define a service using a base URL and expected endpoints
export const MiningApi = createApi({
  reducerPath: 'MiningApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getUrl(),
    prepareHeaders: (headers, {getState}) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().userAuth.token;
      // headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Accept', 'application/json');
      console.log(token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getMiningPlans: builder.query({
      query: () => ({
        url: '/users/get/mining/plans',
        method: 'get',
      }),
    }),
    getInvestmentPlans: builder.query({
      query: () => ({
        url: '/users/get/investment/plans',
        method: 'get',
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetInvestmentPlansQuery,
  useGetMiningPlansQuery,
} = MiningApi;
