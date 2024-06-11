import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const { refetch } = useQuery({
        queryKey: ['user', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?search=${search}`);
            setUsers(res.data);
            return res.data;
        }
    });

    const handleMakeAdmin = async (user) => {
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

                // Refetch the users after making someone an admin
                refetch();
            }
        } catch (error) {
            console.error("Error making user admin:", error);
        }
    };

    const handleMakeTutor = async (user) => {
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

                // Refetch the users after making someone a tutor
                refetch();
            }
        } catch (error) {
            console.error("Error making user tutor:", error);
        }
    };

    return (
        <div>
            <div className="flex mb-10 ml-8 gap-10">
                <div className="mt-3 text-lg font-semibold">Total user: {users.length}</div>
                <input
                    type="text"
                    placeholder="Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-xs "
                />
                <button onClick={() => refetch()} className="btn btn-primary">Search</button>
            </div>

            <div className="overflow-x-auto">
                <table className="table">
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
                                <td className="my-3">
                                    {user.role}
                                </td>
                                <td>
                                    {user.role !== 'admin' && (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn hover:bg-blue-500">
                                            <FaUsers className="text-lg" />
                                        </button>
                                    )}
                                    {user.role !== 'tutor' && (
                                        <button onClick={() => handleMakeTutor(user)} className="btn hover:bg-green-500 ml-2">
                                            <FaChalkboardTeacher className="text-lg" />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
