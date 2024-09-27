import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { UserRegister } from '../../redux/slice/userAuthSlice/UserAuthSlice';

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirmpassword:""
  })
  const [image,setImage] = useState("")
  const [preview,setPreview] = useState("")
  const handleInputChange = (e)=>{
    const {name,value} = e.target


    setInputValue({...inputValue,[name]:value})
  }

  const setProfile = (e)=>{
    setImage(e.target.files[0])
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    const { firstname,lastname,email,password,confirmpassword} = inputValue

    if(firstname == ""){
      toast.error("Enter first name.")
    }else if(lastname == ""){
      toast.error("Enter last name.") 
    }else if(email == "" || !email.includes('@')){
      toast.error("Enter valid email.") 
    }else if(image == ""){
      toast.error("Select an image.") 
    }else if(password == ""){
      toast.error("Enter password") 
    }else if(confirmpassword == ""){
      toast.error("Re-enter password.") 
    }else if(password !== confirmpassword){
      toast.error("Password do not match.") 
    }else{
      const data = new FormData();
      data.append("firstname",inputValue.firstname)
      data.append("lastname",inputValue.lastname)
      data.append("email",inputValue.email)
      data.append("password",inputValue.password)
      data.append("confirmpassword",inputValue.confirmpassword)
      data.append("userprofile",image)

      const config = {
        'Content-Type':'multipart/form-data'
      }

      const dataSend = {
        data,
        config
      }
      dispatch(UserRegister(dataSend))
        .then((res)=>{
          if(res?.payload){
            setInputValue({...inputValue, firstname:"",lastname:"",email:"",password:"",confirmpassword:""})
            setImage("")
            navigate('/login')
          }
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }

  useEffect(()=>{
    if(image){
      setPreview(URL.createObjectURL(image))
    }
  },[image])

  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <div className='w-[90%] max-w-md p-8 bg-white rounded-lg shadow-xl'>
        <h1 className='text-3xl font-bold text-center mb-8'>Sign Up</h1>
        {image && <img src={preview} className='h-20 w-18 mx-auto rounded-full'/>}
        <form className='space-y-4'>
            <input 
            type='text' 
            id='fname' 
            name='firstname' 
            className='inpt'
            value={inputValue.firstname} 
            onChange={handleInputChange}
            placeholder='First name' 
            required/>

   
            <input 
            type='text' 
            id='lname' 
            name='lastname'
            value={inputValue.lastname}
            onChange={handleInputChange}
            placeholder='Last Name' 
            className='inpt' 
            required />
 

            <input 
            type='email' 
            id='email' 
            name='email' 
            value={inputValue.email}
            className='inpt' 
            onChange={handleInputChange}
            placeholder='Enter your email' 
            required />

            <input 
            type='file' 
            id='image' 
            name='userprofile' 
            className='inpt' 
            onChange={setProfile}
            placeholder='Enter your email' 
            required/>
      

            <input 
            type='password' 
            id='pass' 
            name='password' 
            className='inpt'
            value={inputValue.password} 
            onChange={handleInputChange}
            placeholder='Enter password' 
            required/>
    

            <input 
            type='password' 
            id='confirmpass' 
            name='confirmpassword' 
            className='inpt' 
            value={inputValue.confirmpassword}
            onChange={handleInputChange}
            placeholder='Re Enter password' 
            required />

          <button 
            type='submit'
            onClick={handleSubmit}
            className='block w-full px-4 py-2 mt-4 text-lg bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600'
          >
            Sign Up
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Already have an account? 
            <span className='text-blue-500 ml-1 cursor-pointer hover:underline'>
                <NavLink to={'/login'}>Login</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register ;
