import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useTutor from "../Hooks/useTutor";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';


const TutorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useTutor();
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

export default TutorRoute;

TutorRoute.propTypes = {
    children: PropTypes.node.isRequired
};