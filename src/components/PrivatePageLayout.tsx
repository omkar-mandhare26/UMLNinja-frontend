import PrivateNavbar from "./DashboardNavbar";
import { Outlet } from "react-router-dom";

const PrivatePageLayout = () => {
    return (
        <div className="flex flex-col h-screen">
            <PrivateNavbar />
            <div className="flex-1 min-h-max">
                <Outlet />
            </div>
        </div>
    );
};

export default PrivatePageLayout;
