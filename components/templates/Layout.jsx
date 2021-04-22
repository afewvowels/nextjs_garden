import React from 'react'
import Header from '@templates/header'
import Footer from '@templates/footer'

const Layout = ({children}) => {
  return(<>
    <Header/>
    <main>{children}</main>
    <Footer/>
  </>)
}

export default Layout