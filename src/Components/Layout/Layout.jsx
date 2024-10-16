import React from 'react'
import Header from '../Header/Header'
import { children } from 'react'
function Layout({children}) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default Layout
