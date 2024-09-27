import React, { useEffect, useState } from "react";
import AdminUserTable from "./AdminUserTable";
import { GeAlltProducts } from "../../redux/slice/productSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAlluser } from "../../redux/slice/userAuthSlice/UserAuthSlice";
import { OrdersForAdmin } from "../../redux/slice/adminAuthSlice/AdminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { productsData } = useSelector((state) => state.Product);
  const { getAllUserData } = useSelector((state) => state.User);
  const { deleteuser } = useSelector((state) => state.User);
  const { ordersdata } = useSelector((state) => state.Admin);

  const [allUserCount, setAllUserCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  console.log("first", getAllUserData);
  const productApi = () => {
    const data = {
      selectedCategory: "all",
      page,
    };
    dispatch(GeAlltProducts(data))
      .then((res) => {
        //console.log('res',res)
      })
      .catch((err) => {});
  };

  const getAllUsers = () => {
    const data = {
      page,
    };

    dispatch(getAlluser(data))
      .then((res) => {
        if (res?.payload) {
          console.log("res", res);
          setPageCount(res?.payload?.Pagination?.pageCount);
          setAllUserCount(res?.payload?.Pagination?.count);
        }
      })
      .catch((err) => {});
  };

  //next
  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      else return page + 1;
    });
  };

  //prev
  const handlePrev = () => {
    setPage(() => {
      if (page === 1) return page;
      else return page - 1;
    });
  };
  const getOrdersAdmin = () => {
    dispatch(OrdersForAdmin());
  };

  useEffect(() => {
    productApi();
    getAllUsers();
    getOrdersAdmin();
  }, [page, deleteuser]);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <div className="shadow-2xl p-4 rounded-xl border-[1px] border-gray-700 bg-white">
            <h1 className="text-2xl">Total Orders</h1>
            <h1 className="text-2xl text-center">{ordersdata?.length}</h1>
            <div className="flex gap-2 items-center">
              <div className="bg-green-300 rounded-full h-6 w-6"></div>
              <p className="text-sm">up from yesterday</p>
            </div>
          </div>

          <div className="shadow-2xl p-4 rounded-xl border-[1px] border-gray-700 bg-white">
            <h1 className="text-2xl">Total Products</h1>
            <h1 className="text-2xl text-center">
              {productsData?.Pagination?.totalProducts}
            </h1>
            <div className="flex gap-2 items-center">
              <div className="bg-blue-300 rounded-full h-6 w-6"></div>
              <p className="text-sm">up from yesterday</p>
            </div>
          </div>

          <div className="shadow-2xl p-4 rounded-xl border-[1px] border-gray-700 bg-white">
            <h1 className="text-2xl">Users</h1>
            <h1 className="text-2xl text-center">{allUserCount}</h1>
            <div className="flex gap-2 items-center">
              <div className="bg-yellow-400 rounded-full h-6 w-6"></div>
              <p className="text-sm">up from yesterday</p>
            </div>
          </div>

          
        </div>
      </div>

      <div className="flex gap-4">
        <div className="p-4 shadow-2xl bg-white w-[70%]">
          <div>
            <h1 className="text-2xl font-semibold">Recent Sales: </h1>
            <AdminUserTable
              getAllUserData={getAllUserData}
              page={page}
              pageCount={pageCount}
              setPage={setPage}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        </div>

        <div className="p-4 bg-white shadow-lg w-[30%]">
          <h1 className="text-xl font-semibold mb-8">Products:</h1>
          {console.log("pp", productsData)}

          <ul>
            {productsData?.getAllProducts?.slice(0,4).map((ele, ind) => {
              return (
                <li>
                  <a
                    href=""
                    className="flex gap-6 items-center justify-between px-4"
                  >
                    <img className="h-14 w-14" src={ele?.productimage} />
                    <span className="font-semibold">{ele?.productname}</span>
                    <span>Rs.{ele?.price}</span>
                  </a>
                  <hr className="border-b-[1px] border-gray-300 my-2" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
