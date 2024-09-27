import React, { useEffect, useState } from 'react'
import HomeMain from '../../components/homeMain/HomeMain'
import HomeProducts from '../../components/homeProducts/HomeProducts'
import HomeContact from '../../components/homeContact/HomeContact'
import { useDispatch, useSelector } from 'react-redux'
import { GeAlltProducts, GetLatestProducts } from '../../redux/slice/productSlice/ProductSlice'
import Loader from '../../components/loader/Loader'

const Home = () => {
  const dispatch = useDispatch()
  const {productsData}= useSelector((state)=>state.Product)
  const {latestproducts} = useSelector((state)=>state.Product)


  const [page,setPage] = useState(1)
  const [spin,setSpin] = useState(true)

  const productApi = ()=>{

    const data = {
      selectedCategory:"all",
      page
    }
    dispatch( GeAlltProducts(data))
      .then((res)=>{console.log('res',res)})
      .catch((err)=>{})


    dispatch(GetLatestProducts())
   
  }

  useEffect(()=>{
    productApi()
  },[page])
  

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false)
    },1500)
  },[])
  return (
    <>
        {spin ? <Loader />:
        <>
          <HomeMain />
        <HomeProducts productsData={productsData.getAllProducts} latestproducts={latestproducts}/>
        <HomeContact />
        </>}
    </>
  )
}

export default Home