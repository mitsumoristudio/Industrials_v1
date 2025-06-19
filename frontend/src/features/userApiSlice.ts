
import {apiSlice} from "./apiSlice";
import{USERS_URL} from "../urlconstants";


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: "POST",
                body: data,
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
        verifyEmail: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/verifyEmail`,
                method: "POST",
                body: {...data},
            })
        }),
        forgotPassword: builder.mutation({
            query: (data: any) => ({
                url: `${USERS_URL}/forgotPassword`,
                method: "POST",
                body: {...data},
            })
        }),
        resetPassword: builder.mutation(({
            // @ts-ignore
            query: (data: any, token: any) => ({
                url: `${USERS_URL}/resetPassword/${token}`,
                method: "POST",
                body: data,
            })
        })),

        getAllUsers: builder.query({
            query: () => ({
                url: USERS_URL,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            providesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "DELETE",
            }),
        }),
        getUserDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["users"]
        })
    })
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useProfileMutation,
    useResetPasswordMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useDeleteUserMutation,
    useGetAllUsersQuery,
    useGetUserDetailsQuery,
    useUpdateUserMutation, } = userApiSlice;