import { getSession } from "next-auth/react";
import axios from "axios";
import environment from "../config/environtment";
import { addToast } from "@heroui/toast";
import { ISession } from "../types/auth";


const AxiosInstance = axios.create({
  baseURL: environment.BACKEND_API,
  timeout: 1000 * 10, //10 second
  headers: { "Content-Type": "application/json" }
});

AxiosInstance.interceptors.request.use(
    async (request) => { 
        const session: ISession|null = await getSession();
        if(session && session.accessToken){
            request.headers.Authorization = `Bearer ${session.accessToken}`
        }
        return request;
    },
    error => Promise.reject(error),
)

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
  }else{
    alert(error.response?.status)
  }
  throw error;
});

export default AxiosInstance;