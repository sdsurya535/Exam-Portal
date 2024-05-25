import BaseUrl from "../api/BaseUrl";
import axiosInstance from "./intercepter";

export class CategoryService {
  addCategory = (category) => {
    return axiosInstance.post(`${BaseUrl}/category/`, category);
  };

  getAllCagegories = () => {
    return axiosInstance.get(`${BaseUrl}/category/`);
  };
}

const categoryService = new CategoryService();
export default categoryService;
