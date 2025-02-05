import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "../pages/PageNotFound";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import App from "../pages/Tests";
import Terms from "../pages/Terms";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Contact from "../pages/Contact";
import PageLayout from "../components/PageLayout";
import About from "../pages/About";
import FeaturesPage from "../pages/FeaturesPage";
import PricingPage from "../pages/PricingPage";

export const AppRoutes = () => (
    <Router>
        <Routes>
            <Route element={<PageLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/contact" element={<Contact />} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tests" element={<App />} />

            {/* 404 Page */}
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
);
