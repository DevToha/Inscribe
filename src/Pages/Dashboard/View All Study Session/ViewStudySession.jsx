import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ViewStudySession = () => {
    const { user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/studySessions?email=${user.email}`);
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchSessions();
    }, [user.email]);

    return (
        <div>
            <h3 className="text-3xl font-semibold text-gray-600">Your Study Sessions</h3>
            <div className="mt-10">
                {sessions.length === 0 ? (
                    <p>No study sessions found.</p>
                ) : (
                    sessions.map(session => (
                        <div key={session._id} className="mb-5 p-5 border rounded-md">
                            <h4 className="text-xl font-semibold">{session.sessionTitle}</h4>
                            <p><strong>Tutor Name:</strong> {session.tutorName}</p>
                            <p><strong>Tutor Email:</strong> {session.tutorEmail}</p>
                            <p><strong>Description:</strong> {session.sessionDescription}</p>
                            <p><strong>Registration Start Date:</strong> {session.registrationStartDate}</p>
                            <p><strong>Registration End Date:</strong> {session.registrationEndDate}</p>
                            <p><strong>Class Start Date:</strong> {session.classStartTime}</p>
                            <p><strong>Class End Date:</strong> {session.classEndDate}</p>
                            <p><strong>Session Duration:</strong> {session.sessionDuration}</p>
                            <p><strong>Registration Fee:</strong> ${session.registrationFee}</p>
                            <p><strong>Status:</strong> {session.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ViewStudySession;
