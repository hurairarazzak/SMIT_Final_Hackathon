import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (data) => API.post("/user/login", data);
export const signup = (data) => API.post("/user/signup", data);
export const getItems = () => API.get("/api/items");
export const addItem = (data) => API.post("/api/items", data);
export const updateItem = (id, data) => API.put(`/api/items/${id}`, data);
export const deleteItem = (id) => API.delete(`/api/items/${id}`);
