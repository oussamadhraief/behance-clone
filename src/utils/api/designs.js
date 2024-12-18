// api/designs/createDesign.js
import { apiRequest } from "./api";

export const createDesign = async (formData) => {
  return await apiRequest("POST", "/api/designs", formData, true);
};

export const getAllDesigns = async () => {
    return await apiRequest("GET", `/api/designs`);
  };

  
export const getMyDesigns = async () => {
    return await apiRequest("GET", `/api/designs/my`);
  };

  export const getDesignById = async (id) => {
    return await apiRequest("GET", `/api/designs/${id}`);
  };

  export const deleteDesign = async (id) => {
    return await apiRequest("DELETE", `/api/designs/${id}`);  
  }
