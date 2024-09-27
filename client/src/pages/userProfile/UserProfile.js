import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Userorders } from '../../redux/slice/userAuthSlice/UserAuthSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

const UserProfile = () => {
    const { userloggedin } = useSelector((state) => state.User);
    const {userordersdata} = useSelector((state)=>state.User)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const [spin,setSpin] = useState(true)

    const getOrdersData = ()=>{
        dispatch(Userorders())
    }

    const handleOrders = ()=>{
        navigate('/userorders')
    }

    useEffect(()=>{
        getOrdersData()
    },[])

    

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false)
    },400)
  },[])
  return (<>
    {spin ? <Loader />:<div className='flex justify-center items-center py-4 mb-10 md:mb-0'>
        <div className='flex flex-col md:flex-row gap-4 shadow-xl-[33%] bg-white'>
            <div className='w-full md:w-[30%] flex flex-col justify-center items-center gap-4 bg-[#1e1e1e] p-4'>
                <img 
                src={userloggedin[0]?.userprofile}
                className='rounded-full border-[1px] border-white h-22 w-20 md:h-52 md:w-32'/>
                <h3 className='text-4xl text-white'>{userloggedin[0]?.firstname} {userloggedin[0]?.lastname}</h3>
            </div>

            <div className='flex flex-col gap-10 p-4 w-full'>
                <h2 className='text-2xl'>Informaition Technology</h2>
                <hr />
                <h3 className='text-xl'>Email: <span className='text-gray-500 text-lg'>{userloggedin[0]?.email}</span></h3>
                <h1 className='text-3xl font-light'>ORDERS</h1>
                <hr />
                <div className='flex justify-between'>
                    <span>
                        <h3 className='text-4xl'>Total Orders</h3>
                        <p className='text-3xl'>{userordersdata[0]?.length}</p>
                    </span>

                    <button 
                    onClick={handleOrders}
                    className='bg-[#1e1e1e] hover:bg-gray-800 text-white p-1 rounded-xl'>View Orders</button>
                </div>
            </div>
        </div>     
    </div>}
    </>
  )
}

export default UserProfile