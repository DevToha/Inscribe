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
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        sessionTitle: "",
        tutorName: "",
        tutorEmail: "",
        sessionDescription: "",
        registrationStartDate: "",
        registrationEndDate: "",
        classStartTime: "",
        classEndDate: "",
        sessionDuration: "",
        registrationFee: "",
    });
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

    const openUpdateModal = (session) => {
        setSelectedSessionId(session._id);
        setUpdateData({
            sessionTitle: session.sessionTitle,
            tutorName: session.tutorName,
            tutorEmail: session.tutorEmail,
            sessionDescription: session.sessionDescription,
            registrationStartDate: session.registrationStartDate,
            registrationEndDate: session.registrationEndDate,
            classStartTime: session.classStartTime,
            classEndDate: session.classEndDate,
            sessionDuration: session.sessionDuration,
            registrationFee: session.registrationFee,
        });
        setShowUpdateModal(true);
    }

    const closeUpdateModal = () => {
        setShowUpdateModal(false);
    }

    const handleUpdateSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axiosPublic.patch(`/studySession/${selectedSessionId}`, updateData);
            if (response.data.modifiedCount > 0) {
                closeUpdateModal();
                refetch(); // Refresh the sessions list
                Swal.fire({
                    title: "Session Updated Successfully",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error updating session:', error);
        }
    }

    const handleDelete = async (sessionId) => {
        try {
            const response = await axiosPublic.delete(`/studySession/${sessionId}`);
            if (response.data.deletedCount > 0) {
                refetch(); // Refresh the sessions list
                Swal.fire({
                    title: "Session Deleted Successfully",
                    icon: "success"
                });
            }
        } catch (error) {
            console.error('Error deleting session:', error);
        }
    }

    return (
        <div>
            <h3 className="text-3xl font-semibold text-center text-gray-600">All Pending and Approved Study Sessions</h3>
            <div className="mt-5">
                {currentSessions.length === 0 ? (
                    <p>No pending or approved study sessions found.</p>
                ) : (
                    currentSessions.map(session => (
                        <div key={session._id} className="mb-5 p-5 border-2 border-gray-300 rounded-md">
                            <h4 className="text-xl font-semibold">Title Name: {session.sessionTitle}</h4>
                            <p className="my-2"><strong>Tutor Name:</strong> {session.tutorName}</p>
                            <p><strong>Tutor Email:</strong> {session.tutorEmail}</p>
                            <p className="my-2"><strong>Description:</strong> {session.sessionDescription}</p>
                            <p><strong>Registration Start Date:</strong> {session.registrationStartDate}</p>
                            <p className="my-2"><strong>Registration End Date:</strong> {session.registrationEndDate}</p>
                            <p><strong>Class Start Date:</strong> {session.classStartTime}</p>
                            <p className="my-2"><strong>Class End Date:</strong> {session.classEndDate}</p>
                            <p><strong>Session Duration:</strong> {session.sessionDuration}</p>
                            <p className="my-2"><strong>Registration Fee:</strong> ${session.registrationFee}</p>
                            <p className="mb-6"><strong>Status:</strong> {session.status}</p>

                            {session.status === 'Pending' ? (
                                <>
                                    <button className="btn btn-success my-5 mr-10" onClick={() => {
                                        setSelectedSessionId(session._id);
                                        modalRef.current.showModal();
                                    }}>Approve</button>
                                    <button className="btn btn-warning" onClick={() => openRejectModal(session._id)}>Reject</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-primary mr-10" onClick={() => openUpdateModal(session)}>Update</button>
                                    <button className="btn btn-warning" onClick={() => handleDelete(session._id)}>Delete</button>
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
                                        <button className="btn btn-secondary" onClick={() => modalRef.current.close()}>Close</button>
                                    </div>
                                </div>
                            </dialog>

                            <dialog open={showRejectModal} className="modal modal-bottom sm:modal-middle" id="rejectModal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Reject Session</h3>
                                    <form onSubmit={handleRejectSubmit}>
                                        <label className="label">Rejection Reason</label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            value={rejectionReason}
                                            onChange={(e) => setRejectionReason(e.target.value)}
                                            required
                                        ></textarea>
                                        <label className="label">Feedback</label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            required
                                        ></textarea>
                                        <div className="modal-action">
                                            <button type="submit" className="btn btn-warning">Submit</button>
                                            <button type="button" className="btn" onClick={closeRejectModal}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </dialog>

                            <dialog open={showUpdateModal} className="modal modal-bottom sm:modal-middle" id="updateModal">
                                <div className="modal-box">
                                    <h3 className="font-bold text-lg">Update Session</h3>
                                    <form onSubmit={handleUpdateSubmit}>
                                        <label className="label">Session Title</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.sessionTitle}
                                            onChange={(e) => setUpdateData({ ...updateData, sessionTitle: e.target.value })}
                                            required
                                        />
                                        <label className="label">Tutor Name</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.tutorName}
                                            onChange={(e) => setUpdateData({ ...updateData, tutorName: e.target.value })}
                                            required
                                        />
                                        <label className="label">Tutor Email</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.tutorEmail}
                                            onChange={(e) => setUpdateData({ ...updateData, tutorEmail: e.target.value })}
                                            required
                                        />
                                        <label className="label">Session Description</label>
                                        <textarea
                                            className="textarea textarea-bordered w-full"
                                            value={updateData.sessionDescription}
                                            onChange={(e) => setUpdateData({ ...updateData, sessionDescription: e.target.value })}
                                            required
                                        ></textarea>
                                        <label className="label">Registration Start Date</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.registrationStartDate}
                                            onChange={(e) => setUpdateData({ ...updateData, registrationStartDate: e.target.value })}
                                            required
                                        />
                                        <label className="label">Registration End Date</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.registrationEndDate}
                                            onChange={(e) => setUpdateData({ ...updateData, registrationEndDate: e.target.value })}
                                            required
                                        />
                                        <label className="label">Class Start Date</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.classStartTime}
                                            onChange={(e) => setUpdateData({ ...updateData, classStartTime: e.target.value })}
                                            required
                                        />
                                        <label className="label">Class End Date</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.classEndDate}
                                            onChange={(e) => setUpdateData({ ...updateData, classEndDate: e.target.value })}
                                            required
                                        />
                                        <label className="label">Session Duration</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.sessionDuration}
                                            onChange={(e) => setUpdateData({ ...updateData, sessionDuration: e.target.value })}
                                            required
                                        />
                                        <label className="label">Registration Fee</label>
                                        <input
                                            className="input input-bordered w-full"
                                            value={updateData.registrationFee}
                                            onChange={(e) => setUpdateData({ ...updateData, registrationFee: e.target.value })}
                                            required
                                        />
                                        <div className="modal-action">
                                            <button type="submit" className="btn btn-warning">Update</button>
                                            <button type="button" className="btn" onClick={closeUpdateModal}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </dialog>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === pageNumber ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AdminAllSession;
