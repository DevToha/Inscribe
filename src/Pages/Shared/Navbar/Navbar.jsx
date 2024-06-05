import { useContext, useState } from "react";
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)

    const handleSignOut = () => {
        logOut()
            .then()
            .catch()
    }

    let Links = [
        { name: "HOME", link: "/" },
        { name: "DASHBOARD", link: "/dashboard/cart" },
    ];

    let [open, setOpen] = useState(false);

    return (
        <div className='shadow-md w-full max-w-screen-2xl sticky bg-opacity-70 bg-white text-black z-50'>
            <div className='md:flex items-center justify-between py-4 md:px-10 px-7'>
                {/* logo section */}
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <BookOpenIcon className='w-7 h-7 text-blue-600' />
                    <span>Inscribe</span>
                </div>
                {/* Menu icon */}
                <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                    {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
                </div>
                {/* link items */}
                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-opacity-70  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                    {Links.map((link) => (
                        <li key={link.name} className='md:ml-8 md:my-0 my-7 font-semibold'>
                            <a href={link.link} className='hover:text-blue-400 duration-500'>{link.name}</a>
                        </li>
                    ))}
                    <div className="lg:ml-16">
                        {
                            user ?
                                <button onClick={handleSignOut} className="btn btn-primary button40">LOG OUT</button>
                                :
                                <div className="">
                                    <Link to="/login">
                                        <button className="btn btn-primary button40 lg:mb-0 md:mb-0 mb-5">LOGIN</button>
                                    </Link>
                                    <Link to="/register">
                                        <button className=" btn btn-primary button40 ml-8">REGISTER</button>
                                    </Link>
                                </div>
                        }
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
