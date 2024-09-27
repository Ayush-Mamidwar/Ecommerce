import React from "react";
import { IoCartSharp } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = ({ showSidebar, setShowSidebar, userloggedin,userLogoutHandle,usercartdata }) => {
  return (
    <div className="md:hidden absolute top-0 left-0 h-full w-48 bg-white shadow-2xl z-10">
      <div className="md:hidden text-black absolute right-1 top-1">
        <ImCross onClick={() => setShowSidebar(!showSidebar)} />
      </div>

      {userloggedin.length > 0 ? (
        <>
          <ul className="py-4 flex flex-col items-center">
            <li className="mb-6"><img src={userloggedin[0].userprofile} className="h-12 w-18"/></li>
            <li className="px-6 py-2  w-full flex justify-center">
              <a
                href="#"
                className="block text-black hover:bg-gray-200 rounded px-2"
              >
                <div className="text-3xl cursor-pointer relative w-10">
                  <NavLink to={'/carts'}>
                    <IoCartSharp />
                    <div className="absolute -top-1 right-0 w-5 h-5 rounded-full bg-red-600 text-xs flex items-center justify-center text-white">
                    {userloggedin?.length > 0 ? usercartdata?.length:"0"}
                    </div>
                  </NavLink>
                </div>
              </a>
            </li>
            <li className="px-6 py-2 border-b border-gray-300 rounded-xl shadow-sm w-full">
              <NavLink
                to={"/products"}
                className="block text-black hover:bg-gray-200 rounded px-2"
              >
                <FaRegUser className="inline-block" /> Products
              </NavLink>
            </li>
            <li className="px-6 py-2 border-b border-gray-300 rounded-xl shadow-sm w-full">
              <NavLink
                to={"/userprofile"}
                className="block text-black hover:bg-gray-200 rounded px-2"
              >
                <FaRegUser className="inline-block" /> Profile
              </NavLink>
            </li>
            <li className="px-6 py-2 border-b border-gray-300 rounded-xl shadow-sm w-full">
              <a
                className="block text-black hover:bg-gray-200 rounded px-2 "
                onClick={userLogoutHandle}
              >
                <FiLogOut className="inline-block" /> Logout
              </a>
            </li>
          </ul>
        </>
      ) : (
        <ul className="py-4">
          <li className="px-6 py-2 border-b border-gray-300 rounded-xl shadow-sm w-full">
          <li className="px-6 py-2  w-full flex justify-center">
              <a
                href="#"
                className="block text-black hover:bg-gray-200 rounded px-2"
              >
                <div className="text-3xl cursor-pointer relative w-10">
                  <NavLink to={'/carts'}>
                    <IoCartSharp />
                    <div className="absolute -top-1 right-0 w-5 h-5 rounded-full bg-red-600 text-xs flex items-center justify-center text-white">
                      0
                    </div>
                  </NavLink>
                </div>
              </a>
            </li>
              <NavLink
                to={"/products"}
                className="block text-black hover:bg-gray-200 rounded px-2"
              >
                <FaRegUser className="inline-block" /> Products
              </NavLink>
            </li> 
          
          <li className="px-6 py-2 border-b border-gray-300 rounded-xl shadow-sm">
            <NavLink
              to={"/login"}
              className="block text-black hover:bg-gray-200 rounded px-2"
            >
              <FaRegUser className="inline-block" /> Login
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
