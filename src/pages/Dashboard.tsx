import { useEffect, useState } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Trash from "../icons/Trash";
import axiosInstance from "../utils/axiosInstance";
import formatDate from "../utils/formatDate";

interface Diagram {
    _id: string;
    diagramName: string;
    type: string;
    createdAt: string;
}

const ITEMS_PER_PAGE = 10;

const Dashboard: React.FC = () => {
    const [diagrams, setDiagrams] = useState<Diagram[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(diagrams.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentDiagrams = diagrams.slice(startIndex, endIndex);

    useEffect(() => {
        document.title = "UMLNinja Dashboard";
    }, []);

    useEffect(() => {
        const fetchDiagrams = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.post(
                    "/user/get-all-diagrams"
                );
                setDiagrams(response.data.diagrams);
            } catch (err) {
                setError("Failed to load diagrams");
                console.error("Error fetching diagrams:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiagrams();
    }, []);

    const deleteQuery = async (diagramName: string) => {
        try {
            const res = await axiosInstance.post("/diagram/delete-diagram", {
                diagramName,
            });
            if (res.data?.message) {
                alert(res.data.message);
                const response = await axiosInstance.post(
                    "/user/get-all-diagrams"
                );
                setDiagrams(response.data.diagrams);
                if (currentDiagrams.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            }
        } catch (err) {
            alert("Failed to delete diagram");
            console.error("Error deleting diagram:", err);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const renderPaginationControls = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i
                            ? "bg-info text-white"
                            : "bg-primary-500 hover:bg-primary-400"
                    }`}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="flex items-center justify-center mt-6 space-x-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-1 rounded bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </button>
                {pages}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-1 rounded bg-primary-500 hover:bg-primary-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-primary-700">
                <div className="text-xl text-white">Loading diagrams...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-primary-700">
                <div className="text-xl text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <DashboardNavbar queryDiagram={false} />
                <div className="flex-1 bg-primary-700">
                    <div className="w-11/12 m-auto pt-14">
                        <div className="flex items-center justify-between mb-8">
                            <Link to={"/query"}>
                                <Button
                                    variant={"info"}
                                    size={"md"}
                                    text={"Create New Diagram"}
                                />
                            </Link>
                            <div className="text-white">
                                Showing {startIndex + 1} to{" "}
                                {Math.min(endIndex, diagrams.length)} of{" "}
                                {diagrams.length} diagrams
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg shadow-lg bg-primary-600">
                            {diagrams.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-8 space-y-4">
                                    <p className="text-xl text-primary-300">
                                        No diagram Yet
                                    </p>
                                    <Link to={"/query"}>
                                        <Button
                                            variant={"info"}
                                            size={"md"}
                                            text={"Create New Diagram"}
                                        />
                                    </Link>
                                </div>
                            ) : (
                                <table className="w-full text-xl text-left">
                                    <thead className="bg-primary-500">
                                        <tr className="h-14 font-heading">
                                            <th className="w-3/5 pl-4">
                                                Diagram Name
                                            </th>
                                            <th className="w-1/5">Type</th>
                                            <th className="w-1/5">
                                                Created At
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentDiagrams.map((diagram, idx) => (
                                            <tr
                                                key={diagram._id}
                                                className={`h-14 hover:bg-primary-400 border-t-2 border-primary-400 ${
                                                    idx % 2
                                                        ? "bg-primary-500"
                                                        : "bg-secondary"
                                                }`}
                                            >
                                                <td className="pl-4 truncate max-w-[500px]">
                                                    <Link
                                                        to={`/diagram/${diagram.diagramName}`}
                                                        className="hover:text-info"
                                                    >
                                                        {diagram.diagramName}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Link
                                                        to={`/diagram/${diagram.diagramName}`}
                                                    >
                                                        {diagram.type}
                                                    </Link>
                                                </td>
                                                <td>
                                                    {formatDate(
                                                        new Date(
                                                            diagram.createdAt
                                                        )
                                                    )}
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="p-2"
                                                        onClick={() =>
                                                            deleteQuery(
                                                                diagram.diagramName
                                                            )
                                                        }
                                                    >
                                                        <Trash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {totalPages > 1 && renderPaginationControls()}

                        {/* Add spacing before footer */}
                        <div className="h-16"></div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
