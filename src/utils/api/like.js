import { apiRequest } from "./api";

export const likeDesign = async (id) => {
    return await apiRequest("POST", `/api/designs/${id}/like`);
  };