import { createContext } from "react";

interface AuthContextType {
    user: { id: string; email: string } | null;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
