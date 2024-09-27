import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select'
import { GeAlltProducts, GetCategory } from "../../redux/slice/productSlice/ProductSlice";
import { NavLink } from "react-router-dom";
import Pagination from "../pagination/Pagination";

const ProductsPageMain = () => {

  const dispatch = useDispatch()

  const {productsData}= useSelector((state)=>state.Product)
  const {categoryData} = useSelector((state)=>state.Product)


  const [pageCount, setPageCount] = useState(0)
  const [page,setPage] = useState(1)
  const [selectedCategory,setSelectedCategory] = useState("")
  const [categoryState, setCategoryState] = useState([])
  

  //pagination
  //next
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page
      else return page+1
    })
  }

  //prev
  const handlePrev = ()=>{
    setPage(()=>{
      if(page === 1) return page
      else return page-1
    })
  }

  const productApi = ()=>{

    const data = {
      selectedCategory:selectedCategory,
      page
    }
    dispatch( GeAlltProducts(data))
      .then((res)=>{setPageCount(res.payload.Pagination.pageCount)})
      .catch((err)=>{})
  }

  useEffect(()=>{
    dispatch(GetCategory())
  },[])


  useEffect(()=>{
    let arr = [{value:"all",label:"all"}]
    for(let i=0;i<categoryData.length;i++){
      let setCategoryValue = {value:categoryData[i]._id,label:categoryData[i].categoryname}
      arr.push(setCategoryValue)
    }
    setCategoryState(arr)
    //setCategoryState(categoryData.map((item)=>{return {value:item._id,label:item.categoryname}}))
  },[categoryData])

  useEffect(()=>{
    productApi()
  },[page,selectedCategory])

  return (
    <>
      <div id="sellers" className="w-full p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl p-8">Products</h2>
          <div className="mt-4">
          <Select options={categoryState} onChange={(e)=>setSelectedCategory(e.value)} placeholder='Filter By Category'/>
          </div>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-2 gap-6">
              {productsData?.getAllProducts?.map((element)=>{
                return(
                    <div className="">
                        <div className="hover:underline">
                        <img
                            src={element?.productimage}
                            className="rounded-3xl shadow-xl max-h-80 "
                        />
                        <h4 className="mt-2 tracking-widest font-bold">
                            {element?.productname}
                        </h4>
                        </div>
                        <div className="price">
                        ₹ {element?.price}.00
                        <button className="mx-2 bg-[#1b1b1b] text-white p-2 text-xs rounded-lg">
                            <NavLink to={`/productsdetails/${element._id}`}> Buy Now</NavLink>
                        </button>
                        </div>
                    </div>
                )
              })}
        </div>
      </div>
      <Pagination pageCount={pageCount} page={page} handleNext={handleNext} handlePrev={handlePrev} setPage={setPage}/>
    </>
  );
};

export default ProductsPageMain;
