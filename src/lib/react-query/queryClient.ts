import axios from "axios";
import { ZodError } from "zod";

import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";

import { axiosQueryErrorHandler, zodQueryErrorHandler } from "./queryErrorHandler";
import { axiosMutationErrorHandler, zodMutationErrorHandler } from "./mutationErrorHandler"; 
import { shouldRetryQuery , queryRetryDelay } from "./retryPolicy"


export const queryCache = new QueryCache({
    onError: (error, query) : void  => {
        if (axios.isAxiosError(error)) 
        {
            axiosQueryErrorHandler(error, query);
        }

        if (error instanceof ZodError) 
        {
            zodQueryErrorHandler(error, query);
        }
    },
});


export const mutationCache = new MutationCache({
    onError: (error, _variables, _onMutateResult, mutation) => {

        if (axios.isAxiosError(error)) 
        {
            axiosMutationErrorHandler(error, mutation);
        }

        if (error instanceof ZodError) 
        {
            zodMutationErrorHandler(error, mutation);
        }

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
