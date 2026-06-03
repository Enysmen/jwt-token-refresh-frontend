import type { Mutation } from "@tanstack/react-query";
import axios, { AxiosError} from "axios";
import { toast } from "react-hot-toast";
import { ZodError } from "zod";


type AppQuery = Mutation<unknown, unknown, unknown, unknown>;

type MutationErrorRole = {
    name: string;
    canHandle: (error: AxiosError , mutation: AppQuery) => boolean;
    handle: (error: AxiosError , mutation: AppQuery) => void;
};


const mutationErrorRule: MutationErrorRole[] = [
    {
        name: "cancelled-request",
        canHandle: (error) => axios.isCancel(error),
        handle: () => undefined
    },    
    {
        name: "disabled-global-handler",
        canHandle: (_error, mutation) => mutation.options.meta?.disableGlobalErrorHandler === true,
        handle: () => undefined
    },
    {
        name: "timeout",
        canHandle: (error) => error.code === 'ECONNABORTED',
        handle: () => toast.error("Request timeout: The server took too long to respond.", { id: "mutation-timeout-error" })
    },
    {
        name: "network-error",
        canHandle: (error) => !error.response,
        handle: () => toast.error("Network error: Please check your internet connection.", { id: "mutation-network-error" })
    },
    {
        name: "unauthorized",
        canHandle: (error) => error.response?.status === 401,
        handle: () => undefined
    },
    {
        name: "access-denied",
        canHandle: (error) => error.response?.status === 403,
        handle: () => toast.error("Access denied: You do not have permission to access this resource.", { id: "mutation-access-denied-error" })
    },
    {
        name: "not-found",
        canHandle: (error) => error.response?.status === 404,
        handle: () => toast.error("Resource not found: The requested resource could not be found.", { id: "mutation-not-found-error" })
    },
    {
        name: "conflict",
        canHandle: (error) => error.response?.status === 409,
        handle: (error) => {
            const conflictMessage = getErrorMessage(error.response) || "Conflict data: The request could not be processed due to a conflict.";
            if (typeof conflictMessage === "string") {
                toast.error(conflictMessage, {id: "mutation-conflict-error"});
                return;
            }
            toast.error("Conflict data: The request could not be processed due to a conflict.", { id: "mutation-conflict-error" });
        }
    }, 
    {
        name: "server-error",
        canHandle: (error) => (error.response?.status ?? 0) >= 500,
        handle: () => toast.error("Server error: Please try again later.", { id: "mutation-server-error" })
    },
    {
        name: "validation-error",
        canHandle: (error) => error.response?.status === 400 || error.response?.status === 422,
        handle: (error) => {
            const message = getErrorMessage(error.response) || "Bad request: The server could not understand the request due to invalid syntax.";
            toast.error(message, { id: "mutation-validation-error" });
            return;   
        }
    }
];


export const axiosMutationErrorHandler = (error: AxiosError, mutation: AppQuery): void => {
    const rule = mutationErrorRule.find(r => r.canHandle(error, mutation));

    if (rule) {

        rule.handle(error, mutation);

    } else {

        console.error("Unhandled mutation error:", { mutationKey: mutation.options.mutationKey, error }); // debug log

        toast.error("An unexpected error occurred. Please try again.", { id: "mutation-unexpected-error" });
    }

};


export const zodMutationErrorHandler = (error: ZodError , mutation:AppQuery ) : void => {

    if (mutation.options.meta?.disableGlobalErrorHandler) {
        return;
    }

    console.error("Contract error:", { mutationKey: mutation.options.mutationKey, issues: error.issues }); // debug log

    toast.error("Server returned invalid data.", { id: "mutation-contract-error" });
};



export const jsMutationErrorHandler = (error: Error, mutation: AppQuery): void => {
    if (mutation.options.meta?.disableGlobalErrorHandler === true)
    {
        return;
    }

    console.error("Unexpected error in mutation:", { mutationKey: mutation.options.mutationKey, error }); // debug log

    toast.error("An unexpected error occurred. Please try again.", { id: "mutation-js-error" });
}


export const unknownMutationErrorHandler = (error: unknown , mutation: AppQuery) : void => {
    if (mutation.options.meta?.disableGlobalErrorHandler) {
        return;
    }   

    console.error("Unknown error in mutation:", { mutationKey: mutation.options.mutationKey, error }); // debug log

    toast.error("An unexpected error occurred. Please try again.", { id: "mutation-unknown-error" });
};


const getErrorMessage = (data: unknown): string | undefined => {
    if (typeof data !== "object" || data === null) {
        return undefined;
    }

    if (!("message" in data)) {
        return undefined;
    }

    const message = data.message;

    if (typeof message !== "string" || message.trim().length === 0) {
        return undefined;
    }

    return message;
};


export const mutationErrorHandler = (error: unknown , mutation:AppQuery) : void => {

    if (axios.isAxiosError(error)) {
        axiosMutationErrorHandler(error, mutation);
        return;
    }

    if (error instanceof ZodError) {
        zodMutationErrorHandler(error, mutation);
        return;
    }

    if (error instanceof Error) {
        jsMutationErrorHandler(error, mutation);
        return;
    }

    unknownMutationErrorHandler(error, mutation);
};



