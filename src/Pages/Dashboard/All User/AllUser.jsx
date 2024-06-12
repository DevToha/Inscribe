import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loadingUserId, setLoadingUserId] = useState(null);

    const { refetch, isLoading } = useQuery({
        queryKey: ['user', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?search=${search}`);
            setUsers(res.data);
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
        setLoadingUserId(user._id);
        try {
            const res = await axiosSecure.patch(`/user/admin/${user._id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    title: "Good job",
                    text: `${user.name} is an admin`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            console.error("Error making user admin:", error);
        } finally {
            setLoadingUserId(null);
        }
    };

    const handleMakeTutor = async (user) => {
        setLoadingUserId(user._id);
        try {
            const res = await axiosSecure.patch(`/user/tutor/${user._id}`);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: 'top-end',
                    title: "Good job",
                    text: `${user.name} is now a tutor`,
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                });
                refetch();
            }
        } catch (error) {
            console.error("Error making user tutor:", error);
        } finally {
            setLoadingUserId(null);
        }
    };

    return (
        <div>
            <div className="flex mb-10 ml-8 gap-10 items-center">
                <div className="lg:mt-3 mt-16 text-lg font-semibold">Total user: {users.length}</div>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <button onClick={() => refetch()} className="btn btn-primary">Search</button>
            </div>

            <div className="overflow-x-auto">
                {isLoading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : (
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="font-bold text-base text-black">Name</th>
                                <th className="font-bold text-base text-black">Email</th>
                                <th className="font-bold text-base text-black">Role</th>
                                <th className="font-bold text-base text-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-[#aee1ed] hover:text-black">
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {user.role !== 'admin' && (
                                            <div className="relative group inline-block mr-2">
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    className={`btn ${loadingUserId === user._id ? 'loading' : 'hover:bg-blue-500'}`}
                                                    disabled={loadingUserId === user._id}
                                                >
                                                    <FaUsers className="text-lg" />
                                                </button>
                                                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100">
                                                    Make Admin
                                                </span>
                                            </div>
                                        )}
                                        {user.role !== 'tutor' && (
                                            <div className="relative group inline-block">
                                                <button
                                                    onClick={() => handleMakeTutor(user)}
                                                    className={`btn ${loadingUserId === user._id ? 'loading' : 'hover:bg-green-500'}`}
                                                    disabled={loadingUserId === user._id}
                                                >
                                                    <FaChalkboardTeacher className="text-lg" />
                                                </button>
                                                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100">
                                                    Make Tutor
                                                </span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AllUser;
