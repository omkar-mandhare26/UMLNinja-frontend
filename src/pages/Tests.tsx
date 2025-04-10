"use client";

import type React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import Check from "../icons/Check";

type DiagramType =
    | "Class Diagram"
    | "Object Diagram"
    | "Use Case Diagram"
    | "Sequence Diagram"
    | "Activity Diagram"
    | "State Chart Diagram"
    | "Component Diagram"
    | "Deployment Diagram";

const DiagramGenerator = () => {
    const [selectedDiagram, setSelectedDiagram] =
        useState<DiagramType>("Class Diagram");
    const [query, setQuery] = useState<string>("");

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isRendered, setIsRendered] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState<string>("");

    const [showCopyNotification, setShowCopyNotification] =
        useState<boolean>(false);

    const imageRef = useRef<HTMLImageElement>(null);

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

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!query.trim()) {
            alert("Please enter a query");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axiosInstance.post("/conversation/query", {
                diagram: selectedDiagram,
                userPrompt: query,
            });

            setImageUrl(response.data.png_url);
            setIsRendered(true);
        } catch (error) {
            console.error("Error generating diagram:", error);
            alert("Failed to generate diagram. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = () => {
        if (imageUrl) {
            const shareableUrl = `${
                window.location.origin
            }/share?image=${encodeURIComponent(imageUrl)}`;

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

    const handleDownload = () => {
        if (imageUrl) {
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = `${selectedDiagram
                .replace(/\s+/g, "-")
                .toLowerCase()}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col min-h-screen text-white bg-background font-body">
            <div className="flex flex-col flex-1">
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
                            <button
                                onClick={handleShare}
                                disabled={!isRendered}
                                className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Check />
                                <span>Share</span>
                            </button>

                            {showCopyNotification && (
                                <div className="absolute flex items-center px-4 py-2 space-x-2 rounded-md shadow-lg top-16 right-6 bg-success">
                                    <Check />
                                    <span>URL copied to clipboard!</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-center flex-grow overflow-hidden border rounded-lg border-accent bg-accent">
                            {isRendered ? (
                                <img
                                    ref={imageRef}
                                    src={imageUrl || "/placeholder.svg"}
                                    alt="Generated diagram"
                                    className="object-contain max-w-full max-h-full"
                                />
                            ) : (
                                <div className="text-center text-primary-300">
                                    <p>
                                        Your generated diagram will appear here
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Download button */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleDownload}
                                disabled={!isRendered}
                                className="flex items-center px-4 py-2 space-x-2 transition-colors duration-200 rounded-md bg-secondary-hover hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Check />
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagramGenerator;
