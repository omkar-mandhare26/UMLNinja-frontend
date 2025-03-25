import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import PageLayout from "../components/PageLayout";
import PrivateRoute from "../pages/PrivateRoute";
import PageNotFound from "../pages/PageNotFound";
import FeaturesPage from "../pages/FeaturesPage";
import PricingPage from "../pages/PricingPage";
import Dashboard from "../pages/Dashboard";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import DiagramGenerator from "../pages/Tests";
import Terms from "../pages/Terms";
import Home from "../pages/Home";
import About from "../pages/About";
import Dash from "../pages/Dash";
import Query from "../pages/Query";
import ViewProfile from "../pages/ViewProfile";
import Share from "../pages/Share";

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
            <Route path="/tests" element={<DiagramGenerator />} />
            <Route path="/share" element={<Share />} />

            {/* <Route element={<PrivatePageLayout />}> */}
            <Route
                path="/dashboard"
                element={<PrivateRoute children={<Dashboard />} />}
            />
            <Route
                path="/query"
                element={<PrivateRoute children={<Query />} />}
            />
            <Route
                path="/view-profile"
                element={<PrivateRoute children={<ViewProfile />} />}
            />
            <Route
                path="/dash1"
                element={<PrivateRoute children={<Dash />} />}
            />
            {/* </Route> */}

            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
);
