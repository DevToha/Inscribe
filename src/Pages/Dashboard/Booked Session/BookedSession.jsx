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
            <h1 className="text-3xl font-semibold text-center my-10">Your Booked Sessions</h1>
            <div className="lg:grid lg:grid-cols-3 text-center ml-24">
                {bookedSessions.map((session) => (
                    <div key={session._id}>
                        <div className="card15 mb-14 p-10">
                            <p>Session Title: {session.sessionTitle}</p>
                            <p>Description: {session.sessionDescription}</p>
                            <p>Registration Fee: {session.registrationFee}</p>
                            <p>Transaction ID: {session.transactionId}</p>
                            <p>Registration Date: {new Date(session.registrationDate).toLocaleDateString()}</p>

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
