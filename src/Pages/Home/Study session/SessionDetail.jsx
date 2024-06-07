import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import './session.css';
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const SessionDetail = () => {
    const { user } = useContext(AuthContext);
    const { _id } = useParams();
    const queryClient = useQueryClient();
    const axiosPublic = useAxiosPublic();

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
                <span className="loading loading-bars loading-lg"></span>
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

        // send data to the server
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

            // Update the query to get the updated data
            queryClient.invalidateQueries(['reviews', _id]);
        }
    };

    return (
        <div>
            <div className="flex justify-evenly">
                <div>
                    <div className="card16 mt-28">
                        <h1>{studySession.sessionTitle}</h1>
                        <p>{studySession.sessionDescription}</p>
                    </div>
                </div>

                {/* give review  */}
                <div>
                    <ToastContainer />
                    <div className="bg-gray-300 shadow8 pt-5 pb-8 md:ml-0 mt-10 rounded-3xl lg:w-[550px] pl-[40px]">
                        <h3 className="text-3xl font-semibold ml-28 text-gray-500">Give Your Review</h3>
                        <div className=" md:w-1/3 mt-10 ">
                            <form onSubmit={handleAddReview}>
                                <div>
                                    <div className="lg:flex md:flex gap-16">
                                        <div>
                                            {/* name  */}
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Your Name</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="name" defaultValue={user.displayName} placeholder="Your Name" name="name" id="" required readOnly/>

                                            {/* date  */}
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Date</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" placeholder="Date" name="date" id="" required />
                                        </div>
                                        <div>
                                            {/* email  */}
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Your Email</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="text" defaultValue={user.email} placeholder="Your Email" name="email" id="" required readOnly/>

                                            {/* Rating  */}
                                            <h4 className="mb-2 text-base font-bold text-gray-600">Your Rating</h4>
                                            <input className="mb-8 lg:w-[200px] md:w-[260px] py-2 px-4 border-2 border-gray-300 rounded-md" type="number" placeholder="Give Your Rating" name="rating" id="" required />
                                        </div>
                                    </div>
                                    <div>
                                        {/* Review  */}
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

            {/*show review  */}
            <div className="bg-slate-700 h-20 w-auto mt-10">
                <h1 className="text-white text-lg font-semibold text-center py-6">Here is all review given by student about this session</h1>
            </div>

            <div className="mt-14 grid grid-cols-3">
                {reviews.map((review) => (
                    <div key={review._id}>
                        <div className="card16 mb-10 ml-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p>{review.review}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionDetail;
