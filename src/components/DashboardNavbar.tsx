import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import UserIcon from "../icons/UserIcon";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logout from "../icons/Logout";
import Bolt from "../icons/Bolt";

interface UserPlan {
    plan: string;
    credits: number;
}

const DashboardNavbar = ({ queryDiagram }: { queryDiagram: boolean }) => {
    const { logout } = useAuth();

    const { data: userPlan } = useQuery<UserPlan>({
        queryKey: ["userPlan"],
        queryFn: async () => {
            const response = await axiosInstance.post("/user/get-my-plan");
            return response.data;
        },
    });

    return (
        <div className="relative grid w-full grid-cols-2 gap-4 bg-accent min-h-14 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-[60%] after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-white/70 after:to-transparent after:blur-sm after:translate-x-[-50%]">
            <div className="content-center text-xl font-bold ml-14">
                <Link to={"/"}>UMLNinja</Link>
            </div>
            <div className="flex justify-end my-auto gap-7">
                {queryDiagram && (
                    <Link
                        to={"/dashboard"}
                        className="flex gap-2 px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125 cursor-pointer"
                    >
                        Dashboard
                    </Link>
                )}
                <Link
                    to={"/buy-credits"}
                    className="flex gap-2 px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125 cursor-pointer items-center"
                >
                    <Bolt />
                    {userPlan?.credits ?? 0} Creds
                </Link>
                <Link
                    to={"/view-profile"}
                    className="flex gap-2 px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125"
                >
                    <UserIcon /> View Profile
                </Link>
                <div className="flex gap-2 px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125 mr-14">
                    <button
                        onClick={() => {
                            logout();
                        }}
                    >
                        <Logout />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
