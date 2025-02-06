import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/user";
axios.defaults.withCredentials = true;

export const register = async (email: string, password: string) => {
    return axios.post("/signup", { email, password });
};

export const login = async (email: string, password: string) => {
    return axios.post("/login", { email, password });
};

export const logout = async () => {
    return axios.post("/logout");
};

export const getUser = async (token: string) => {
    return axios.get("/me", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
