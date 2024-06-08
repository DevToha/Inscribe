import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckOutForm = ({ BookedSession }) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const totalRegistrationPrice = BookedSession.registrationFee;

    useEffect(() => {
        if (totalRegistrationPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalRegistrationPrice })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [axiosSecure, totalRegistrationPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
        } else {
            setTransactionId(paymentIntent.id);
            if (paymentIntent.status === 'succeeded') {
                toast.success("Payment Successful");

                // Save the booked session to the backend
                const bookedSessionData = {
                    sessionId: BookedSession._id,
                    userId: user._id,
                    userName: user.displayName,
                    userEmail: user.email,
                    transactionId: paymentIntent.id,
                    registrationFee: BookedSession.registrationFee,
                    sessionTitle: BookedSession.sessionTitle,
                    sessionDescription: BookedSession.sessionDescription,
                    registrationDate: new Date(),
                };

                axiosSecure.post('/bookedSession', bookedSessionData)
                    .then(response => {
                        if (response.data.insertedId) {
                            console.log('Session booked successfully');
                        }
                    })
                    .catch(error => {
                        console.error('Error booking session:', error);
                    });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <ToastContainer />
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600">Your transaction id: {transactionId}</p>}
        </form>
    );
};

CheckOutForm.propTypes = {
    BookedSession: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        registrationFee: PropTypes.number.isRequired,
        sessionTitle: PropTypes.string.isRequired,
        sessionDescription: PropTypes.string.isRequired,
    }).isRequired,
};

export default CheckOutForm;
