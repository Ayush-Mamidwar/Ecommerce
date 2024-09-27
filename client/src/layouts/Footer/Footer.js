import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { FaInstagram } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io5";

const Footer = () => {
    const [email,setEmail] = useState("")

    const onChange = (e)=>{
        setEmail(e.target.value)
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        if(!email.includes('@')){
            toast.error("Please enter a valid email")
            return
        }
        toast.success("Thank you for subscribing.")
        setEmail("")
    }
  return (
    <>
        
        <footer className=' w-full p-4 md:flex justify-between bg-[#1b1b1b]/90 text-white'>
            <div className='p-4 w-[100%] lg:w-[50%]'>
                <h3 className='font-InknutAntiquaCustom font-extrabold text-xl'>Subsribe to our emails</h3>
                <div className='flex items-center mt-4 w-full rounded-xl border-[1px] border-[#1b1b1b]'>
                    <input 
                        className='w-full p-[6px] border-gray-400 outline-none rounded-l-xl text-black'
                        placeholder='Email'
                        value={email}
                        onChange={onChange}
                    />
                    <button onClick={handleSubmit} className='text-white p-[6px] bg-[#1b1b1b] rounded-md rounded-r-lg'>submit</button>
                </div>
            </div>

            <div className='text-3xl flex md:flex-col gap-2 flex-row p-4'>
                <a href='https://www.instagram.com/?hl=en'>
                    <FaInstagram />
                </a>
                <a href='https://www.facebook.com/'>
                    <IoLogoFacebook />
                </a>
            </div>
        </footer>
    </>
  )
}

export default Footer