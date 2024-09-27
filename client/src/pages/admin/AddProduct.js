import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Select from 'react-select'
import { AddProducts, GetCategory } from '../../redux/slice/productSlice/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const AddProduct = () => {
    const dispatch = useDispatch()

    const [inputValue,setInputValue] = useState({
      productname:"",
      price:"",
      discount:"",
      quantity:"",
      description:""
    })

    const [productImage,setProductImage] = useState("")
    const [categoryid, setCategoryId] = useState("")

    const {categoryData} = useSelector((state)=>state.Product)

    const [categoryState, setCategoryState] = useState([])

    const handleChange =(e)=>{
      const {name,value} = e.target
      setInputValue({...inputValue,[name]:value})
    }

    const handleCategoryChange = (e)=>{
      const {value} = e
      setCategoryId(value)
    }

    const handleProductImageChange = (e)=>{
      setProductImage(e.target.files[0])
    }

    const handleSubmit = (e)=>{
      e.preventDefault()

      const {productname, price, discount, quantity, description} = inputValue;
      if(productname === ""){
        toast.error("Product name required.")
      }else if(categoryid === ""){
        toast.error("Please select category.")
      }else if(price === ""){
        toast.error("Please enter price.")
      }else if(discount === "" ){
        toast.error("Please enter discount.")
      }else if(productImage === ""){
        toast.error("Please upload image.")
      }else if(quantity === "" ){
        toast.error("Please enter quantity.")
      }else if(description === ""){
        toast.error("Please enter description.")
      }else{
          const data = new FormData()
          data.append("productname",productname)
          data.append("price",price)
          data.append("discount",discount)
          data.append("quantity",quantity)
          data.append("description",description)
          data.append("productimage",productImage)
          // data.append("categoryid",categoryid)

          const config ={
            "Content-Type":"multipart/form-data"
          }

          const datasend = {
            data,
            categoryid,
            config
          }

          dispatch(AddProducts(datasend))
            .then((res)=>{
              if(res.payload){
                setInputValue({...inputValue, productname:"", price:"", discount:"", quantity:"", description:""})
                setCategoryId("")
                setProductImage("")
              }
            }).catch((err)=>console.log(err))
      }

    }

    useEffect(()=>{
      dispatch(GetCategory())
    },[])

    useEffect(()=>{
      let arr = []
      for(let i=0;i<categoryData.length;i++){
        let setCategoryValue = {value:categoryData[i]._id,label:categoryData[i].categoryname}
        arr.push(setCategoryValue)
      }
      setCategoryState(arr)
      //setCategoryState(categoryData.map((item)=>{return {value:item._id,label:item.categoryname}}))
    },[categoryData])
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='w-[60%]  p-8 bg-white rounded-lg shadow-xl'>
        <h1 className='text-4xl font-md text-center mb-8'>Add Products</h1>
        
        <form className='space-y-6'>
            <input type='text' id='prodname' 
            onChange={handleChange}
            name='productname' 
            value={inputValue.productname}
            className='inpt border-[1px] border-gray-400' 
            placeholder='Product Name' required/>

            <Select
            onChange={handleCategoryChange}
            options={categoryState} 
            placeholder='product category'/>

            <input 
            type='text' 
            id='price' 
            name='price' 
            onChange={handleChange}
            placeholder='price' value={inputValue.price} 
            className='inpt border-[1px] border-gray-400' required />
 

            <input 
            type='text' 
            id='discount' 
            name='discount' 
            onChange={handleChange}
            value={inputValue.discount}
            className='inpt border-[1px] border-gray-400' placeholder='Enter discount' required />

            <input 
            type='file' 
            id='image' 
            name='productimage' 
            onChange={handleProductImageChange}
            className='inpt border-[1px] border-gray-400' 
            placeholder='Enter your email' required/>

            <input 
            type='text' 
            id='quantity' 
            name='quantity' 
            value={inputValue.quantity}
            onChange={handleChange}
            className='inpt border-[1px] border-gray-400' placeholder='Enter quantity' required />

            <textarea 
            className='inpt border-[1px] border-gray-400' 
            value={inputValue.description}
            name='description' 
            onChange={handleChange}
            placeholder='Description' 
            rows={5}/>

          <button 
            type='submit'
            onClick={handleSubmit}
            className='block w-full px-4 py-2 mt-4 text-lg bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600'
          >
            Submit
          </button>
        </form>

      </div>
    </div>
  )
}

export default AddProduct