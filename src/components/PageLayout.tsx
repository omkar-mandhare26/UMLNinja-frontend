import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PageLayout = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-1/2">
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default PageLayout;
