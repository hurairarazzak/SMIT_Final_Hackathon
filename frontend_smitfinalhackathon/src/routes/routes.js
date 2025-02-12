const devUrl = "http://localhost:4000/";
const prodUrl = "https://smit-final-hackathon-backend-livid.vercel.app/"; 

export const BASE_URL = prodUrl;

export const AppRoutes = {
    // Auth Routes
    login: BASE_URL + "api/v1/auth/login",
    register: BASE_URL + "api/v1/auth/register",

    // User Routes
    getMyInfo: BASE_URL + "api/v1/user/get-my-info",
    updateUser: BASE_URL + "api/v1/auth/user",
    
    // Send Password to Email
    sendLoginPassword: BASE_URL + "api/v1/user/send-email",
};