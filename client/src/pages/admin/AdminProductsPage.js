import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { DeleteProducts, GeAlltProducts } from "../../redux/slice/productSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";

const AdminProductsPage = () => {

  const {productsData}= useSelector((state)=>state.Product)
  const {deleteProducts} = useSelector((state)=>state.Product)
  const [pageCount, setPageCount] = useState(0)
  const [page,setPage] = useState(1)

  const dispatch = useDispatch()

  const productApi = ()=>{

    const data = {
      selectedCategory:"all",
      page
    }
    dispatch( GeAlltProducts(data))
      .then((res)=>{setPageCount(res.payload.Pagination.pageCount)})
      .catch((err)=>{})
  }

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

  //product delete
  const handleDeleteProduct = (id)=>{
    const data = {
      productid: id
    }

    dispatch(DeleteProducts(data))
  }


  useEffect(()=>{
    productApi()
  },[page,deleteProducts])
  return (
    <>
      <div id="sellers" className="w-full p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl p-8">Products</h2>
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
          {productsData?.getAllProducts?.map((element) => {
            return (
              <div className="border-b border-gray-300 px-1 shadow-2xl rounded-xl">
                <div className="hover:underline">
                  <img
                    src={element.productimage}
                    className="rounded-3xl shadow-xl transition-transform duration-400 h-80
                    transform hover:scale-90 hover:shadow-2xl hover:border-[2px] hover:border-black"
                  />
                  <h4 className="mt-2 tracking-widest font-bold">
                    {element.productname}
                  </h4>
                </div>
                <div className="price flex items-center justify-between ">
                  ₹ {element.price}
                  <button 
                  onClick={()=>{handleDeleteProduct(element._id)}}
                  className="mx-2 text-red-500 p-2 text-3xl rounded-lg hover:text-red-700 ">
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination pageCount={pageCount} page={page} handleNext={handleNext} handlePrev={handlePrev} setPage={setPage}/>
      </div>
    </>
  );
};

export default AdminProductsPage;
