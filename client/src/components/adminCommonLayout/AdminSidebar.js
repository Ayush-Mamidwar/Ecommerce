import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RiFunctionAddFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiSearch } from "react-icons/ci";
import { FaUserAlt, FaRegUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { AdminLoggedIn, AdminLogout } from "../../redux/slice/adminAuthSlice/AdminSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminSidebar = ({ children }) => {
  const {adminLoggedInData} = useSelector((state)=>state.Admin)

  const [toggleOpen, setToggleOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //logout function
  const handleLogout = ()=>{

    dispatch(AdminLogout())
      .then((res)=>{navigate('/admin/login')})
      .catch((err)=>{navigate('admin/login')})
  }

  //admin verify function
  const AdminVerify = ()=>{
    dispatch(AdminLoggedIn())
  }

  useEffect(()=>{
    AdminVerify()
  },[])

  return (
    <div className="max-w-full">
      <div
        className={`${
          !toggleOpen && "hidden"
        } bg-gray-800 h-full w-64 fixed top-0 left-0 overflow-y-auto`}
      >
        <NavLink to={'/'}>
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          
            <FaUser className="text-white text-3xl" />
            <span className="ml-2 text-white text-xl font-semibold">
              {adminLoggedInData[0]?.name} Admin
            </span>
          
        </div>
        </NavLink>

        <ul className="">
          <li className="mt-4">
            <NavLink
              exact
              to="/admin/dashboard"
              activeClassName="bg-gray-900 text-white"
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
            >
              <MdDashboard className="text-white" />
              Dashboard
            </NavLink>
          </li>

          <li className="mt-4">
            <NavLink
              exact
              to="/admin/addcategory"
              activeClassName="bg-gray-900 text-white"
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
            >
              <MdCategory />
              Add Category
            </NavLink>
          </li>

          <li className="mt-4">
            <NavLink
              exact
              to="/admin/addproducts"
              activeClassName="bg-gray-900 text-white"
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
            >
              <RiFunctionAddFill className="text-white" />
              Add Products
            </NavLink>
          </li>

          <li className="mt-4">
            <NavLink
              exact
              to="/admin/products"
              activeClassName="bg-gray-900 text-white"
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
            >
              <AiFillProduct />
              Products
            </NavLink>
          </li>

          <li className="mt-4">
            <NavLink
              exact
              to="/admin/orders"
              activeClassName="bg-gray-900 text-white"
              className="block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center gap-2"
            >
              <FaListUl />
              Orders
            </NavLink>
          </li>

        </ul>
      </div>

      {/* header */}
   
      <div
        className={`${
          toggleOpen ? "ml-[18%] w-[82%]" : "w-[100%]"
        } block  top-0 shadow-2xl p-4  flex justify-between px-10`}
      >
        <div className="flex items-center gap-2">
          <GiHamburgerMenu
            onClick={() => {
              setToggleOpen(!toggleOpen);
            }}
            className="text-xl cursor-pointer"
          />
          DashBoard
        </div>

        

        <div className="relative">
          <span className="text-2xl cursor-pointer flex gap-2 items-center border-[2px] border-gray-300
          bg-white px-2 py-1  shadow-xl rounded-2xl">
            {adminLoggedInData[0]?.name}
            <img 
            className="h-10 w-10 rounded-full"
            src={adminLoggedInData[0]?.profile} onClick={() => setShowDropDown(!showDropDown)} />
          </span>

          {showDropDown && (
            <div className="z-10 absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded-lg shadow-lg">
              <ul>
                <li className="border-b border-gray-400 flex items-center p-2 hover:bg-gray-300 cursor-pointer gap-1" 
                onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={`${
          toggleOpen ? "ml-[18%] w-[82%]" : "w-[100%]"
        } p-4  flex justify-between`}>
        {children}
     </div>
    </div>
  );
};

export default AdminSidebar;
