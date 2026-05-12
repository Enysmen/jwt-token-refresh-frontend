import type { Mutation } from "@tanstack/react-query";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";




const getErrorMessage = (response: AxiosResponse): string | undefined => {
    const data = response.data;

    if (typeof data !== "object" || data === null) 
    {
            return undefined;
    }
    
    if (!("message" in data ))
    {
        return undefined;
    }

    const message = data.message;

    if (typeof message !== "string" || message.trim().length === 0)
    {
        return undefined;
    }

    return message;
    
};


export const axiosMutationErrorHandler = (error: AxiosError, mutation: Mutation<unknown, unknown, unknown, unknown>): void => {

    if (axios.isCancel(error)) {
        return;
    }

    if (mutation.options.meta?.disableGlobalErrorHandler === true) {
        return;
    }


    if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout: The server took too long to respond.", { id: "mutation-timeout-error" });
        return;
    }

    if (!error.response) {
        toast.error("Network error: Please check your internet connection.", { id: "mutation-network-error" });
        return;
    }

    if (error.response.status >= 500) {
        toast.error("Server error: Please try again later.", { id: "mutation-server-error" });
        return;
    }


    if (error.response.status === 400 || error.response.status === 422) 
    {
        const message = getErrorMessage(error.response) || "Bad request: The server could not understand the request due to invalid syntax.";
        toast.error(message, { id: "mutation-validation-error" });
        return;
    }


    if (error.response.status === 401) {
        return;
    }

    if (error.response.status === 403) {
        toast.error("Access denied: You do not have permission to access this resource.", { id: "mutation-access-denied-error" });
        return;
    }

    if (error.response.status === 404) {
        toast.error("Resource not found: The requested resource could not be found.", { id: "mutation-not-found-error" });
        return;
    }


    if (error.response.status === 409) {
        const conflictMessage = getErrorMessage(error.response) || "Conflict data: The request could not be processed due to a conflict.";
        if (typeof conflictMessage === "string") {
            toast.error(conflictMessage, {id: "mutation-conflict-error"});
            return;
        }

        toast.error("Conflict data: The request could not be processed due to a conflict.", { id: "mutation-conflict-error" });
        return;
    }


    toast.error("Failed to perform operation.", { id: "mutation-operation-error" });

};



export const zodMutationErrorHandler = (error: ZodError, mutation: Mutation<unknown, unknown, unknown, unknown>): void => {
        if (mutation.options.meta?.disableGlobalErrorHandler === true)
        {
            return;
        }

        if (error.issues.length > 0) 
        {
            console.error("Zod validation error:", { issues: error.issues, mutationKey: mutation.options.mutationKey });
        }

        toast.error("Server returned invalid response.", { id: "mutation-contract-error" });

}