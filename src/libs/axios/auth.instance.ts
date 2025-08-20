import { IActivation, IRegister } from "../types/auth";
import AxiosInstance from "./instance";


const authInstance = {
    register: (payload: IRegister)=>AxiosInstance.post("/auth/register", payload),
    activation: (payload: IActivation)=>AxiosInstance.post("/auth/activation", payload)
    // login: (payload: LoginInput)=>instance.post("/auth/login", payload)
}
export default authInstance;