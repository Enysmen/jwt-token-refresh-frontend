
import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import {mutationErrorHandler} from "./mutationErrorHandler";

import {queryErrorHandler, } from "./queryErrorHandler";

import { shouldRetryQuery , queryRetryDelay } from "./retryPolicy"


export const queryCache = new QueryCache({
    onError: (error, query) : void  => {
        queryErrorHandler(error, query);
    },
});


export const mutationCache = new MutationCache({
    onError: (error, _variables, _onMutateResult, mutation) => {

        mutationErrorHandler(error, mutation);
    }
});


export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: shouldRetryQuery,
            retryDelay: queryRetryDelay,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            staleTime: 1 * 60 * 1000, // 1 minutes  
            gcTime: 5 * 60 * 1000, // 5 minutes
        },
        mutations: {
            retry: false,
        },
    },
    mutationCache,
    queryCache
});
