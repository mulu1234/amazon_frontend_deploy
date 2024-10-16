import React from 'react'
import {FadeLoader } from "react-spinners"
function Loader() {
  return (
    <div 
    style={{
            display:"felx",
            alignitems: "center",
            justifyContent: "center",
            height:"50vh",
        }}>

      <FadeLoader color='#36d7b7'/>
    </div>
  );
}

export default Loader
