import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Payment = () => {
    const location = useLocation();
    const { BookedSession } = location.state;

    console.log('BookedSession:', BookedSession);

    return (
        <div className="p-10">
            <h1 className="text-2xl font-semibold text-center mt-32 py-10 border-t-4 border-b-4 border-gray-600 mb-5">Please pay for booked the session</h1>
            <h1 className="text-xl font-semibold text-center mb-10 text-gray-700">Your Total Amount: {BookedSession.registrationFee}</h1>
            <div className="lg:px-72">
                <Elements stripe={stripePromise}>
                    <CheckOutForm BookedSession={BookedSession}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
