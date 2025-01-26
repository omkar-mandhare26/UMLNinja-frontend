import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import CodeBracketSquare from "../icons/CheckCircle";
import Check from "../icons/Check";
import X from "../icons/X";
import authZodSchema from "../validators/auth.schema";

const Signup: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        upperCase: false,
        lowerCase: false,
        number: false,
        specialChar: false,
    });
    const [otpVerifyComp, setOtpVerifyComp] = useState(false);

    const diagrams = [
        "Class",
        "Object",
        "Use Case",
        "Sequence",
        "Activity",
        "State Chart",
        "Component",
        "Deployment",
    ];

    const validatePassword = (pw: string) => {
        setPasswordValidation({
            length: pw.length >= 8,
            upperCase: /[A-Z]/.test(pw),
            lowerCase: /[a-z]/.test(pw),
            number: /\d/.test(pw),
            specialChar: /[^a-zA-Z0-9]/.test(pw),
        });
    };

    const sendOTP = async () => {
        const email = emailRef.current?.value || "";
        try {
            const response = await axios.post(
                "http://localhost:3000/user/send-otp",
                { email }
            );
            alert(response.data.message || "OTP sent successfully!");
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (axios.isAxiosError(error)) {
                    alert(
                        (error as AxiosError<{ message: string }>).response
                            ?.data?.message || "Failed to send OTP."
                    );
                } else {
                    alert("Failed to send OTP.");
                }
            } else {
                alert("Failed to send OTP.");
            }
        }
    };

    const validateInputs = async () => {
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        const validator = authZodSchema.safeParse({ email, password });

        if (!validator.success) {
            alert("Invalid Inputs");
            return;
        }

        await sendOTP();
        setOtpVerifyComp(true);
    };

    const OTPVerification: React.FC = () => {
        const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
        const [timer, setTimer] = useState<number>(300);
        const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
        const containerRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    containerRef.current &&
                    !containerRef.current.contains(event.target as Node)
                ) {
                    setOtpVerifyComp(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        useEffect(() => {
            const interval = setInterval(() => {
                setTimer((prev) => Math.max(prev - 1, 0));
            }, 1000);
            return () => clearInterval(interval);
        }, []);

        const handleResend = async () => {
            if (timer > 0) {
                alert(
                    `Please wait ${Math.ceil(
                        timer / 60
                    )} minutes before resending OTP.`
                );
                return;
            }
            await sendOTP();
            setOtp(Array(6).fill(""));
            setTimer(300);
        };

        const verifyOTP = async () => {
            const email = emailRef.current?.value || "";
            const password = passwordRef.current?.value || "";
            const otpCode = otp.join("");

            try {
                const response = await axios.post(
                    "http://localhost:3000/user/verify-otp",
                    {
                        email,
                        password,
                        otp: otpCode,
                    }
                );
                alert(response.data.message || "OTP verified successfully!");
                setOtpVerifyComp(false);
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    alert(
                        (error as AxiosError<{ message: string }>).response
                            ?.data?.message || "OTP verification failed."
                    );
                } else {
                    alert("OTP verification failed.");
                }
            }
        };

        const handleChange = (value: string, index: number) => {
            if (/\d/.test(value) || value === "") {
                const newOtp = [...otp];
                newOtp[index] = value;
                setOtp(newOtp);

                if (value && index < 5) {
                    inputsRef.current[index + 1]?.focus();
                }
            }
        };

        const handleKeyDown = (
            e: React.KeyboardEvent<HTMLInputElement>,
            index: number
        ) => {
            if (e.key === "Backspace" && otp[index] === "" && index > 0) {
                inputsRef.current[index - 1]?.focus();
            }
        };

        const formatTime = (time: number) => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${minutes}:${seconds.toString().padStart(2, "0")}`;
        };

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                <div
                    ref={containerRef}
                    className="bg-white p-6 rounded-2xl shadow-lg w-[400px] space-y-4"
                >
                    <h2 className="text-xl font-bold text-center text-black font-heading">
                        OTP Verification
                    </h2>
                    <div className="flex justify-center space-x-2 text-black">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputsRef.current[index] = el)}
                                type="text"
                                maxLength={1}
                                value={value}
                                onChange={(e) =>
                                    handleChange(e.target.value, index)
                                }
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-10 h-10 text-lg text-center border rounded-lg border-secondary focus:outline-none focus:ring-2 focus:ring-info"
                            />
                        ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Your OTP will expire in {formatTime(timer)}</span>
                        <button
                            onClick={handleResend}
                            className="text-info hover:underline"
                        >
                            Resend OTP
                        </button>
                    </div>
                    <button
                        onClick={verifyOTP}
                        className="w-full py-2 text-white rounded-lg bg-success hover:bg-success-hover"
                    >
                        Verify OTP
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="max-h-screen min-h-screen">
            <div className="relative flex h-screen">
                <div className="w-1/4 h-full text-black bg-white">
                    <div className="mx-10 mt-24">
                        <div className="flex">
                            <img
                                src="/UMLNinja.png"
                                alt="UMLNinja Logo"
                                className="w-14 h-14"
                            />
                            <div className="content-center ml-2 text-2xl font-semibold">
                                UMLNinja
                            </div>
                        </div>
                        <div className="mt-8 font-bold text-md font-heading">
                            Signup to avail complete access of UMLNinja products
                        </div>
                        <div className="mt-10 font-heading">
                            What can you build with UMLNinja?
                        </div>
                        <div>
                            {diagrams.map((val, idx) => (
                                <div key={idx} className="flex mt-4">
                                    <CodeBracketSquare className="w-6 h-6 text-info" />
                                    <div className="ml-4">{val} Diagram</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center flex-1 h-full">
                    <div className="font-heading">
                        <div className="mb-12 text-black">
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter Your Email"
                                className="h-10 p-2 border border-gray-300 rounded-md shadow-sm w-96 shadow-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-12 text-black">
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                className="h-10 p-2 border border-gray-300 rounded-md shadow-sm w-96 shadow-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) =>
                                    validatePassword(e.target.value)
                                }
                            />
                            <div className="text-xs">
                                {Object.entries(passwordValidation).map(
                                    ([key, isValid], idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center my-2 ml-1 ${
                                                isValid
                                                    ? "text-success"
                                                    : "text-danger"
                                            }`}
                                        >
                                            {isValid ? (
                                                <Check className="w-4 h-4 text-xs" />
                                            ) : (
                                                <X className="w-4 h-4 text-xs" />
                                            )}
                                            <span>
                                                {key === "length"
                                                    ? "Password should be at least 8 characters long"
                                                    : key === "upperCase"
                                                    ? "Password should contain at least 1 uppercase letter"
                                                    : key === "lowerCase"
                                                    ? "Password should contain at least 1 lowercase letter"
                                                    : key === "number"
                                                    ? "Password should contain at least 1 number"
                                                    : "Password should contain at least 1 special character"}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <button
                            onClick={validateInputs}
                            className="h-10 p-2 transition duration-300 rounded-md bg-info w-96 hover:bg-info-hover"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>

            {otpVerifyComp && <OTPVerification />}
        </div>
    );
};

export default Signup;
