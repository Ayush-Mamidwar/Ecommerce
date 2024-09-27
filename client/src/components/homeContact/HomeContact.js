import React, { useState } from 'react';
import {useDispatch} from 'react-redux'
import {toast} from 'react-hot-toast'
import { UserContact } from '../../redux/slice/userAuthSlice/UserAuthSlice';

const HomeContact = () => {
  const [inputValue,setInputValue] = useState({
    name:"",
    email:"",
    message:"",
  })

  const disptach = useDispatch()
  
  const handlechange = (e)=>{
    const {name,value} = e.target;

    setInputValue({...inputValue,[name]:value})
  }

  const handleSubmit=(e)=>{
    e.preventDefault();

    const {name,email,message} = inputValue

    if(name==""){
      toast.error("Name is mandatory.")
    }else if(email == ""){
      toast.error("Email is required.")
    }else if(message == ""){
      toast.error("Please enter a message")
    }else{
      disptach(UserContact(inputValue)).then((res)=>{
        if(res?.payload){
          setInputValue({...inputValue,name:"",email:"",message:""})
        }
      }).catch((error)=>{
        console.log("error",error)
      })
    }
    
  }

  return (
    <div className='md:flex'>
      <div className='w-full md:w-1/2 p-4 text-center'>
        <h1 className='text-3xl font-semibold'>Contact Us:</h1>
      </div>

  
      <div className='w-full md:w-1/2 p-4'>
        <div className='space-y-4'>
         
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <input
              type='text'
              name='name'
              value={inputValue.name}
              placeholder='Your Name'
              onChange={handlechange}
              className='w-full outline-none border border-gray-300 rounded-lg p-3 text-lg focus:border-gray-500'
            />
            <input
              type='email'
              placeholder='Your Email'
              name='email'
              value={inputValue.email}
              onChange={handlechange}
              className='w-full outline-none border border-gray-300 rounded-lg p-3 text-lg focus:border-gray-500'
            />
          </div>

          <textarea
            placeholder='Your Message'
            name='message'
            value={inputValue.message}
            onChange={handlechange}
            className='w-full outline-none border border-gray-300 rounded-lg p-3 text-lg h-40 focus:border-gray-500'
          ></textarea>

          <button 
          onClick={handleSubmit}
          className='w-full bg-[#1b1b1b] text-white py-3 rounded-xl hover:bg-gray-700'>
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeContact;
