import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../utils/axiosInstance";
import AuthContext from "./AuthContext";
import User from "../types/User";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const queryClient = useQueryClient();

    const { data: user = null, isLoading } = useQuery<User | null>({
        queryKey: ["me"],
        queryFn: async () => {
            try {
                const response = await axiosInstance.post("/user/me");
                return response.data;
            } catch (error) {
                console.error("Error fetching user:", error);
                return null;
            }
        },
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: async ({
            email,
            password,
        }: {
            email: string;
            password: string;
        }) => {
            const response = await axiosInstance.post("/user/login", {
                email,
                password,
            });
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["me"], data);
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });

    const logout = async () => {
        await axiosInstance.post("/user/logout");
        queryClient.setQueryData(["me"], null);
    };

    const login = async (email: string, password: string) => {
        await loginMutation.mutateAsync({ email, password });
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: !!user, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
