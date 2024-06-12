import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import './session.css';
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAdmin from "../../../Hooks/useAdmin";
import useTutor from "../../../Hooks/useTutor";

const SessionDetail = () => {
    const { user } = useContext(AuthContext);
    const { _id } = useParams();
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();
    const [isAdmin] = useAdmin();
    const [isTutor] = useTutor();
    const navigate = useNavigate();

    const { data: studySession = {}, isLoading: isLoadingSession } = useQuery({
        queryKey: ['studySession', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/studySession/${_id}`);
            return res.data;
        }
    });

    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/review`);
            return res.data;
        }
    });

    if (isLoadingSession) {
        return (
            <p>
                <span className="loading loading-dots loading-lg"></span>
            </p>
        );
    }

    const handleAddReview = async (event) => {
        event.preventDefault();

        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const reviewText = form.review.value;
        const rating = form.rating.value;

        const newReview = { name, email, date, rating, review: reviewText };

        const res = await fetch('https://assignment-12-server-silk-phi.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newReview)
        });

        const data = await res.json();
        if (data.insertedId) {
            toast.success("Review added successfully (Please, scroll down to see your review)");

            queryClient.invalidateQueries(['reviews', _id]);
        }
    };

    const handleBookNow = () => {
        if (studySession.registrationFee > 0) {
            navigate('/payment', { state: { BookedSession: studySession } });
        } else {
            // Simulate successful booking without payment
            const bookedSessionData = {
                sessionId: studySession._id,
                userId: user._id,
                userName: user.displayName,
                userEmail: user.email,
                registrationFee: 0,
                sessionTitle: studySession.sessionTitle,
                sessionDescription: studySession.sessionDescription,
                registrationDate: new Date(),
            };

            axiosPublic.post('/bookedSession', bookedSessionData)
                .then(response => {
                    if (response.data.insertedId) {
                        toast.success("Session booked successfully without payment");
                        navigate('/dashboard/bookedSessions');
                    }
                })
                .catch(error => {
                    console.error('Error booking session:', error);
                });
        }
    };

    const isRegistrationClosed = new Date(studySession.registrationEndDate) < new Date();
    const isButtonDisabled = isRegistrationClosed || isAdmin || isTutor;

    return (
        <div className="pt-10 mt-10">
            <div className="lg:flex justify-evenly">
                <div>
                    <div className="card25 w-[300px] h-[720px] md:w-[680px] md:h-[580px] lg:w-[480px] lg:h-[580px] mt-14 pt-5 p-10 ml-10 lg:ml-0 md:ml-12">
                        <h1 className="my-5 text-2xl font-bold">Session Title : {studySession.sessionTitle}</h1>
                        <p className="text-xl font-bold text-gray-600">Tutor Name : {studySession.tutorName}</p>
                        <p className="my-5 text-xl font-bold text-gray-600">Session Description : {studySession.sessionDescription}</p>
                        <p className="text-xl font-bold text-gray-600">Registration Fee : {studySession.registrationFee}</p>
                        <p className="my-5 text-xl font-bold text-gray-600">Registration EndDate : {studySession.registrationEndDate}</p>
                        <p className="text-xl font-bold text-gray-600">Class StartTime : {studySession.classStartTime}</p>
                        <p className="my-5 text-xl font-bold text-gray-600">Class EndDate : {studySession.classEndDate}</p>
                        <p className="text-xl font-bold text-gray-600">Session Duration : {studySession.sessionDuration}</p>
                        <p className="my-5 text-xl font-bold text-gray-600">Registration End Date : {studySession.registrationEndDate}</p>

                        <button onClick={handleBookNow} className="card15-btn btn my-5" disabled={isButtonDisabled}>
                            {isRegistrationClosed ? 'Registration Closed' : (isAdmin || isTutor) ? 'Only Student Can Register' : 'Book Now'}
                        </button>
                    </div>
                </div>

                <div>
                    <ToastContainer />
                    <div className="bg-gray-300 shadow8 pt-5 pb-8 md:ml-0 mt-10 rounded-3xl lg:w-[550px] lg:pl-[40px] md:pl-[85px] pl-20">
                        <h3 className="text-3xl font-semibold lg:ml-28 md:ml-56 ml-0 text-gray-500">Give Your Review</h3>
                        <div className=" md:w-1/3 mt-10 ">
                            <form onSubmit={handleAddReview}>
                                <div>
                                    <div className="lg:flex md:flex gap-16">
                                        <div>
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Your Name</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" defaultValue={user.displayName} placeholder="Your Name" name="name" id="" required readOnly />
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Date</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Date" name="date" id="" required />
                                        </div>
                                        <div>
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Your Email</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" defaultValue={user.email} placeholder="Your Email" name="email" id="" required readOnly />
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Your Rating</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="number" placeholder="Give Your Rating" name="rating" id="" required />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="mb-2 text-base font-bold text-gray-600">Your review</h4>
                                        <textarea className="textarea textarea-bordered mb-8 lg:w-[470px] h-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Write your review" name="review" id="" required></textarea>
                                        <input className=" btn hover:bg-orange-800 cursor-pointer ml-10 lg:ml-0 md:ml-0 mt-1 lg:w-[470px] md:w-[580px] py-2 px-4 border-2 rounded-md border-gray-300 bg-blue-500 text-white text-lg font-medium" type="submit" value="ADD NOW" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-700 h-20 w-auto mt-10">
                <h1 className="text-white text-lg font-semibold text-center py-6">Here is all review given by student about this session</h1>
            </div>

            <div className="mt-14 grid lg:grid-cols-4 md:grid-cols-2">
                {reviews.map((review) => (
                    <div key={review._id}>
                        <div className="card6 mb-10 ml-8 py-10 px-5 w-[320px]">

                            <p className="text-lg font-semibold mb-5">Name : {review.name}</p>
                            <p className="text-lg font-semibold text-gray-600 mb-5">Email : {review.email}</p>
                            <p className="text-lg font-semibold text-gray-600 mb-5">Date : {review.date}</p>
                            <p className="text-lg font-semibold text-gray-600 mb-5">Review : {review.review}</p>
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionDetail;
