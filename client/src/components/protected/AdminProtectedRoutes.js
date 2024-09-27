import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminProtectedRoutes = ({Components}) => {
    const navigate = useNavigate()


    const checkAdminValid = ()=>{
      let login = localStorage.getItem('admintoken')
  
      if(!login){
          navigate('/admin/login')
      }
    }
  
    useEffect(()=>{
        checkAdminValid()
    },[])

  return (
    <><Components /></>
  )
}

export default AdminProtectedRoutes