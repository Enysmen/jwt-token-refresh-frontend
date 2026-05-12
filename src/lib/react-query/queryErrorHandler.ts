import { Query} from "@tanstack/react-query";
import axios,{ AxiosError }  from "axios";
import {toast} from "react-hot-toast";
import {ZodError} from "zod";


export const axiosQueryErrorHandler = (error: AxiosError , query:Query<unknown, unknown, unknown, readonly unknown[]>) : void => {

    if (axios.isCancel(error)) 
    {
        return;
    }
    
    if (query.meta?.disableGlobalErrorHandler === true) 
    {
        return;
    }

    const isBackgroundFetch = query.state.data !== undefined;

    if (isBackgroundFetch)
    {
       return;
    }


    if (error.code === 'ECONNABORTED' ) 
    {
        toast.error("Request timeout: The server took too long to respond.", { id: "query-timeout-error" });
        return;
    }

    if (!error.response) 
    {
        toast.error("Network error: Please check your internet connection.", {id: "query-network-error"});
        return;
    }

    if (error.response.status >= 500)
    {
        toast.error("Server error: Please try again later.", { id: "query-server-error" });
        return;
    }

    if (error.response.status === 401) 
    {
        return;
    }

    if (error.response.status === 403) 
    {
        toast.error("Access denied: You do not have permission to access this resource.", { id: "query-access-denied-error" });
        return;
    }

    if (error.response.status === 404) 
    {   
        return;
    }

    toast.error("Failed to load data..", { id: "query-load-error" });

};



export const zodQueryErrorHandler = (error: ZodError , query: Query<unknown, unknown, unknown, readonly unknown[]>) : void => {
    if (query.meta?.disableGlobalErrorHandler === true) 
    {
        return;
    }

    console.error("Zod validation error:", { issues: error.issues , queryKey: query.queryKey });

    toast.error("Data validation error: Received data is in an unexpected format.", { id: "query-contract-error" });

    // kind logging problem

};