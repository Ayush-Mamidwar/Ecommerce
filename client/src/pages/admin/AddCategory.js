import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AdminAddCategory } from "../../redux/slice/productSlice/ProductSlice";

const AddCategory = () => {
  const [inputValue, setInputValue] = useState({
    categoryname:'',
    description:''
  })

  const dispatch = useDispatch()
  
  const handleChange = (e)=>{
    const {name,value} = e.target
    setInputValue({...inputValue,[name]:value})
  }
  //Add Category
  const handleAddCategory = (e)=>{
    e.preventDefault()

    const {categoryname,description} = inputValue

    if(categoryname === ""){
      toast.error('Category name required.')
    }else if(description === ""){
      toast.error('Desctiption required.')
    }else{
      dispatch(AdminAddCategory(inputValue))
        .then((res)=>{
          setInputValue({...inputValue,categoryname:"",description:""})
        })
        .catch((err)=>{
          
        })
    }
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-[60%]  p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-md text-center mb-8">Add Products</h1>
        <div>
          <form className="space-y-8">
           <div>
            <label>Category Name</label>
            <input 
            type="text" 
            value={inputValue.categoryname}
            name="categoryname" 
            onChange={handleChange}
            className="inpt border-[1px] border-gray-400" required />
           </div>

            <div>
                <label>Description</label>
                <textarea 
                className="inpt border-[1px] border-gray-400" 
                value={inputValue.description}
                onChange={handleChange}
                name="description" 
                rows={7} />
            </div>

            <button 
            type='submit'
            className='block w-full px-4 py-2 mt-4 text-lg bg-blue-500 rounded-xl text-white font-semibold hover:bg-blue-600'
            onClick={handleAddCategory}
            >
            Submit
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
