import React, { useContext, useState } from "react";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";
import { DataContext } from "../../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import {Rating }from "@mui/material";
import CurrencyFormat from "../Currencyformat/Currencyformat";
function ProductCard({ product,flex,renderDesc,renderAdd}) {
 
const [ishover , setishover]= useState(false)
  
  const {image,title,id,rating,price,description} = product
  
  const [state, dispatch] = useContext(DataContext);
  console.log(state);
  const addToCart=() =>{
    dispatch({
      type : Type.ADD_TO_BASKET,
      item : {image , title , id , rating , price , description},
    })
  }
  
  
  return (
    <div
      onMouseEnter={() => {
        setishover(true);
      }}
      onMouseLeave={() => {
        setishover(false);
      }}
      className={`${classes.product} ${flex ? classes.product__flexed : ""}`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating.rate} />
          <small>{rating.count}</small>
        </div>
        <CurrencyFormat amount={price} />
      </div>

      <div>
        {renderAdd && (
          <button
            className={`${classes.buttons} ${ishover ? "" : classes.btn}`}
            onClick={() => {
              addToCart();
            }}
           
          >
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
