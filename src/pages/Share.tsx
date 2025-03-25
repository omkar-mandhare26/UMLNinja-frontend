import { useEffect, useState } from "react";
import DiagramViewer from "../components/DiagramViewer";
import { Link } from "react-router-dom";

const Share = () => {
    const [diagramId, setDiagramId] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("diagramId");
        if (id) {
            setDiagramId(id);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="p-4 bg-primary-500">
                <div className="flex justify-center">
                    <h1 className="text-2xl font-bold text-white">
                        <Link to={"/"}>UMLNinja</Link>
                    </h1>
                </div>
            </nav>
            <div className="flex items-center justify-center flex-1">
                {diagramId ? (
                    <div className="w-full h-full max-w-4xl p-4">
                        <DiagramViewer diagramId={diagramId} />
                    </div>
                ) : (
                    <div className="text-white">No diagram ID provided</div>
                )}
            </div>
        </div>
    );
};

export default Share;
