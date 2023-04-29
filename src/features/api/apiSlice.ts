import { coreModuleName } from "@reduxjs/toolkit/dist/query/core/module";
import { reactHooksModuleName } from "@reduxjs/toolkit/dist/query/react/module";
import { Api, BaseQueryFn, EndpointDefinitions, createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Products } from "../../interfaces/Product";
export const  apiSlice = createApi({

    reducerPath: "/api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1420" }),
//     prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        getProductList: builder.query<Products[], void>({
            query:()=>({
                url:"/products",
                method:"GET"
            })
        }),          
})
})

export const {
    useGetProductListQuery
} = apiSlice;
