import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../../DataProvider/DataProvider'

function ProtectedRout({children,msg,restrict}) {

  const navigate = useNavigate()
  const [{user},dispatch]= useContext(DataContext)
     

  useEffect(()=>{
  if(!user){

    navigate("/auth",{state:{msg}})


  }
  },[user])
  
  return children;
}

export default ProtectedRout
