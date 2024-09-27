import React, { useEffect, useState } from 'react'
import ProductsDetialsMain from '../productsDetailsMain/ProductsDetialsMain'
import Loader from '../../components/loader/Loader'

const ProductsDetailsPage = () => {
  const [spin,setSpin] = useState(true)

  useEffect(()=>{
    window.scrollTo(0,0)
  })

  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false)
    },400)
  },[])
  
  return (
    <div>
        {spin ? <Loader />:<ProductsDetialsMain />}
    </div>
  )
}

export default ProductsDetailsPage