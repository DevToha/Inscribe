import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const Payment = () => {
    const location = useLocation();
    const { BookedSession } = location.state;

    console.log('BookedSession:', BookedSession); // Add this to verify the data

    return (
        <div>
            <h1 className="text-xl font-semibold text-center my-10">Please pay for book the session</h1>
            <div className="px-56">
                <Elements stripe={stripePromise}>
                    <CheckOutForm BookedSession={BookedSession}></CheckOutForm> {/* Ensure prop name is correct */}
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
