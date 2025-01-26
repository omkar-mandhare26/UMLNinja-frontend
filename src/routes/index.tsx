import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import Signup from "../pages/Signup";
import App from "../pages/Tests";

export const AppRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/tests" element={<App />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </>
    );
};
