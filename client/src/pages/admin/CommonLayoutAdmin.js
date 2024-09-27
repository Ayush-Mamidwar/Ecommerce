import React from 'react'
import AdminSidebar from '../../components/adminCommonLayout/AdminSidebar'

const CommonLayoutAdmin = (props) => {
  return (
    <>
        <AdminSidebar children={props.children}/>
    </>
  )
}

export default CommonLayoutAdmin