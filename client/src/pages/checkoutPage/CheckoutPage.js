import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const CheckoutPage = () => {
  const { state } = useLocation();
  //delivery date
  const dateAfter2days = moment().add(2, "days").format("YYYY-MM-DD");

  const { usercartdata } = useSelector((state) => state.User);
  const [spin, setSpin] = useState(true);

  const finaleData = {
    ...state,
    orderItems: usercartdata,
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/payment", { state: finaleData });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    setTimeout(() => {
      setSpin(false);
    }, 400);
  }, []);

  return (
    <>
      {spin ? (
        <Loader />
      ) : (
        <>
          {/* shipping details */}
          <div className="border-[1px] border-blue-400 w-[90vw] mx-auto md:w-[50%] m-4 p-4 space-y-2 bg-white/60 shadow-xl">
            <h3 className="font-semibold text-xl">Shipping Details</h3>

            <p className="text-gray-600">
              <span className="font-bold text-black">Address: </span>
              {state?.address}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">City: </span>
              {state?.city}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">State: </span>
              {state?.finalState}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">Country: </span>
              {state?.countryCode}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">Contact no.: </span>
              {state?.mobile}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">Pincode: </span>
              {state?.pincode}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">Shipping Price: </span>
              {state?.shippingPrice}
            </p>

            <p className="text-gray-600">
              <span className="font-bold text-black">Total Price -: </span>
              {state?.totalPrice}
            </p>
          </div>

          {/* order details */}
          <div className="border-[1px] border-blue-400  m-4 p-4 space-y-2 bg-white/60 shadow-xl">
            <h1 className="font-bold text-lg">Your Order:</h1>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {usercartdata?.map((ele, ind) => {
                return (
                  <div className="p-4 my-6 md:flex md:gap-4 border-b-[1px] border-gray-400 rounded-lg">
                    <img
                      className="h-48 w-48"
                      src={ele?.productDetails?.productimage}
                    />

                    <div className="w-full">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h1 className="font-semibold text-sm md:text-md">
                            {ele?.productDetails?.productname}
                          </h1>
                          <p className="text-sm md:text-md text-gray-500 font-light">
                            Discount: {ele?.productDetails?.discount}
                          </p>
                          <p className="text-sm md:text-md text-gray-500 font-light">
                            Price: {ele?.productDetails?.price}₹
                          </p>
                          <p className="text-sm md:text-md text-gray-500 font-light">
                            Delivery Date: {dateAfter2days}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                          Total:{ele?.productDetails?.price * ele?.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={handleSubmit}
                className="m-4 bg-blue-500 p-2 px-4 text-white rounded-3xl hover:bg-blue-700"
              >
                Procced to Pay
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckoutPage;
