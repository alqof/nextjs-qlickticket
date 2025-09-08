import AxiosInstance from "./instance";

const eventServices = {
    // createEvent: (payload: IEvent)=>AxiosInstance.post("/event/create", payload),
    getEvent: (params?: string)=>AxiosInstance.get(`/event?${params}`),
    // getCategoriesById: (id: string)=>AxiosInstance.get(`/category/${id}`),
    // updateCategory: (id: string, payload:ICategory)=>AxiosInstance.put(`/category/${id}`, payload),
    // deleteCategory: (id: string)=>AxiosInstance.delete(`/category/${id}`),
}
export default eventServices;