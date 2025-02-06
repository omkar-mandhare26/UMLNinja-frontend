import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <div>
            Dashboard - Protected Route
            <Link to={"/dash1"}>Go to private route 2</Link>
        </div>
    );
};

export default Dashboard;
