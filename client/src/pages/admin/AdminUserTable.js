import React from "react";
import { MdDelete } from "react-icons/md";
import Pagination from "../../components/pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser } from "../../redux/slice/userAuthSlice/UserAuthSlice";

const AdminUserTable = ({getAllUserData,page,pageCount,setPage,handleNext,handlePrev,}) => {
  const dispatch = useDispatch()

  const handleDeleteUser = (id)=>{
    const data = {
      userId : id
    }
    dispatch(DeleteUser(data))
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-4">Users</h3>
      <div>
        <table className="rounded-xl w-full">
          <thead>
            <tr className="bg-[#1b1b1b] text-white rounded-xl">
              <th className="py-2 px-4">Id</th>
              <th className="py-2 px-4">Full Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Profile</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllUserData?.usersData?.length > 0
              ? getAllUserData?.usersData?.map((ele, ind) => {
                  return (
                    <tr className="">
                      <td className="py-2 px-4">{ind + 1 + (page - 1) * 4}</td>
                      <td className="py-2 px-4 text-center">
                        {ele?.firstname} {ele?.lastname}
                      </td>
                      <td className="py-2 px-4  text-center">{ele?.email}</td>
                      <td className="py-2 px-4 flex justify-center ">
                        <img
                          src={ele?.userprofile}
                          alt="Profile"
                          className="h-8 w-8 rounded-full"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <MdDelete 
                        onClick={()=>{handleDeleteUser(ele._id)}}
                        className="text-red-500 text-2xl cursor-pointer hover:text-red-700" />
                      </td>
                    </tr>
                  );
                })
              : "No Users"}
          </tbody>
        </table>
        <Pagination
          page={page}
          pageCount={pageCount}
          setPage={setPage}
          handlePrev={handlePrev}
          handleNext={handleNext}
        />
      </div>
    </div>
  );
};

export default AdminUserTable;
