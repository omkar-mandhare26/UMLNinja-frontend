import { useEffect, useRef, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import axiosInstance from "../utils/axiosInstance";
import Check from "../icons/Check";
import { FiDownload, FiShare2, FiCode } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";

type DiagramType =
    | "Class Diagram"
    | "Object Diagram"
    | "Use Case Diagram"
    | "Sequence Diagram"
    | "Activity Diagram"
    | "State Chart Diagram"
    | "Component Diagram"
    | "Deployment Diagram";

interface UserData {
    plan: string;
}

interface DiagramResponse {
    image_name: string;
    png_url: string;
    svg_url: string;
    code_url: string;
    msg: string;
}

const Query = () => {
    const queryClient = useQueryClient();
    const [selectedDiagram, setSelectedDiagram] =
        useState<DiagramType>("Class Diagram");
    const [query, setQuery] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [diagramData, setDiagramData] = useState<DiagramResponse | null>(
        null
    );
    const [userData, setUserData] = useState<UserData | null>(null);

    const [showCopyNotification, setShowCopyNotification] =
        useState<boolean>(false);

    const imageRef = useRef<HTMLImageElement>(null);

    const formatDiagramType = (diagramType: DiagramType): string => {
        let formatted = diagramType.toLowerCase();

        if (formatted.includes(" ")) {
            formatted = formatted.split(" ")[0];
        }

        if (diagramType === "Use Case Diagram") {
            return "usecase";
        }

        if (diagramType === "State Chart Diagram") {
            return "statechart";
        }

        return formatted;
    };

    const diagramTypes: DiagramType[] = [
        "Class Diagram",
        "Object Diagram",
        "Use Case Diagram",
        "Sequence Diagram",
        "Activity Diagram",
        "State Chart Diagram",
        "Component Diagram",
        "Deployment Diagram",
    ];

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

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!query.trim()) {
            alert("Please enter a query");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axiosInstance.post("/conversation/query", {
                diagramType: formatDiagramType(selectedDiagram),
                userPrompt: query,
            });

            setDiagramData(response.data);
            setIsRendered(true);
            queryClient.invalidateQueries({ queryKey: ["userPlan"] });
        } catch (error) {
            console.error("Error generating diagram:", error);
            alert("Failed to generate diagram. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = () => {
        if (diagramData?.image_name) {
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
                filename = `${selectedDiagram
                    .replace(/\s+/g, "-")
                    .toLowerCase()}-${Date.now()}.png`;
                break;
            case "svg":
                url = diagramData.svg_url || "";
                filename = `${selectedDiagram
                    .replace(/\s+/g, "-")
                    .toLowerCase()}-${Date.now()}.svg`;
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

    useEffect(() => {
        document.title = "Generate Diagram";
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col min-h-screen text-white bg-background font-body">
            <div className="flex flex-col flex-1 min-h-screen">
                <DashboardNavbar queryDiagram={true} />

                <div className="flex flex-col flex-1 md:flex-row">
                    <div className="flex flex-col w-full p-6 md:w-2/5 bg-primary-500">
                        <form
                            onSubmit={handleGenerate}
                            className="flex flex-col space-y-6"
                        >
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="diagramType"
                                    className="text-lg font-medium"
                                >
                                    Diagram Type
                                </label>
                                <select
                                    id="diagramType"
                                    value={selectedDiagram}
                                    onChange={(e) =>
                                        setSelectedDiagram(
                                            e.target.value as DiagramType
                                        )
                                    }
                                    className="w-full p-3 border rounded-md bg-primary-600 border-primary-400 focus:outline-none focus:ring-2 focus:ring-info"
                                >
                                    {diagramTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col flex-grow space-y-2">
                                <label
                                    htmlFor="query"
                                    className="text-lg font-medium"
                                >
                                    Query
                                </label>
                                <textarea
                                    id="query"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Enter your diagram query here..."
                                    className="flex-grow w-full p-3 border rounded-md resize-none h-80 bg-primary-600 border-primary-400 focus:outline-none focus:ring-2 focus:ring-info"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex items-center justify-center w-full px-4 py-3 font-medium transition-colors duration-200 rounded-md bg-info hover:bg-info-hover"
                            >
                                {isLoading
                                    ? "Generating..."
                                    : "Generate Diagram"}
                            </button>
                        </form>
                    </div>

                    <div className="relative flex flex-col w-full p-6 md:w-3/5 bg-secondary">
                        <div className="flex justify-end mb-4">
                            {userData &&
                                (userData.plan === "professional" ||
                                    userData.plan === "pro") && (
                                    <button
                                        onClick={handleShare}
                                        disabled={!isRendered}
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
                            {isRendered && diagramData ? (
                                <div className="flex items-center justify-center w-full h-full p-4">
                                    <img
                                        ref={imageRef}
                                        src={
                                            diagramData.png_url ||
                                            "/placeholder.svg"
                                        }
                                        alt="Generated diagram"
                                        className="object-contain max-w-full max-h-full"
                                    />
                                </div>
                            ) : (
                                <div className="text-center text-primary-300">
                                    <p>
                                        Your generated diagram will appear here
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Download options based on user plan */}
                        {isRendered && diagramData && (
                            <div className="flex justify-end mt-4 space-x-2">
                                {/* All users can download PNG */}
                                <button
                                    onClick={() => handleDownload("png")}
                                    className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent"
                                >
                                    <FiDownload />
                                    <span>PNG</span>
                                </button>

                                {/* Show SVG and PlantUML code download options if they are available in the response */}
                                {diagramData.msg === "Professional User" && (
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

export default Query;
