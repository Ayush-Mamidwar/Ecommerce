import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  Order,
  PaymentProcess,
} from "../../redux/slice/paymentSlice/PaymentSlice";
import toast from "react-hot-toast";
import { Deletecartdata } from "../../redux/slice/userAuthSlice/UserAuthSlice";
import Loader from "../../components/loader/Loader";

const Payment = () => {
  const { state } = useLocation();
  const { payment } = useSelector((state) => state.Payment);
  const { userloggedin } = useSelector((state) => state.User);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const [spin, setSpin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentamount = {
      totalamount: state?.totalPrice * 100,
    };

    dispatch(PaymentProcess(paymentamount));
  };

  const order = {
    ...state,
  };
  const navigate = useNavigate();

  const finalpayment = async () => {
    const result = await stripe.confirmCardPayment(payment, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: userloggedin[0]?.firstname,
          email: userloggedin[0]?.email,
          phone: state?.mobile,
          address:{
            line1: state?.address,
            city: state?.city,
            state: state?.state,
            postal_code: state?.pincode,
            country: state.country,
          },
        },
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      order.paymentdetails = {
        paymentid: result?.paymentIntent?.id,
        status: result?.paymentIntent?.status,
      };

      dispatch(Order(order))
        .then((res) => {
          if (res?.payload) {
            dispatch(Deletecartdata());
            navigate("/userorders");
          }
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    } else {
      toast.error("Enter all details.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 400);
  }, []);

  useEffect(() => {
    if (payment.length > 0) {
      finalpayment();
    }
  }, [payment]);
  return (
    <>
      {spin ? (
        <Loader />
      ) : (
        <div className="flex flex-col pt-8 items-center gap-4 min-h-[80vh] w-full">
          <h1 className="text-4xl font-bold text-violet-900">
            Enter Card Details
          </h1>
          <div className="w-[50%]">
            <form className="space-y-4">
              <CardNumberElement className="inpt p-4 border border-gray-300" />

              <CardExpiryElement className="inpt p-4 border border-gray-300" />

              <CardCvcElement className="inpt p-4 border border-gray-300" />
              <button
                type="submit"
                onClick={(e) => handleSubmit(e)}
                className="block w-full px-4 py-2 mt-4 text-lg bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
