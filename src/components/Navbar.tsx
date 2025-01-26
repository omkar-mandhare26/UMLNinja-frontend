import { Link } from "react-router-dom";
import LoginIcon from "../icons/LoginIcon";
import UserIcon from "../icons/UserIcon";
import Button from "./Button";
const Navbar = () => {
    return (
        <div className="relative flex h-14 max-h-14 bg-primary-500">
            <div className="content-center text-xl font-bold ml-14">
                <Link to={"/"}>UMLNinja</Link>
            </div>
            <div className="flex justify-center flex-1 gap-3">
                <div className="content-center">
                    <Link
                        to={"/"}
                        className="px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-500 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125"
                    >
                        Home
                    </Link>
                </div>
                <div className="content-center">
                    <Link
                        to={"/features"}
                        className="px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-500 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125"
                    >
                        Features
                    </Link>
                </div>
                <div className="content-center">
                    <Link
                        to={"/pricing"}
                        className="px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-500 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125"
                    >
                        Pricing
                    </Link>
                </div>
                <div className="content-center">
                    <Link
                        to={"/about"}
                        className="px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-500 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125"
                    >
                        About us
                    </Link>
                </div>
                <div className="content-center">
                    <Link
                        to={"/contact"}
                        className="px-2 py-1 transition duration-300 rounded-md hover:bg-white hover:text-primary-500 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125"
                    >
                        Contact us
                    </Link>
                </div>
            </div>
            <div className="flex justify-end">
                <Link className="content-center" to={"/login"}>
                    <Button
                        variant={"secondary"}
                        size={"sm"}
                        text={"Login"}
                        startIcon={<LoginIcon />}
                        className="hover:bg-white hover:text-primary-500 hover:shadow-[0_0_10px_rgba(255,255,255,0.8)] hover:brightness-125 transition duration-300"
                    />
                </Link>
                <Link className="content-center ml-4 mr-14" to={"/signup"}>
                    <Button
                        variant={"primary"}
                        size={"sm"}
                        text={"Signup"}
                        startIcon={<UserIcon />}
                        className="hover:bg-primary-500 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:brightness-125 transition duration-300"
                    />
                </Link>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-[75%] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full shadow-[0_10px_15px_rgba(255,255,255,0.2)]"></div>
        </div>
    );
};

export default Navbar;
