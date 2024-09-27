import React from 'react'
import Headers from './Header/Headers'
import Footer from './Footer/Footer'

const Layout = (props) => {
  return (
    <>
        <Headers />
        {props.children}
        <Footer />
    </>
  )
}

export default Layout