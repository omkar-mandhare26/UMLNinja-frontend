import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    return user && token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
