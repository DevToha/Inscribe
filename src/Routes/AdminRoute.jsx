import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const AdminRoute = ({children}) => {

    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className="text-center mt-10 items-center justify-center">
            <div className="loader16">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    }

    if (user && isAdmin) {
        return children
    }

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>
    );

};

export default AdminRoute;



AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
};