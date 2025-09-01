import AxiosInstance from "./instance";
import { ICategory } from "../types/category";


const categoryServices = {
    createCategory: (payload: ICategory)=>AxiosInstance.post("/category/create", payload),
    getCategories: (params?: string)=>AxiosInstance.get(`/category?${params}`),
    getCategoriesById: (id: string)=>AxiosInstance.get(`/category/${id}`),
    updateCategory: (id: string, payload:ICategory)=>AxiosInstance.put(`/category/${id}`, payload),
    deleteCategory: (id: string)=>AxiosInstance.delete(`/category/${id}`),
}
export default categoryServices;