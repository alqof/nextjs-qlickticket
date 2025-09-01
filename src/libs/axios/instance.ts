import { getSession, signOut } from "next-auth/react";
import axios from "axios";
import environment from "../config/environtment";
import { addToast } from "@heroui/toast";
import { ISession } from "../types/auth";


function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AxiosInstance = axios.create({
  baseURL: environment.BACKEND_API,
  timeout: 1000 * 10, //10 second
  headers: { "Content-Type": "application/json" }
});

AxiosInstance.interceptors.request.use(async (request) => { 
    const session: ISession|null = await getSession();
    if(session && session.accessToken){
      request.headers.Authorization = `Bearer ${session.accessToken}`
      // console.log(`Bearer ${session.accessToken}`);
    }
    return request;
  },
  error => Promise.reject(error),
)

AxiosInstance.interceptors.response.use((response) => response, async (error) => {
// AxiosInstance.interceptors.response.use(undefined, async (error) => {
  const status = error.response?.status;

  // Handle 409: register conflict
  if (status === 409) {
    if (typeof window !== "undefined") {
      alert({
        title: "Register Failed!",
        description: "Username and email already exists",
        variant: "bordered",
        color: "warning",
      });
    }
  }
  // Handle 403: session expired, auto logout
  else if (status === 403) {
    if (typeof window !== "undefined") {
      addToast({
        title: "Session Timeout!",
        description: "Please re-login again to access all features",
        variant: "solid",
        color: "warning",
      });
      await sleep(5000);
      await signOut({ callbackUrl: "/auth/login" });
    }
  }
  // Other error: show toast (optional)
  else {
    if (typeof window !== "undefined") {
      alert({
        title: "Error",
        description: `Status: ${status}`,
        variant: "bordered",
        color: "danger",
      });
    } else {
      // Server-side: log only
      console.log("Axios error status:", status);
    }
  }
  throw error;
});

export default AxiosInstance;