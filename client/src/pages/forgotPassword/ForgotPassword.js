import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { ForgotPass } from '../../redux/slice/userAuthSlice/UserAuthSlice'

const ForgotPassword = () => {
  const [email,setEmail] = useState("")
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setEmail(e.target.value)
  } 


  const handleSubmit = (e)=>{
    e.preventDefault();

    if(email === "" || !email.includes('@')){
      toast.error("Enter Valid Email Id.")
    }else{
      const data = {email:email}
      dispatch(ForgotPass(data))
        .then((res)=>{
          if(res?.payload){
            setEmail("")
          }
        })
        .catch((err)=>{
          console.log('err',err)
        })
    }
  }

  return (
    <div className='flex justify-center mt-8 min-h-[60vh]'>
        <div className='w-[50%] my-4'>
            <h1 className='text-2xl font-semibold text-center'>Forgot Password?</h1>
            <label>Email: </label>
            <input 
            placeholder='Enter registered email'
            className='inpt border-[1px] border-gray-300'
            value={email}
            onChange={handleChange}
            />

          <button 
            type='submit'
            className='block w-full px-4 py-2 mt-4 text-xl
            bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
    </div>
  )
}

export default ForgotPassword