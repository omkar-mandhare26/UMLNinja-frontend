import { Link } from "react-router-dom";
import UserIcon from "../icons/UserIcon";
import Logout from "../icons/Logout";
import useAuth from "../hooks/useAuth";
import Bolt from "../icons/Bolt";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

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
        <div className="grid w-full grid-cols-2 gap-4 bg-accent min-h-14 ">
            <div className="content-center text-xl font-bold ml-14">
                <Link to={"/"}>UMLNinja</Link>
            </div>
            <div className="flex justify-end my-auto gap-7">
                {queryDiagram ? (
                    <Link
                        to={"/dashboard"}
                        className="flex gap-2 px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125 cursor-pointer"
                    >
                        Dashboard
                    </Link>
                ) : (
                    ""
                )}
                <div className="flex gap-2 px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-900 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125 cursor-pointer  items-center">
                    <Bolt />
                    {userPlan?.credits ?? 0} Creds
                </div>
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
