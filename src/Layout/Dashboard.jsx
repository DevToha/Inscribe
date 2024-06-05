import { NavLink, Outlet } from "react-router-dom";
import './Dash.css'
import { FaHome, FaRegUser } from "react-icons/fa";
import { RiBookMarkedFill } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";
import { IoCreateSharp } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {

    const { user } = useContext(AuthContext)

    return (
        <div className="px-20">
            <div className="flex gap-20 p-10 card8 bg-slate-100">
                {/* dashboard sidebar */}
                <div className="w-64 min-h-full bg-[#477192] rounded-md">
                    <ul className="menu p-4 text-white">
                        <li></li>
                        <li className="mt-8">
                            <NavLink to="/"><FaHome /> Home</NavLink>
                        </li>
                        <li className="my-8">
                            <NavLink to="/dashboard/userHome"><FaRegUser /> User Home</NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/dashboard/cart"><RiBookMarkedFill /> View booked session</NavLink>
                        </li>
                        <li className="my-8">
                            <NavLink to="/dashboard/CreateNote"><IoCreateSharp /> Create note</NavLink>
                        </li>
                        <li className="">
                            <NavLink to="/dashboard/personalNote"><FaNoteSticky /> Manage personal notes</NavLink>
                        </li>
                        <li className="my-8">
                            <NavLink to="/dashboard/studyMaterial"><SiMaterialformkdocs /> Study materials by tutor</NavLink>
                        </li>
                    </ul>

                </div>
                {/* dashboard content */}
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;