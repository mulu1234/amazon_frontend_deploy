import React, { useEffect, useState } from "react";
import axios from "axios";
import { productUrl } from "../../Api/Endpoint";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [products, setproducts] = useState([]);
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    axios.get(`${productUrl}/products`)
    .then((res) => {
      setproducts(res.data);
      setisloading(false)
    })
  }, []);
  console.log(products);
  return (
    <>
      {isloading ? (
        <Loader />
      ) : (
        <div className={classes.product__container}>
          {products.map(singleProduct => (
            <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>
          ))}
        </div>
      )}
    </>
  );
}

export default Product;
