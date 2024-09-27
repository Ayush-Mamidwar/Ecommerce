import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, RemoveItem, RemoveSingle } from "../../redux/slice/userAuthSlice/UserAuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import EmptyCart from "../emptyCart/EmptyCart";
import moment from 'moment'

const CartsMain = () => {
  const { usercartdata } = useSelector((state) => state.User);
  const [price, setPrice] = useState("")

  //delivery date
  const dateAfter2days = moment().add(2,'days').format('YYYY-MM-DD')

  const total = ()=>{
    let totalPrice = 0

    usercartdata.map((element,ind)=>{
        totalPrice += element?.productDetails?.price * element?.quantity
    })
    setPrice(totalPrice)  
  }
  const dispatch = useDispatch()
  //increment item
  const handleIncrement =(e)=>{
    dispatch(AddToCart(e))
  }

  //decrement item 
  const handleDecrement = (e)=>{
    dispatch(RemoveSingle(e))
  }

  //go to shipping page
  const navigate = useNavigate();
  const navigateToShipping = ()=>{
    navigate('/shipping',{state:price})
  }

  
  const handleRemoveItemCart = (e)=>{
    dispatch(RemoveItem(e))
  }

  useEffect(()=>{
    total()
  },[total])
  return (
   <>
    {
        usercartdata.length > 0 ? 
        <div className="md:flex gap-4">
        <div className="bg-white p-4 flex flex-col justify-center md:w-[60%] my-6 mx-4 shadow-2xl">
          <h1>Cart ({usercartdata?.length} Items)</h1>
          {usercartdata?.map((element, index) => {
            return (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-4 my-6 md:flex md:gap-4 border-b-[1px] border-gray-400 rounded-lg">
                  <NavLink to={`/productsdetails/${element?.productDetails?._id}`}>
                  <img
                    className="h-48 w-48"
                    src={element?.productDetails?.productimage}
                  />
                  </NavLink>
  
                  <div className="w-full">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h1 className="font-semibold text-sm md:text-md">
                          {element?.productDetails?.productname}
                        </h1>
                        <p className="text-sm md:text-md text-gray-500 font-light">
                          Discount: -{element?.productDetails?.discount}%
                        </p>
                        <p className="text-sm md:text-md text-gray-500 font-light">
                          Price: {element?.productDetails?.price}₹
                        </p>
                        <p className="text-sm md:text-md text-gray-500 font-light">
                          Delivery Date: {dateAfter2days}
                        </p>
                      </div>
  
                      <div>
                        <button 
                        onClick={(e)=>{handleDecrement(element?.productDetails?._id)}}
                        className="px-1 md:px-2 border-[1px] border-gray-400 bg-gray-200">
                          -
                        </button>
                        <span className="px-1 md:px-2 border-b-[1px] border-t-[1px] border-gray-400">
                        {element?.quantity}
                        </span>
                        <button 
                        onClick={()=>{handleIncrement(element?.productDetails?._id)}}
                        className="px-1 md:px-2 border-[1px] border-gray-400 bg-gray-200">
                          +
                        </button>
                      </div>
                    </div>
  
                    <div className="flex justify-between items-center">
                      <div className="mt-4 flex flex-col md:flex-row gap-2">
                        <button 
                        onClick={()=>{handleRemoveItemCart(element?.productDetails?._id)}}
                        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600">
                          Remove Item
                        </button>
  
                      </div>
  
                      <p className="text-gray-600">Total:-{element?.productDetails?.price * element?.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  
        <div className="md:w-[40%] ">
          <div className="bg-white p-6 flex flex-col justify-center my-6 mx-4 shadow-2xl">
            <h3 className="text-2xl">Total Amount:</h3>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Temporary amount: </p>
                <p>{price}</p>
              </div>
              <hr className="bg-gray-600 border-b-2px border-gray-400" />
              <div className="flex justify-between">
                <p className="text-gray-600">Total amount:</p>
                <p>{price}</p>
              </div>

              <button onClick={navigateToShipping} className="bg-blue-500 text-white p-1 rounded-xl mt-4 w-full">
                Checkout
              </button>
         
            </div>
          </div>
        </div>
      </div> :
      <EmptyCart />
    }
   </>
  );
};

export default CartsMain;
