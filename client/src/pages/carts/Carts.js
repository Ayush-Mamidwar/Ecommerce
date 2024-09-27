import React, { useEffect, useState } from 'react'
import CartsMain from '../../components/cartsMain/CartsMain'
import Loader from '../../components/loader/Loader'

const Carts = () => {
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
    <>
        {spin ? <Loader />:<CartsMain />}
    </>
  )
}

export default Carts