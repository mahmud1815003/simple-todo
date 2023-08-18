import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_server,
    }),
    reducerPath: 'todo-api',
    tagTypes: ['todo'],
    endpoints: (builder) => ({
        postTodo: builder.mutation({
            query: (data) => {
                return {
                    url: '/todo',
                    method: 'POST',
                    body: data,
                }
            },
            invalidatesTags: ['todo']
        }),
        getTodo: builder.query({
            query: () => {
                return '/todo/all';
            },
            providesTags: ['todo']
        }),
    })
});

export const {usePostTodoMutation, useGetTodoQuery} = api;

export default api;