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

    console.log('BookedSession:', BookedSession); // Verify the data
    console.log('Total Registration Price:', totalRegistrationPrice); // Verify the fee

    useEffect(() => {
        if (totalRegistrationPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalRegistrationPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
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

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod);
            setError('');
        }

        // Uncomment the following lines to handle the payment confirmation and database update
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
            console.log('confirm error');
        } else {
            console.log('payment intent', paymentIntent);
        }
        if (paymentIntent.status === 'succeeded') {
            toast.success("Payment Successful");
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);
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
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

CheckOutForm.propTypes = {
    BookedSession: PropTypes.shape({
        registrationFee: PropTypes.number.isRequired,
    }).isRequired,
};

CheckOutForm.defaultProps = {
    BookedSession: {
        registrationFee: 0,
    },
};

export default CheckOutForm;
