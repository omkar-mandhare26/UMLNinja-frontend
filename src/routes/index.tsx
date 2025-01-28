import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import App from "../pages/Tests";

export const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/tests" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </>
    );
};
