import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import React, { useRef } from "react";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        try {
            const response = await axios.post(
                "http://localhost:3000/user/login",
                {
                    email,
                    password,
                }
            );
            alert(response.data.message);
            navigate("/home");
        } catch (error) {
            if (error instanceof AxiosError)
                alert(error.response?.data?.errMessage || "Error Occurred");
            else alert("Unknown Error Occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen font-heading">
            <div className="w-full max-w-md p-6 shadow-xl rounded-2xl bg-gray-50">
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-center text-primary-500">
                        Login to UMLNinja
                    </h1>
                    <form className="space-y-4" onSubmit={loginHandler}>
                        <input
                            ref={emailRef}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-md border-primary-200"
                        />
                        <input
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-md border-primary-200"
                        />
                        <button
                            type="submit"
                            className="w-full p-3 font-semibold text-white transition duration-200 rounded-md bg-info hover:bg-info-hover"
                        >
                            Login
                        </button>
                    </form>
                    <div className="text-center">
                        <button
                            className="text-info hover:underline"
                            onClick={() => {
                                navigate("/signup");
                            }}
                        >
                            Create New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
