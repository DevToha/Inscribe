import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const AdminDashboard = () => {

    const { user } = useContext(AuthContext);


    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-5 text-gray-500">Welcome To Admin Dashboard {user.displayName}</h1>
            <p className="text-2xl font-semibold text-gray-600 text-center mt-28">Admin Dashboard Feature Coming Soon</p>
        </div>
    );
};

export default AdminDashboard;