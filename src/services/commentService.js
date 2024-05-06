import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getComments() {
    return apiClient.get("/comment");
  },
  getCommentsByFilm(id) {
    return apiClient.get(`/comment/film/${id}`);
  },
  getComment(id) {
    return apiClient.get(`/comment/${id}`);
  },
  createComment(commentData) {
    return apiClient.post("/comment", commentData);
  },
  updateComment(id, commentData) {
    return apiClient.put(`/comment/${id}`, commentData);
  },
  deleteComment(id) {
    return apiClient.delete(`/comment/${id}`);
  },
};
