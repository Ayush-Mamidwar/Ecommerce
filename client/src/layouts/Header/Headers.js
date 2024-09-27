import React, { useEffect, useState } from "react";
import { IoCartSharp } from "react-icons/io5";
import { FaUserAlt, FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  UserCart,
  UserLogOut,
  UserVerify,
} from "../../redux/slice/userAuthSlice/UserAuthSlice";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";

const Headers = () => {
  const { userloggedin } = useSelector((state) => state.User);
  const { loginuser } = useSelector((state) => state.User);
  const { usercartdata } = useSelector((state) => state.User);
  const { addcart } = useSelector((state) => state.User);
  const { removesinglecart } = useSelector((state) => state.User);
  const { removeitemcart } = useSelector((state)=> state.User)
  const { deletecartdata } = useSelector((state)=> state.User)



  const [showDropDown, setShowDropDown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLoggedIn = () => {
    dispatch(UserVerify());
  };

  const userLogoutHandle = () => {
    dispatch(UserLogOut())
    .then((res) => {
      navigate("/");
      setShowDropDown(false);
    })
    .catch((err)=>{
      console.log(err)
    })
  };


  const handleCartsDetaild = ()=>{
    dispatch(UserCart())
  }

  useEffect(() => {
    userLoggedIn();
  }, [loginuser]);

  useEffect(()=>{
    handleCartsDetaild()
  },[addcart,loginuser,removesinglecart,removeitemcart,deletecartdata])
  return (
    <div className="bg-[#1b1b1b] text-white">
      <div className="container mx-auto flex justify-between items-center max-h-18 px-6 md:px-10 py-4">
        <div className="text-xl">
          <NavLink to={"/"}>UrbanVibe</NavLink>
        </div>

        <div className="md:hidden">
          <RxHamburgerMenu onClick={() => setShowSidebar(!showSidebar)} />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="cursor-pointer">
            <NavLink to={"/products"}>Products</NavLink>
          </div>

          <div className="hidden md:block text-3xl cursor-pointer relative w-10">
            <NavLink to={"/carts"}>
              <IoCartSharp />
              <div className="absolute -top-1 right-0 w-5 h-5 rounded-full bg-red-600 text-xs flex items-center justify-center text-white">
                {userloggedin?.length > 0 ? usercartdata?.length:"0"}
              </div>
            </NavLink>
          </div>

          <div className="relative">
            <span
              className="text-2xl cursor-pointer "
              onClick={() => setShowDropDown(!showDropDown)}
            >
              {userloggedin.length > 0 ? (
                <>
                  <img
                    src={userloggedin[0].userprofile}
                    className="h-16 w-12 rounded-full border border-white"
                  />
                </>
              ) : (
                <FaUserAlt />
              )}
            </span>

            {showDropDown &&
              (userloggedin.length > 0 ? (
                <div className="z-10 absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                  <ul>
                    <li className="border-b border-gray-400 shadow-xl">
                      <NavLink
                        to={"/userprofile"}
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-200 rounded flex gap-2 shadow-sm"
                      >
                        <FaRegUser /> Profile
                      </NavLink>
                    </li>

                    <li className="border-b border-gray-400">
                      <a
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-200 rounded flex gap-2 shadow-sm"
                        onClick={userLogoutHandle}
                      >
                        <FiLogOut /> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="z-10 absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
                  <ul>
                    <li className="border-b border-gray-400">
                      <NavLink
                        to={"/login"}
                        className="block px-4 py-2 text-sm text-black hover:bg-gray-200 rounded flex gap-2 shadow-sm"
                      >
                        <FaRegUser /> Login
                      </NavLink>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          userLogoutHandle={userLogoutHandle}
          setShowSidebar={setShowSidebar}
          userloggedin={userloggedin}
          usercartdata={usercartdata}
        />
      )}
    </div>
  );
};

export default Headers;
