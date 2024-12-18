import { apiRequest } from "./api";


export const addComment = async (id, content) => {
    return await apiRequest("POST", `/api/designs/${id}/comment`, { content });
  };