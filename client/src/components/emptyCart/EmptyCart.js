import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyCart = () => {
    const navigate = useNavigate()
  return (
    <>
        <div className='mt-100 flex  justify-around items-center w-full h-[80vh] '>
            <img className='w-96 ' 
            style={{mixBlendMode:'multiply'}}
            src={'https://th.bing.com/th/id/OIP.SZlfJoC1KSksbhfTHknZSQHaHa?rs=1&pid=ImgDetMain'}/>
            <div>
            <h1 className='text-4xl font-bold'>Cart is empty :(</h1>
            <button 
            className='m-4 text-white font-bold bg-blue-600 p-2 rounded-lg text-xl hover:bg-blue-700' 
            onClick={()=>{navigate('/')}}>Shop Now</button>
            </div>
        </div>
    </>
  )
}

export default EmptyCart