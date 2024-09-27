import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom'
import { ForgotPasswordValid, ResetPass } from "../../redux/slice/userAuthSlice/UserAuthSlice";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const {id,token} = useParams()

  const dispatch =  useDispatch()
  const navigate = useNavigate()

  const [password,setPassword] = useState("")

  const [confirmPassword, setConfirmPassword] = useState("")

  const userValid = ()=>{
    const data = {
      id,
      token
    }

    dispatch(ForgotPasswordValid(data))
      .then((res)=>{
        if(res.payload){
          console.log('user valid')
        }
        else{
          navigate('*')
        }
      })
      .catch((err)=>{
        navigate('*')
      })
  }

  const handleSubmit = (e)=>{ 
    e.preventDefault();
    if(password === ""){
      toast.error("Please enter password.")
    }else if(confirmPassword === ""){
      toast.error("Please re-enter password")
    }else if(password !== confirmPassword){
      toast.error("Password's dont match")
    }else{
      const passwordData = {password}
      const data = {
        id,
        token,
        passwordData
      }

      dispatch(ResetPass(data))
        .then((res)=>{
          if(res?.payload){
            navigate('/login')
          }else{
            navigate('*')
          }
        })
        .catch((err)=>{navigate('*')})
    }

  }

  useEffect(()=>{
    userValid()
  },[])

  return (
    <div className="flex justify-center mt-8 min-h-[60vh]">
      <div className="w-[50%] my-4">
        <h1 className="text-3xl mb-8 font-semibold text-center">Reset Password?</h1>
        <form className="space-y-4">
          <input
          type="password"
            placeholder="Enter password"
            name="password"
            onChange={(e)=>{setPassword(e.target.value)}}
            value={password}
            className="inpt border-[1px] border-gray-300"
          />

          <input
            type="password"
            placeholder="Re-enter password"
            name="confirmpassword"
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            value={confirmPassword}
            className="inpt border-[1px] border-gray-300"
          />

          <button
            type="submit"
            className="block w-full px-4 py-2 mt-4 text-xl
                bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
