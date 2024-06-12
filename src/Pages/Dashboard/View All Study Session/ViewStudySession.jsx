import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const ViewStudySession = () => {
    const { user } = useContext(AuthContext);
    const [sessions, setSessions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true); // Add loading state
    const sessionsPerPage = 2;

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await fetch(`https://assignment-12-server-silk-phi.vercel.app/studySessions?email=${user.email}`);
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching data
            }
        };

        fetchSessions();
    }, [user.email]);

    // Calculate the indices for the current page
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

    // Calculate the total number of pages
    const totalPages = Math.ceil(sessions.length / sessionsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h3 className="text-3xl font-semibold text-gray-600 text-center pb-5 border-b-4 border-gray-600">Your Created Study Sessions</h3>
            <div className="mt-10">
                {loading ? (
                    <span className="loading loading-dots loading-lg"></span>
                ) : (
                    sessions.length === 0 ? (
                        <p>No study sessions found.</p>
                    ) : (
                        currentSessions.map(session => (
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
                                {session.status === 'Rejected' && (
                                    <p><strong>Feedback:</strong> {session.feedback}</p>
                                )}
                            </div>
                        ))
                    )
                )}
            </div>
            <div className="flex justify-center mt-5">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-white text-gray-500'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ViewStudySession;
