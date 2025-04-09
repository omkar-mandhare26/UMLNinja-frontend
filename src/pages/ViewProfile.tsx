import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import DashboardNavbar from "../components/DashboardNavbar";

interface ProfileData {
    username: string;
    email: string;
    plan: string;
    credits: number;
    totalDiagrams: number;
}

interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

const ViewProfile: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loadingState, setLoadingState] = useState<LoadingState>({
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        document.title = "View Profile";
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.post("/user/view-profile");
                setProfile(response.data);
                setLoadingState({ isLoading: false, error: null });
            } catch (error) {
                setLoadingState({
                    isLoading: false,
                    error: "Failed to load profile data",
                });
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen">
            <DashboardNavbar queryDiagram={true} />

            <div className="container px-4 py-8 mx-auto">
                {loadingState.isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-500"></div>
                    </div>
                ) : loadingState.error ? (
                    <div className="text-center text-red-500">
                        {loadingState.error}
                    </div>
                ) : (
                    <div className="max-w-md pt-10 mx-auto">
                        <div className="p-6 rounded-lg shadow-lg bg-primary-500">
                            <h2 className="mb-4 text-2xl font-semibold">
                                User Profile
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Username:
                                    </span>
                                    <span>{profile?.username}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">Email:</span>
                                    <span>{profile?.email}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">Plan:</span>
                                    <span className="capitalize">
                                        {profile?.plan}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Credits:
                                    </span>
                                    <span>{profile?.credits}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="font-medium">
                                        Total Diagrams:
                                    </span>
                                    <span>{profile?.totalDiagrams}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewProfile;
