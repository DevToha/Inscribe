import { useState, useRef } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import './admin.css';
import Swal from "sweetalert2";

const AdminAllSession = () => {
    const axiosPublic = useAxiosPublic();
    const { data: studySession = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['studySession'],
        queryFn: async () => {
            const res = await axiosPublic.get('/studySession');
            return res.data;
        },
    });

    const [selectedSessionId, setSelectedSessionId] = useState(null);
    const [rejectionReason, setRejectionReason] = useState("");
    const [feedback, setFeedback] = useState("");
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const sessionsPerPage = 2;
    const modalRef = useRef(null);

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

    // Filter the study sessions to include only those with status "Pending" or "Approved"
    const filteredSessions = studySession.filter(session => session.status === 'Pending' || session.status === 'Approved');

    // Calculate the indices for the current page
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = filteredSessions.slice(indexOfFirstSession, indexOfLastSession);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredSessions.length / sessionsPerPage);

    // Function to handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleApprove = async (event) => {
        event.preventDefault();
        const form = event.target;
        const registrationFee = form.registrationFee.value;
        const newApproveSession = { registrationFee, status: 'Approved' };

        try {
            const response = await axiosPublic.patch(`/studySession/${selectedSessionId}`, newApproveSession);
            if (response.data.modifiedCount > 0) {
                form.reset();
                modalRef.current.close(); // Close the modal
                refetch(); // Refresh the sessions list
                Swal.fire({
                    title: "You Successfully Approved The Session And Registration Fee",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error updating session:', error);
        }
    }

    const handleRejectSubmit = async (event) => {
        event.preventDefault();
        const updatedSession = { status: 'Rejected', rejectionReason, feedback };
        try {
            const response = await axiosPublic.patch(`/studySession/${selectedSessionId}`, updatedSession);
            if (response.data.modifiedCount > 0) {
                setShowRejectModal(false);
                setRejectionReason("");
                setFeedback("");
                refetch(); // Refresh the sessions list
                Swal.fire({
                    title: "Session Rejected Successfully",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error rejecting session:', error);
        }
    }

    const openRejectModal = (sessionId) => {
        setSelectedSessionId(sessionId);
        setShowRejectModal(true);
    }

    const closeRejectModal = () => {
        setShowRejectModal(false);
        setRejectionReason("");
        setFeedback("");
    }

    return (
        <div>
            <h3 className="text-3xl font-semibold text-center text-gray-600">All Pending and Approved Study Sessions</h3>
            <div className="mt-5">
                {currentSessions.length === 0 ? (
                    <p>No pending or approved study sessions found.</p>
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

                            {session.status === 'Pending' ? (
                                <>
                                    <button className="btn btn-success my-5" onClick={() => {
                                        setSelectedSessionId(session._id);
                                        modalRef.current.showModal();
                                    }}>Approve</button>
                                    <button className="btn btn-warning" onClick={() => openRejectModal(session._id)}>Reject</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-warning">Update</button>
                                    <button className="btn btn-warning">Delete</button>
                                </>
                            )}

                            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle" id="my_modal_5">
                                <div className="modal-box">
                                    <form onSubmit={handleApprove}>
                                        <h1 className="text-base font-bold">Is the session free or paid?</h1>
                                        <input className="input6 mt-5" type="text" placeholder="Free or paid?" name="freeOrPaid" required />
                                        <h1 className="text-base font-bold my-8">If it is paid, please specify the amount. <br />or <br /> If it is free, just set the value 0</h1>
                                        <input className="input6 mb-5" type="number" placeholder="Specify the amount" name="registrationFee" required />
                                        <input className="btn btn-secondary" type="submit" value="Submit" />
                                    </form>
                                    <div className="modal-action">
                                        <button className="btn btn-warning" onClick={() => modalRef.current.close()}>Close</button>
                                    </div>
                                </div>
                            </dialog>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-5">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {showRejectModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Reject Session</h3>
                        <form onSubmit={handleRejectSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Rejection Reason</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                <textarea
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-warning">Submit</button>
                                <button type="button" className="btn btn-secondary" onClick={closeRejectModal}>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminAllSession;
