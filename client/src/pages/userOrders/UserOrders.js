import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Userorders } from "../../redux/slice/userAuthSlice/UserAuthSlice";
import Loader from "../../components/loader/Loader";

const UserOrders = () => {
  const { userordersdata } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const [spin, setSpin] = useState(true);

  const getOrdersData = () => {
    dispatch(Userorders());
  };

  useEffect(() => {
    getOrdersData();
  }, []);

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
        <div className="p-4">
          <h2 className="font-bold text-2xl ">Your Orders: </h2>

          {userordersdata[0]?.length > 0
            ? userordersdata[0]?.map((element, index) => {
                return (
                  <>
                    <div className="bg-white shadow-lg rounded-lg">
                      <h5 className="px-4 py-2 font-semibold">
                        Order Id: {element?._id}
                      </h5>
                      {element?.orderItems.map((ele, ind) => {
                        return (
                          <>
                            {console.log("ll", ele)}
                            <div className="p-4 my-6 md:flex md:gap-4 border-b-[1px] border-gray-400 rounded-lg">
                              <img
                                className="h-48 w-48"
                                src={ele?.productDetails?.productimage}
                              />

                              <div className="w-full">
                                <div className="flex justify-between gap-2">
                                  <div className="space-y-2">
                                    <h1 className="font-semibold text-3xl md:text-md">
                                      {ele?.productDetails?.productname}
                                    </h1>
                                    <p className="text-sm md:text-md text-gray-500 font-light">
                                      <span className="font-semibold text-black">
                                        Discount:
                                      </span>{" "}
                                      -{ele?.productDetails?.discount}%
                                    </p>
                                    <p className="text-sm md:text-md text-gray-500 font-light">
                                      <span className="font-semibold text-black">
                                        Price:
                                      </span>{" "}
                                      {ele?.productDetails?.price}₹
                                    </p>
                                    <p className="text-sm md:text-md text-gray-500 font-light">
                                      <span className="font-semibold text-black">
                                        Delivery Address:
                                      </span>{" "}
                                      {element?.address},{element?.city}-
                                      {element?.pincode}
                                    </p>
                                    <p className="text-sm md:text-md text-gray-500 font-light">
                                      {" "}
                                      <span className="font-semibold text-black">
                                        Order Status:
                                      </span>{" "}
                                      {element?.orderStatus}
                                    </p>
                                  </div>
                                </div>

                                <p className="text-gray-600 text-2xl mt-6 text-end">
                                  Total:
                                  {ele?.productDetails?.price * ele?.quantity}
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </>
                );
              })
            : "No Orders Yet :("}
        </div>
      )}
    </>
  );
};

export default UserOrders;
