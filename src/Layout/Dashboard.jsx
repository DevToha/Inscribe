import { NavLink, Outlet } from "react-router-dom";
import './Dash.css';
import { FaHome, FaRegUser, FaUsers } from "react-icons/fa";
import { RiBookMarkedFill } from "react-icons/ri";
import { FaNoteSticky } from "react-icons/fa6";
import { IoCreateSharp } from "react-icons/io5";
import { SiMaterialformkdocs } from "react-icons/si";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { MdClass } from "react-icons/md";

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    const isAdmin = true

    return (
        <div className="px-20">
            <div className="flex gap-20 p-10 card8 bg-slate-100">
                {/* dashboard sidebar */}
                <div className="w-64 min-h-full bg-[#477192] rounded-md">
                    <ul className="menu p-4 text-white">
                        {user ? (
                            <>
                                <li className="max-w-64 cursor-pointer bg-slate-400 rounded-full w-[100px] h-[100px] ml-[62px]">
                                    <img className="cursor-pointer rounded-full w-[100px] h-[100px]" src={user.photoURL} alt="" title={user.displayName} />
                                </li>
                                <li className="my-4 ml-[75px]">{user.displayName}</li>
                                <li className="ml-[20px]">{user.email}</li>
                            </>
                        ) : (
                            <li>Loading user info...</li>
                        )}


                        {
                            isAdmin ? <>

                                <li className="mt-8">
                                    <NavLink to="/"><FaHome /> Home</NavLink>
                                </li>

                                <li className="my-8">
                                    <NavLink to="/dashboard/allUser"><FaUsers /> All User</NavLink>
                                </li>

                                <li className="">
                                    <NavLink to="/dashboard/userHome"><MdClass /> All Study Session</NavLink>
                                </li>
                                <li className="my-8">
                                    <NavLink to="/dashboard/cart"><SiMaterialformkdocs /> All Study Materials</NavLink>
                                </li>

                            </>
                                :
                                <>

                                    <li className="mt-8">
                                        <NavLink to="/"><FaHome /> Home</NavLink>
                                    </li>

                                    <li className="my-8">
                                        <NavLink to="/dashboard/userHome"><FaRegUser /> User Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/cart"><RiBookMarkedFill /> View booked session</NavLink>
                                    </li>
                                    <li className="my-8">
                                        <NavLink to="/dashboard/CreateNote"><IoCreateSharp /> Create note</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/personalNote"><FaNoteSticky /> Manage personal notes</NavLink>
                                    </li>
                                    <li className="my-8">
                                        <NavLink to="/dashboard/studyMaterial"><SiMaterialformkdocs /> Study materials by tutor</NavLink>
                                    </li>
                                </>
                        }


                    </ul>
                </div>
                {/* dashboard content */}
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
