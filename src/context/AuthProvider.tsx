import { useEffect, useState } from "react";
import { getUser, login, logout, register } from "../utils/auth";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUser(token)
                .then((res) => setUser(res.data.user))
                .catch(() => setUser(null));
        }
    }, []);

    const loginUser = async (email: string, password: string) => {
        const response = await login(email, password);
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        setUser(user);
    };

    const registerUser = async (email: string, password: string) => {
        await register(email, password);
    };

    const logoutUser = async () => {
        await logout();
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loginUser, registerUser, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
