import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  OrdersForAdmin,
  OrderUpdateStatus,
} from "../../redux/slice/adminAuthSlice/AdminSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { ordersdata } = useSelector((state) => state.Admin);
  const { orderstatuschange } = useSelector((state) => state.Admin);

  const getOrdersAdmin = () => {
    dispatch(OrdersForAdmin());
  };

  const handleOrderChange = (event, orderid) => {
    const orderData = event.target.value;
    const finalData = {
      orderStatus: orderData,
      orderid,
    };
    dispatch(OrderUpdateStatus(finalData));
  };

  useEffect(() => {
    getOrdersAdmin();
  }, [orderstatuschange]);

  return (
    <div className="w-full p-4 shadow-2xl bg-white">
      <h3 className="text-2xl font-semibold mb-4">Orders</h3>
      <div>
        <table className="rounded-xl w-full">
          <thead>
            <tr className="bg-[#1b1b1b] text-white rounded-xl">
              <th className="py-2 px-4">Id</th>
              <th className="py-2 px-4">Total price</th>
              <th className="py-2 px-4">Order items</th>
              <th className="py-2 px-4">User ID</th>
              <th className="py-2 px-4">status</th>
              
            </tr>
          </thead>
          <tbody>
            {ordersdata?.length > 0
              ? ordersdata?.map((ele, ind) => {
                  return (
                    <>
                      <tr className="hover:bg-gray-400 cursor-pointer">
                        <td className="py-2 px-4">{ind + 1}.</td>
                        <td className="py-2 px-4 text-center">
                          {ele?.totalPrice}₹
                        </td>
                        <td className="py-2 px-4  text-center">
                          {ele?.orderItems?.length}
                        </td>
                        <td className="py-2 px-4  text-center">
                          {ele?.userid}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <td className="py-2 px-4 text-center text-black flex justify-center">
                            {ele?.orderStatus ? (
                              <select
                                className="text-black"
                                value={ele?.orderStatus}
                                onChange={(e) => handleOrderChange(e, ele?._id)}
                              >
                                <option value="">{ele?.orderStatus}</option>
                                {ele?.orderStatus === "Processing" && (
                                  <option value="Confirmed">Confirmed</option>
                                )}
                                {ele?.orderStatus === "Confirmed" && (
                                  <option value="Shipped">Shipped</option>
                                )}
                                {ele?.orderStatus === "Shipped" && (
                                  <option value="Delivered">Delivered</option>
                                )}
                              </select>
                            ) : (
                              ele?.orderStatus
                            )}
                          </td>
                        </td>
                        
                      </tr>
                    </>
                  );
                })
              : "No Orders Yet"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
