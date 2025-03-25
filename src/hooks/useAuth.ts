import { useContext } from "react";
import AuthContext from "../Authentication/AuthContext";

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be within an AuthProvider");

    return context;
};

export default useAuth;
