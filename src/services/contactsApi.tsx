import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";
import { Contact } from "../models/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3006/" }),
  tagTypes:['Contact'],
  endpoints: (builder) => ({
    getContacts: builder.query<Contact[], void>({
      query: () => `contacts`,
      providesTags: ['Contact']
    }),
    getContact: builder.query<Contact, number>({
      query: (id) => `contacts/${id}`,
      providesTags: ['Contact']
    }),
    addContact: builder.mutation<void, Contact>({
      //void  چیزی که دریافت میشود
      //Contact چیزی که اضافه میکنیم
      query: (contact) => ({
        url: `/contacts`,
        method: "POST",
        body: contact,
        
        
      }),
      invalidatesTags: ['Contact']
    }),
    updateContact: builder.mutation<void, Contact>({
      //void  چیزی که دریافت میشود
      //Contact چیزی که اضافه میکنیم
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ['Contact']
    }),
    deleteContact: builder.mutation<void, number>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Contact']
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useLazyGetContactQuery,
  useLazyGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
