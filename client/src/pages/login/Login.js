import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserLogin } from '../../redux/slice/userAuthSlice/UserAuthSlice';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [inputValue, setInputValue] = useState({
    email:"",
    password:"",
  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setInputValue({...inputValue,[name]:value})
  }

  const handleSubmmit = (e)=>{
    e.preventDefault(e)
    const {email,password} = inputValue

    if(email === "" || !email.includes('@')){
      toast.error("Enter a valid Email ID")
    }else if(password === ""){
      toast.error("Enter Password")
    }else{
      dispatch(UserLogin(inputValue))
        .then((res)=>{
          if(res?.payload){
            navigate('/')
            setInputValue({...inputValue,email:"",password:""})
          }
        })
        .catch((err)=>{console.log(err)})
    }

  }
  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <div className='w-[90%] max-w-md p-8 bg-white rounded-lg shadow-xl'>
        <h1 className='text-3xl font-bold text-center mb-8'>Login</h1>
        
        <form className='space-y-4'>
          <div>
            <label htmlFor='email' className='font-semibold'>Email</label>
            <input 
              type='email'
              id='email'
              className='inpt'
              value={inputValue.email}
              name='email'
              onChange={handleChange}
              placeholder='Enter your email'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='font-semibold'>Password</label>
            <input 
              type='password'
              id='password'
              name='password'
              value={inputValue.password}
              onChange={handleChange}
              className='inpt'
              placeholder='Enter your password'
              required
            />
          </div>

          <button 
            type='submit'
            className='block w-full px-4 py-2 mt-4 text-xl bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600'
            onClick={handleSubmmit}
          >
            Login
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-gray-600'>
            Don't have an account? 
            <span className='text-blue-500 ml-1 cursor-pointer hover:underline'>
                <NavLink to={'/register'}>Sign Up</NavLink>
            </span>
          </p>
          <p className='text-gray-600 mt-2'>
            Forgot password? 
            <span className='text-blue-500 ml-1 cursor-pointer hover:underline'>
                <NavLink to={'/forgotpassword'}>Click Here</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
