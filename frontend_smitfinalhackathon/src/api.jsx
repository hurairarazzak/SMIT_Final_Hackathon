import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const login = (data) => API.post("/user/login", data);
export const signup = (data) => API.post("/user/signup", data);
export const getItems = () => API.get("/api/items");
export const addItem = (data) => API.post("/api/items", data);
