import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'fakeApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Services'],
    endpoints: builder => ({
        getServices: builder.query({
            query: () => 'get-all-services',
            providesTags: ['Services']
        }),

        addCustomer: builder.mutation({
            query: (service) => ({
                url: 'get-ticket',
                method: 'POST',
                body: service
            }),
            invalidatesTags: ['Services']
        })
    })
})

export const { useGetServicesQuery, useAddCustomerMutation } = apiSlice