import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

interface UserPlan {
    plan: string;
    credits: number;
}

const BuyCredits: React.FC = () => {
    const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        plan: "Pro",
        utrNumber: "",
    });

    useEffect(() => {
        const fetchUserPlan = async () => {
            try {
                const response = await axiosInstance.post("/user/get-my-plan");
                setUserPlan(response.data);
            } catch (error) {
                console.error("Error fetching user plan:", error);
            }
        };

        fetchUserPlan();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(
                "/user/request-credits",
                formData
            );
            alert(response.data.message || "Request submitted successfully!");
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("Failed to submit request. Please try again.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-white bg-background font-body">
            <DashboardNavbar queryDiagram={true} />
            <div className="flex flex-1 p-6 md:flex-row">
                <div className="w-full p-6 md:w-1/2 bg-primary-500">
                    <h2 className="mb-4 text-2xl font-bold">Buy Credits</h2>
                    {userPlan && (
                        <div className="mb-4">
                            <p>Current Plan: {userPlan.plan}</p>
                            <p>Credits: {userPlan.credits}</p>
                        </div>
                    )}
                    <img
                        src="/paymentQR.jpeg"
                        alt="Payment QR"
                        className="mb-4 w-96 h-8w-96"
                    />
                    <div className="mb-4">
                        <p>UPI ID: omkar026@axl</p>
                        <p>Bank Account Number: 1234567890</p>
                        <p>IFSC Code: ABCD0123456</p>
                        <p>Account Holder Name: Omkar Mandhare</p>
                    </div>
                </div>
                <div className="w-full p-6 md:w-1/2 bg-secondary">
                    <h2 className="mb-4 text-2xl font-bold">Payment Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md bg-primary-600 border-primary-400"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md bg-primary-600 border-primary-400"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Plan</label>
                            <select
                                name="plan"
                                value={formData.plan}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md bg-primary-600 border-primary-400"
                            >
                                <option value="Pro">Pro - Rs. 149</option>
                                <option value="Professional">
                                    Professional - Rs. 499
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">
                                UTR Number (or Transaction ID)
                            </label>
                            <input
                                type="text"
                                name="utrNumber"
                                value={formData.utrNumber}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded-md bg-primary-600 border-primary-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-3 font-semibold text-white transition duration-200 rounded-md bg-info hover:bg-info-hover"
                        >
                            Request Credits
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default BuyCredits;
