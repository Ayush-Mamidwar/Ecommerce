import React from 'react'
import { FaCaretRight } from "react-icons/fa6";
import { FaCaretLeft } from "react-icons/fa6";

const Pagination = ({pageCount,page,handleNext,handlePrev,setPage}) => {
  return (
    <div className='mt-10 p-2'>
        {
            pageCount > 0 ? 
            <div className='flex justify-end mx-4 p-2 bg-[#1b1b1b]/50 rounded-lg'>
                <a 
                onClick={handlePrev}
                className={`px-1 bg-white hover:bg-gray-300 border border-gray-400 cursor-pointer flex items-center`}>
                    <FaCaretLeft />
                </a>
                {
                    Array(pageCount).fill(null).map((element,index)=>{
                        return <a 
                        onClick={()=>setPage(index+1)}
                        className={`px-4 bg-white border border-gray-400 cursor-pointer
                        ${page === index+1 ? 'bg-blue-700 text-black hover:bg-blue-600':'hover:bg-gray-300 '}
                        `}>{index+1}</a>
                    })
                }
                
                
                <a 
                onClick={handleNext}
                className={`px-1 bg-white hover:bg-gray-300 border border-gray-400 cursor-pointer flex items-center`}>
                    <FaCaretRight />
                </a>
            </div> : 
            ""
        }
        
    </div>
  )
}

export default Pagination