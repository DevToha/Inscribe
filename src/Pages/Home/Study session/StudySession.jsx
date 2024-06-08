import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import './session.css';
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

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

    // Ensure studySession is an array before attempting to slice it
    const sessionsToShow = Array.isArray(studySession) ? (showAll ? studySession : studySession.slice(0, 6)) : [];

    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-10">
                All Study Session
            </h1>

            <div className="lg:grid lg:grid-cols-3 text-center ml-24">
                {sessionsToShow.map((session) => (
                    <div key={session._id}>
                        <div className="card15 mb-14 p-10">
                            <p>name: {session.sessionTitle}</p>
                            <p>Description: {session.sessionDescription}</p>
                            <p>End date :{session.registrationEndDate}</p>

                            <Link to={`/SessionDetail/${session._id}`}><button className="card25-btn my-8">Detail</button></Link>
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
