
import {apiSlice} from "./apiSlice";
import {CONTACTS_URL} from "../util/urlconstants";


export const contactApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createContact: builder.mutation({
            query: (contact) => ({
                url: CONTACTS_URL,
                method: "POST",
                body: {...contact},
            }),
            //@ts-ignore
            invalidatesTags: ["contacts"],
        }),
        getContact: builder.query({
            query: (contactId) => ({
                url: `${CONTACTS_URL}/${contactId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),

        getMyContacts: builder.query({
            query: (userId) => ({
                url: `${CONTACTS_URL}/${userId}/myContacts`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        getAllContacts: builder.query({
            query: ({keyword}) => ({
                url: CONTACTS_URL,
                params: {keyword},
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            //@ts-ignore
            providesTags: ["contacts"],
        }),
        deleteContact: builder.mutation({
            query: (contactId) => ({
                url: `${CONTACTS_URL}/${contactId}`,
                method: "DELETE",
            })
        }),
        updateContact: builder.mutation(({
            query: (data) => ({
                url: `${CONTACTS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            //@ts-ignore
            invalidatesTags: ['contacts'], // clear cache the products
        })),

    })
})

export const {
    useCreateContactMutation,
    useGetContactQuery,
    useGetAllContactsQuery,
    useGetMyContactsQuery,
    useUpdateContactMutation,
    useDeleteContactMutation,
        } = contactApiSlice;