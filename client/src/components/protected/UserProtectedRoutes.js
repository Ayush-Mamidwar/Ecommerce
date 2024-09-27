import React, { Component, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectedRoutes = ({Components}) => {
  const navigate = useNavigate()


  const checkUserValid = ()=>{
    let login = localStorage.getItem('usertoken')

    if(!login){
        navigate('/login')
    }
  }

  useEffect(()=>{
    checkUserValid()
  },[])

  return (
    <>
        <Components />
    </>
  )
}

export default UserProtectedRoutes