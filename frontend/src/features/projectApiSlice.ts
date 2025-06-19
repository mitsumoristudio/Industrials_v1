
import {PROJECT_URL, UPLOADS_URL,} from "../util/urlconstants";
import {apiSlice} from "./apiSlice";

// For Asynchronous request
// injectEndpoints- will make a request to our backend API to get all of the projects. keepUnsusedDataFor keeps the data in cache for 5 secs

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProjects: builder.query({
            query: ({keyword}) => ({
                url: PROJECT_URL,
                params: {keyword},
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            //@ts-ignore
            providesTags: ["projects"],
        }),
        getProjectsPagination: builder.query({
            query: ({pageNumber, keyword}) => ({
                url: PROJECT_URL,
                params:{pageNumber, keyword},
                method: "GET",
            }),
            keepUnusedDataFor: 5,
            //@ts-ignore
            providesTags: ["projects"],
        }),
       getProject: builder.query({
          query: (id) => ({
              url: `${PROJECT_URL}/${id}`,
              method: "GET",
          }),
           keepUnusedDataFor: 30,
       }),
        getMyProject: builder.query({
            query: (userId) => ({
                url: `${PROJECT_URL}/${userId}/myProjects`,
                method: "GET",
            }),
            keepUnusedDataFor: 5,
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: PROJECT_URL,
                method: 'POST',
                body: {...data},
            }),
           // keepUnusedDataFor: 5,
            //@ts-ignore
            invalidatesTags: ['projects'], // add invalidatesTag as Products for the refresh to work
        }),
        updateProject: builder.mutation(({
            query: (data: any) => ({
                url: `${PROJECT_URL}/${data.id}`,
                method: "PUT",
                body: data,
            }),
            //@ts-ignore
            invalidatesTags: ['projects'], // clear cache the products
        })),

        uploadProjectImage: builder.mutation({
            query: (data) => ({
                url: `${UPLOADS_URL}`,
                method: "POST",
                body: data,
            }),
        }),

        deleteProject: builder.mutation({
            query: (projectId) => ({
                url: `${PROJECT_URL}/${projectId}`,
                method: "DELETE",
            })
        }),
        getTopProjects: builder.query({
            query: () => ({
                url: `${PROJECT_URL}/top`,
            }),
            keepUnusedDataFor: 5,
        })

    })
});

export const {
    useGetAllProjectsQuery,
    //@ts-ignore
    useGetProjectsPaginationQuery,
    useGetMyProjectQuery,
    useGetProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useUploadProjectImageMutation,
    useGetTopProjectsQuery,} = projectsApiSlice;