import { Query} from "@tanstack/react-query";
import axios,{ AxiosError }  from "axios";
import {toast} from "react-hot-toast";
import {ZodError} from "zod";


type AppQuery = Query<unknown, unknown, unknown, readonly unknown[]>;

type QueryErrorRole = {
    name: string;
    canHandle: (error: AxiosError , query: AppQuery) => boolean;
    handle: (error: AxiosError , query: AppQuery) => void;
};


const queryErrorRule: QueryErrorRole[] = [
    {
        name: "cancelled-request",
        canHandle: (error) => axios.isCancel(error),
        handle: () => undefined
    },
    {
        name: "disabled-global-handler",
        canHandle: (_error, query) => query.meta?.disableGlobalErrorHandler === true,
        handle: () => undefined
    },
    {
        name: "background-fetch",
        canHandle: (_error, query) => query.state.data !== undefined,
        handle: () => undefined
    },
    {
        name: "timeout",
        canHandle: (error) => error.code === 'ECONNABORTED',
        handle: () => toast.error("Request timeout: The server took too long to respond.", { id: "query-timeout-error" })
    },
    {
        name: "network-error",
        canHandle: (error) => !error.response,
        handle: () => toast.error("Network error: Please check your internet connection.", {id: "query-network-error"})
    },
    {
        name: "unauthorized",
        canHandle: (error) => error.response?.status === 401,
        handle: () => undefined
    },
    {
        name: "access-denied",
        canHandle: (error) => error.response?.status === 403,
        handle: () => toast.error("Access denied: You do not have permission to access this resource.", { id: "query-access-denied-error" })
    },
    {
        name: "not-found",
        canHandle: (error) => error.response?.status === 404,
        handle: () => toast.error("Not found: The requested resource could not be found.", { id: "query-not-found-error" })
    },
    {
        name: "server-error",
        canHandle: (error) => (error.response?.status ?? 0) >= 500,
        handle: () => toast.error("Server error: Please try again later.", { id: "query-server-error" })
    }, 
    
];

export const axiosQueryErrorHandler = (error: AxiosError , query:AppQuery) : void => {
    const rule = queryErrorRule.find(r => r.canHandle(error, query));

    if (rule) {
        rule.handle(error, query);
    } else {
        toast.error("An unexpected error occurred. Please try again.", { id: "query-unexpected-error" });
    }
};



export const zodQueryErrorHandler = (error: ZodError , query:AppQuery ) : void => {

    if (query.meta?.disableGlobalErrorHandler) {
        return;
    }

    console.error("Contract error:", { queryKey: query.queryKey, issues: error.issues }); // debug log

    toast.error("Server returned invalid data.", { id: "query-contract-error" });
};



export const jsQueryErrorHandler = (error: Error , query:AppQuery) : void => {
    if (query.meta?.disableGlobalErrorHandler) {
        return;
    }

    console.error("Unexpected error in query:", { queryKey: query.queryKey, error }); // debug log

    toast.error("An unexpected error occurred. Please try again.", { id: "query-js-error" });
}; 

export const unknownQueryErrorHandler = (error: unknown , query:AppQuery) : void => {
    if (query.meta?.disableGlobalErrorHandler) {
        return;
    }   

    console.error("Unknown error in query:", { queryKey: query.queryKey, error }); // debug log

    toast.error("An unexpected error occurred. Please try again.", { id: "query-unknown-error" });
};


export const queryErrorHandler = (error: unknown , query:AppQuery) : void => {

    if (axios.isAxiosError(error)) {
        axiosQueryErrorHandler(error, query);
        return;
    }

    if (error instanceof ZodError) {
        zodQueryErrorHandler(error, query);
        return;
    }

    if (error instanceof Error) {
        jsQueryErrorHandler(error, query);
        return;
    }

    unknownQueryErrorHandler(error, query);
};
