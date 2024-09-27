import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { AdminAuthLogin } from '../../redux/slice/adminAuthSlice/AdminSlice'
import {useDispatch} from "react-redux"

const AdminLogin = () => {
  const [inputValue, setInputValue] = useState({
    email:"",

  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange =(e)=>{
    const {name,value} = e.target
    setInputValue({...inputValue,[name]:value})
  }

  //admin login
  const handleLogin = (e)=>{
    e.preventDefault();

    const {email,password} = inputValue

    if(email === ""){
      toast.error("Email is Required.")
    }else if(!email.includes("@")){
      toast.error("Enter valid Email ID.")
    }
    else if(password === ""){
      toast.error("Password is Required.")
    }else{
      dispatch(AdminAuthLogin(inputValue))
        .then((res)=>{
          if(res.payload.token){
            navigate("/admin/dashboard")
          }  
        })
        .catch((err)=>{console.log(err)})
    }

  }

  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <div className='w-[90%] max-w-md p-8 bg-white rounded-lg shadow-xl'>
        <h1 className='text-3xl font-bold text-center mb-8'>Admin Login</h1>
        
        <form className='space-y-4'>
          <div>
            <label htmlFor='email' className='font-semibold'>Email</label>
            <input 
              type='email'
              name='email'
              id='email'
              onChange={handleChange}
              className='inpt'
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='font-semibold'>Password</label>
            <input 
              type='password'
              name='password'
              onChange={handleChange}
              id='password'
              className='inpt'
              placeholder='Enter your password'
              required
            />
          </div>

          <button 
            type='submit'
            className='block w-full px-4 py-2 mt-4 text-xl bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600'
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin