import React from 'react';
import Select from 'react-select'
import { ImCross } from "react-icons/im";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { AddReview } from '../../redux/slice/productSlice/ProductSlice';

const ReviewModal = ({setShowModal,setDiscription,setRating,userloggedin,rating,description,singleproduct}) => {
    const dispatch = useDispatch();
    const options = [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      { value: 4, label: 4 },
      { value: 5, label: 5 }
    ]  

    const handleSetRating = (e)=>{
      const {value,label} = e
      setRating(value)
    }

    const handleAddReview=(e)=>{
      e.preventDefault()

      if(rating === ""){
        toast.error("Rating is required")
      }else if(description === ""){
        toast.error("Description required")
      }else{
        const data={
          username: userloggedin.length > 0 ?userloggedin[0]?.firstname : "",
          rating:rating,
          description:description,

        }

        const productreviewadddata = {
          data,
          productid: singleproduct[0]?._id
        }

        dispatch(AddReview(productreviewadddata))
          .then((res)=>{
            if(res?.payload){
              setDiscription("")
              setRating("")
            }
          })
          .catch((err)=>{
            console.log('error')
          })
        setShowModal(false)
      }

      
    }

  return (
    <div 
    className='fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-10 '>
      <div className='bg-white w-1/3 p-4 rounded-lg shadow-lg border-[2px] border-gray-400 '>
        <div className='flex justify-between'>
            <h2 className='text-2xl'>Write Your Review:</h2>

            <ImCross 
            className='cursor-pointer'
            onClick={()=>setShowModal(false)} />
        </div>


        <div className='flex justify-center'>
            <form className='m-4 w-full flex flex-col gap-4'>
                <input 
                value={`${userloggedin.length > 0 ? 
                  userloggedin[0]?.firstname : ""}` }
                disabled 
                className='text-center border-2 border-gray-300 w-full p-1'/>

            <Select options={options} onChange={handleSetRating} placeholder='Rating'/>

            <label for="desc">Description:</label>
            <textarea 
            id='desc'
            name='description'
            onChange={(e)=>setDiscription(e.target.value)}
            rows={5}
            className='w-full outline-none border-[2px] border-gray-300 p-2'/>

            <button 
            onClick={(e)=>{handleAddReview(e)}}
            className='bg-blue-600 rounded-lg text-white p-1 hover:bg-blue-800'
            type='submit'>Submit</button>

            </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
