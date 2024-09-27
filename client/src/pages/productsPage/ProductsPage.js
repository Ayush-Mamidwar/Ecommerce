import React, { useEffect, useState } from 'react'
import ProductsPageMain from '../../components/productsPageMain/ProductsPageMain'
import Loader from '../../components/loader/Loader'

const ProductsPage = () => {

  const [spin,setSpin] = useState(true)

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false)
    },600)
  },[])
  return (
    <>
       {spin ? <Loader /> : <ProductsPageMain />} 
    </>
  )
}

export default ProductsPage