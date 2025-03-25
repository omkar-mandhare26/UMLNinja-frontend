import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

interface DiagramViewerProps {
    diagramId: string;
}

const DiagramViewer = ({ diagramId }: DiagramViewerProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let currentUrl: string | null = null;

        const fetchDiagram = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(
                    `/diagram/retrieve-png-diagram/${diagramId}`,
                    { responseType: "blob" }
                );

                const blob = new Blob([response.data], { type: "image/png" });
                currentUrl = URL.createObjectURL(blob);
                setImageUrl(currentUrl);
            } catch (err) {
                setError("Failed to load diagram");
                console.error("Error fetching diagram:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (diagramId) {
            fetchDiagram();
        }

        return () => {
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
        };
    }, [diagramId]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-white">Loading diagram...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="Diagram"
                    className="object-contain max-w-full max-h-full"
                />
            ) : (
                <div className="text-white">No diagram available</div>
            )}
        </div>
    );
};

export default DiagramViewer;
