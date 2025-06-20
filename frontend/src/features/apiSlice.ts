
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../util/urlconstants";

const baseUrl =
    process.env.NODE_ENV === "development" ? '' : process.env.REACT_APP_API_URL;

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL
});

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ["products", "orders", "users"],
    endpoints: (builder) =>({

    })
})