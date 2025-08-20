import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import axios from "axios";
import environment from "../config/environtment";
import { addToast } from "@heroui/toast";


interface CustomSession extends Session {
    accessToken?: string;
}

const AxiosInstance = axios.create({
    baseURL: environment.API_URL,
    timeout: 1000 * 10,
    headers: { "Content-Type": "application/json" }
});

// AxiosInstance.interceptors.request.use(
//     async (request) => { 
//         const session: CustomSession|null = await getSession();
//         if(session && session.accessToken){
//             request.headers.Authorization = `Bearer ${session.accessToken}`
//         }
//         return request;
//     },
//     error => Promise.reject(error),
// )

AxiosInstance.interceptors.response.use(undefined, async (error) => {
  if (error.response?.status === 409) {
    addToast({
        title: "Register Failed!",
        description: "Username and email already exists",
        variant: "bordered",
        color: "warning",
    });
    // await refreshToken();
    // return AxiosInstance(error.config); // Retry original request
  }
  throw error;
});

export default AxiosInstance;