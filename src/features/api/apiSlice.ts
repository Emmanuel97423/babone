import { coreModuleName } from "@reduxjs/toolkit/dist/query/core/module";
import { reactHooksModuleName } from "@reduxjs/toolkit/dist/query/react/module";
import { Api, BaseQueryFn, EndpointDefinitions, createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Products, Product, ProductVariant } from "../../types/interfaces/Product";




export const  apiSlice = createApi({

    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:1420/api" }),
//     prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getProductList: builder.query<Products[], void>({
            query:()=>({
                url:"/products",
                method:"GET"
            })
        }),    
        getProduct: builder.query<Product, void>({
            query:(id)=>({
                url:`/products/${id}`,
                method:"GET"
            })
        }),  
         getProductVariant: builder.query<Product, string>({
            query:(variantId)=>({
                url:`/products/variants/${variantId}`,
                method:"GET"
            })
        }),  




})
});

export const {
    useGetProductListQuery,
    useGetProductQuery,
    useGetProductVariantQuery,
} = apiSlice;
