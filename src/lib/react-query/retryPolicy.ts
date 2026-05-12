import axios from "axios";
import {ZodError} from "zod";



const MAX_RETRY_QUERY_COUNT = 2;

export const shouldRetryQuery = (failureCount : number , error: unknown ) : boolean => {

        if (failureCount >= MAX_RETRY_QUERY_COUNT) 
        {
            return false;
        }

        if (error instanceof ZodError) 
        {
            return false;
        }   

        if (axios.isCancel(error)) 
        {
            return false;
        }

        if (axios.isAxiosError(error)) 
        {

            if (!error.response) 
            {
                return true;
            }

            if (error.code === "ECONNABORTED") 
            {
                return true;
            }

            if (error.response.status === 400) 
            {
                return false;

            }

            if (error.response?.status === 401 ) 
            {
                return false;
            }

            if (error.response.status === 403) 
            {
                return false;
            }


            if (error.response.status === 404) 
            {
                return false;
            }

            if (error.response.status === 409) 
            {
                return false;
            }

            if (error.response.status === 422) 
            {
                return false;
            }

            if (error.response.status === 429) 
            {
                return true;
            }

            if (error.response.status >= 500 )  
            {
                return true;
            }

        }


        return false;
};




export const queryRetryDelay = (attemptIndex : number) : number => {

        return  Math.min(1000 * 2 ** attemptIndex, 10_000);
};

