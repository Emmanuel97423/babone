import { coreModuleName } from "@reduxjs/toolkit/dist/query/core/module";
import { reactHooksModuleName } from "@reduxjs/toolkit/dist/query/react/module";
import { Api, BaseQueryFn, EndpointDefinitions, createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Products, Product, ProductVariant } from "../../types/interfaces/Product";
import type {Stock} from '@/types/interfaces/Stock'




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
        updateProductVariant: builder.mutation<Product, Partial<Product> & Pick<Product, 'id'>>({
            query:({id, ...patch})=>({
                url:`/products/variants/${id}`,
                method:'PATCH',
                body:patch,
            }),
            transformResponse:(response:{data:Product}, meta, arg)=> response.data,
            transformErrorResponse:(response:{status: string | number}, meta, arg)=> response.status,
            invalidatesTags:["Products"],

 // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

                async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`

                async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
            
        }),
        updateProductStock: builder.mutation<Stock, Partial<Stock> & Pick<Stock, 'id'>>({
            query:({id, ...patch})=>({
                url:`/products/stock/${id}`,
                method:'PATCH',
                body:patch,
            }),
            transformResponse:(response:{data:Stock}, meta, arg)=> response.data,
            transformErrorResponse:(response:{status: string | number}, meta, arg)=> response.status,
            invalidatesTags:["Products"],

 // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`

                async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},

      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`

                async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
            
        }),




})
});

export const {
    useGetProductListQuery,
    useGetProductQuery,
    useGetProductVariantQuery,
} = apiSlice;
