import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";
import { Link, useParams } from "react-router-dom";
import { FiDownload, FiShare2, FiCode } from "react-icons/fi";
import Check from "../icons/Check";

interface DiagramResponse {
    diagramType: string;
    userPrompt: string;
    png_url: string;
    svg_url?: string;
    image_name: string;
    code_url?: string;
    msg?: string;
}

interface UserData {
    plan: string;
}

const Diagram = () => {
    const { diagramName } = useParams<{ diagramName: string }>();
    const [diagramData, setDiagramData] = useState<DiagramResponse | null>(
        null
    );
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showCopyNotification, setShowCopyNotification] =
        useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.post("/user/get-my-plan");
                setUserData({
                    plan: response.data.plan,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchDiagramDetails = async () => {
            if (!diagramName) return;

            try {
                setIsLoading(true);
                const response = await axiosInstance.post(
                    "/diagram/get-diagram-details",
                    {
                        diagramName: diagramName,
                    }
                );
                setDiagramData(response.data);
            } catch (err) {
                console.error("Error fetching diagram details:", err);
                setError("Failed to load diagram details");
            } finally {
                setIsLoading(false);
            }
        };

        document.title = "View Diagram";
        fetchDiagramDetails();
    }, [diagramName]);

    const handleShare = () => {
        if (
            diagramData?.image_name &&
            userData &&
            (userData.plan === "professional" || userData.plan === "pro")
        ) {
            const shareableUrl = `${window.location.origin}/share?diagramId=${diagramData.image_name}`;

            navigator.clipboard
                .writeText(shareableUrl)
                .then(() => {
                    setShowCopyNotification(true);

                    setTimeout(() => {
                        setShowCopyNotification(false);
                    }, 2000);
                })
                .catch((err) => {
                    console.error("Failed to copy URL:", err);
                    alert("Failed to copy URL to clipboard");
                });
        }
    };

    const handleDownload = (type: "png" | "svg" | "code") => {
        if (!diagramData) return;

        let url = "";
        let filename = "";

        switch (type) {
            case "png":
                url = diagramData.png_url;
                filename = `${diagramData.image_name}-${Date.now()}.png`;
                break;
            case "svg":
                url = diagramData.svg_url || "";
                filename = `${diagramData.image_name}-${Date.now()}.svg`;
                break;
            case "code":
                url = diagramData.code_url || "";
                window.open(url, "_blank");
                return;
        }

        if (url) {
            axiosInstance
                .get(url, { responseType: "blob" })
                .then((response) => {
                    const blob = new Blob([response.data], {
                        type: response.headers["content-type"],
                    });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    URL.revokeObjectURL(link.href);
                })
                .catch((error) => {
                    console.error("Error downloading file:", error);
                    alert("Failed to download file. Please try again.");
                });
        }
    };

    const formatDiagramType = (type: string): string => {
        switch (type) {
            case "usecase":
                return "Use Case Diagram";
            case "statechart":
                return "State Chart Diagram";
            case "class":
                return "Class Diagram";
            case "object":
                return "Object Diagram";
            case "sequence":
                return "Sequence Diagram";
            case "activity":
                return "Activity Diagram";
            case "component":
                return "Component Diagram";
            case "deployment":
                return "Deployment Diagram";
            default:
                return type;
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-white bg-background font-body">
            <div className="flex flex-col flex-1 min-h-screen">
                <DashboardNavbar queryDiagram={true} />

                <div className="flex flex-col flex-1 md:flex-row">
                    <div className="flex flex-col w-full p-6 md:w-2/5 bg-primary-500">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-primary-300">Loading...</p>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-red-400">{error}</p>
                            </div>
                        ) : diagramData ? (
                            <div className="flex flex-col space-y-6">
                                <div className="flex flex-col space-y-2">
                                    <label className="text-lg font-medium">
                                        Diagram Type
                                    </label>
                                    <div className="w-full p-3 border rounded-md bg-primary-600 border-primary-400">
                                        {formatDiagramType(
                                            diagramData.diagramType
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col flex-grow space-y-2">
                                    <label className="text-lg font-medium">
                                        User Query
                                    </label>
                                    <div className="flex-grow w-full p-3 overflow-auto border rounded-md h-80 bg-primary-600 border-primary-400">
                                        {diagramData.userPrompt}
                                    </div>
                                </div>
                                <Link to={"/query"}>
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center w-full px-4 py-3 font-medium transition-colors duration-200 rounded-md bg-info hover:bg-info-hover"
                                    >
                                        Generate New Diagram
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-primary-300">
                                    No diagram data available
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col w-full p-6 md:w-3/5 bg-secondary">
                        <div className="flex justify-end mb-4">
                            {userData &&
                                (userData.plan === "professional" ||
                                    userData.plan === "pro") && (
                                    <button
                                        onClick={handleShare}
                                        disabled={!diagramData}
                                        className="flex items-center px-4 py-2 mr-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <FiShare2 />
                                        <span>Share</span>
                                    </button>
                                )}

                            {showCopyNotification && (
                                <div className="absolute flex items-center px-4 py-2 space-x-2 rounded-md shadow-lg top-16 right-6 bg-success">
                                    <Check />
                                    <span>URL copied to clipboard!</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center h-[650px] border rounded-lg border-accent bg-accent">
                            {isLoading ? (
                                <div className="text-center text-primary-300">
                                    <p>Loading diagram...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-400">
                                    <p>{error}</p>
                                </div>
                            ) : diagramData && diagramData.png_url ? (
                                <div className="flex items-center justify-center w-full h-full p-4">
                                    <img
                                        src={diagramData.png_url}
                                        alt="Generated diagram"
                                        className="object-contain max-w-full max-h-full"
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-primary-300">
                                    <p>No diagram available</p>
                                </div>
                            )}
                        </div>

                        {diagramData && (
                            <div className="flex justify-end mt-4 space-x-2">
                                <button
                                    onClick={() => handleDownload("png")}
                                    className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent"
                                >
                                    <FiDownload />
                                    <span>PNG</span>
                                </button>

                                {userData &&
                                    (userData.plan === "professional" ||
                                        userData.plan === "pro") && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleDownload("svg")
                                                }
                                                className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent"
                                            >
                                                <FiDownload />
                                                <span>SVG</span>
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDownload("code")
                                                }
                                                className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent"
                                            >
                                                <FiCode />
                                                <span>PlantUML</span>
                                            </button>
                                        </>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Diagram;
