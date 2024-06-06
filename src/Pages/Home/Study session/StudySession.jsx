import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import './session.css';
import { Link } from "react-router-dom";

const StudySession = () => {
    const [showAll, setShowAll] = useState(false); // State to track if "See All Session" is clicked

    const { data: studySession, isLoading, error } = useQuery({
        queryKey: ['studySession'],
        queryFn: async () => {
            const res = await fetch('https://assignment-12-server-silk-phi.vercel.app/studySession');
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        }
    });

    if (isLoading)
        return
    <p>
        <div className="loader20">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </p>;
    
    if (error) return <p>Error: {error.message}</p>;
    if (!studySession) return <p>No data available</p>;

    // Determine the sessions to display based on the showAll state
    const sessionsToShow = showAll ? studySession : studySession.slice(0, 6);

    return (
        <div>
            <h1 className="text-4xl text-center font-bold my-10">
                Study session section: {studySession.length}
            </h1>

            <div className="lg:grid lg:grid-cols-3 text-center ml-24">
                {sessionsToShow.map((session) => (
                    <div key={session._id}>
                        <div className="card16 mb-14 p-10">
                            <p>name: {session.sessionTitle}</p>
                            <p>Description: {session.sessionDescription}</p>

                            <Link to={`/SessionDetail/${session._id}`}><button className="btn btn-success my-8">Detail</button></Link>
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