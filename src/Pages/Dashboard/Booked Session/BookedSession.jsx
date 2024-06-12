import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BookedSession = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: bookedSessions = [], isLoading, isError, error } = useQuery({
        queryKey: ['bookedSessions', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <p><span className="loading loading-bars loading-lg"></span></p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold text-center mb-10 mt-10 lg:mt-0 md:mt-0">Your Booked Sessions</h1>
            <div className="lg:grid lg:grid-cols-2 text-center">
                {bookedSessions.map((session) => (
                    <div key={session._id}>
                        <div className="card25 pt-24 pb-10 mb-10">
                            <h1 className="my-5 text-2xl font-bold">Session Title: {session.sessionTitle}</h1>
                            <p className="text-xl font-bold text-gray-600">Tutor Name: {session.tutorName}</p>
                            <p className="my-5 text-xl font-bold text-gray-600">Your Name : {session.userName}</p>
                            <p className="text-xl font-bold text-gray-600">Your Email: {session.userEmail}</p>
                            <p className="my-5 text-xl font-bold text-gray-600">Your Payment: {session.registrationFee}</p>
                            {/* <p className="text-xl font-bold text-gray-600">Session Description: {session.sessionDescription}</p> */}
                            <p className="my-5 text-xl font-bold text-gray-600">Registration Date: {session.registrationDate}</p>
                            <Link to={`/SessionDetail/${session.sessionId}`}>
                                <button className="card25-btn my-8">View Detail</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookedSession;
