import axios, { type AxiosResponse } from "axios";
import { type InternalAxiosRequestConfig, type AxiosError } from "axios";
import { authApi } from "./authApi";

const API_BASE_URL = "http://localhost:3000/api"; // mock API base URL 

let isRefreshingToken = false; // flag to indicate if token refresh is in progress
let queueRefreshTokenRequests: Array<{ resolve: () => void, reject: (error: AxiosError) => void }> = []; // queue to hold requests while token is being refreshed

// add flag to axios 
declare module 'axios' {
    export interface AxiosRequestConfig {
        _retry?: boolean; // to store the original request for retrying after token refresh
        isRefreshingRequest?: boolean; // flag to indicate if this request is the one that triggered token refresh
        isLogoutRequest?: boolean; // flag to indicate if this request is a logout request
        antiCache?: boolean; // flag to indicate if request should be anti-cached
    }
}

export const httpClientConfig = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
    },
});


export const processQueue = (error: AxiosError | null) => {
    queueRefreshTokenRequests.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    queueRefreshTokenRequests = []; // clear the queue
}




httpClientConfig.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers['Accept-Language'] = localStorage.getItem('lang') || 'en';
        config.headers['X-App-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';
        config.headers['X-Platform'] = 'web';
        // Disable caching requests
        if (config.method === 'get' && config.antiCache == true) {
            config.params = { ...config.params || {}, _t: Date.now() };
        }

        //globalStartLoadingStore();
        return config;
    },
    (error: AxiosError) => {

        if (axios.isCancel(error)) 
        {
            return Promise.reject(error);
        }

        if (!error.config) 
        {
            return Promise.reject(error);
        }

        if (error.code === 'ERR_BAD_OPTION_VALUE' || error.code === 'ERR_BAD_OPTION') {
            console.error("Axios configuration error:", error.message);
        }

        //globalStopLoadingStore();
        return Promise.reject(error);
    }

);



httpClientConfig.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    async (error: AxiosError) => {


        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }


        if (!error.config) {
            return Promise.reject(error);
        }

        const originalRequest = error.config as InternalAxiosRequestConfig;


        //globalStopLoadingStore();
        if (error.response?.status !== 401) {
            return Promise.reject(error);
        }

        if (!originalRequest) {
            return Promise.reject(error);
        }

        if (originalRequest.isRefreshingRequest) {
            isRefreshingToken = false;
            processQueue(error);
            return Promise.reject(error);
        }

        // Infinite loop protection: If we've already tried THIS request, we give up.
        if (originalRequest._retry) {
            return Promise.reject(error);
        }

        //if who update token is in progress, we queue the request and wait for the token to be refreshed
        if (isRefreshingToken) {
            return new Promise((resolve, reject) => {
                queueRefreshTokenRequests.push({ resolve: () => resolve(httpClientConfig(originalRequest)), reject });
            }).catch((err) => {
                return Promise.reject(err);
            });
        }

        if (originalRequest.isLogoutRequest) {
            return Promise.reject(error);
        }

        // if we get fist 401, we try to refresh the token
        if (error.response?.status === 401) {
            originalRequest._retry = true;
            isRefreshingToken = true;

            try {
                await authApi.refreshToken(); // call your token refresh function here
                isRefreshingToken = false;
                processQueue(null); // process the queue of requests waiting for token refresh
                return await httpClientConfig(originalRequest); // retry the original request
            }
            catch (refreshError ) {
                isRefreshingToken = false;
                processQueue(refreshError as AxiosError); // reject all queued requests with the refresh error
                // add logout logic route 
                return Promise.reject(refreshError);
            }
        }



    }

);