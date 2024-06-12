import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isBefore } from "date-fns";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import './session.css';

const StudySession = () => {
    const [showAll, setShowAll] = useState(false);

    const axiosPublic = useAxiosPublic();
    const { data: studySession = [], isLoading, isError, error } = useQuery({
        queryKey: ['studySession'],
        queryFn: async () => {
            const res = await axiosPublic.get('/studySession');
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <p>
                <span className="loading loading-bars loading-lg"></span>
            </p>
        );
    }

    if (isError) {
        return (
            <p>Error: {error.message}</p>
        );
    }

    // Filter sessions to only include those with status 'Approved'
    const approvedSessions = studySession.filter(session => session.status === 'Approved');

    // Ensure approvedSessions is an array before attempting to slice it
    const sessionsToShow = Array.isArray(approvedSessions) ? (showAll ? approvedSessions : approvedSessions.slice(0, 6)) : [];

    const getButtonLabel = (registrationEndDate) => {
        const endDate = new Date(registrationEndDate);
        const currentDate = new Date();
        return isBefore(currentDate, endDate) ? "Ongoing" : "Closed";
    };

    return (
        <div className="pt-10">
            <h1 className="text-4xl text-center font-bold my-10">
                All Study Session
            </h1>

            <div className="lg:grid lg:grid-cols-3 text-center ml-14">
                {sessionsToShow.map((session) => (
                    <div key={session._id}>
                        <div className="card15 mb-14 p-10">
                            <p className="text-2xl mb-6 font-semibold">Session Name: {session.sessionTitle}</p>
                            <p className="text-lg mb-6 font-semibold text-gray-700">Session Description: {session.sessionDescription}</p>
                            <p className="text-lg mb-6 font-semibold text-gray-500">Class Start Time: {session.classStartTime}</p>
                            <button className="btn btn-ghost text-base">{getButtonLabel(session.registrationEndDate)}</button>
                            <br />
                            <Link to={`/SessionDetail/${session._id}`}><button className="card25-btn my-8">Read More</button></Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="items-center text-center justify-center">
                {!showAll ? (
                    <button className="button22" onClick={() => setShowAll(true)}>
                        See All Session
                    </button>
                ) : (
                    <button className="button22" onClick={() => setShowAll(false)}>
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default StudySession;
