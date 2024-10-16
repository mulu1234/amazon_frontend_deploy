import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import { productUrl } from "../../Api/Endpoint";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function ProductDetail() {
  const { productId } = useParams();
  const [isloading,setisloading] = useState (false)
  const [product, setproduct] = useState({});
  useEffect(() => {
    setisloading(true)
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setproduct(res.data);
        setisloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(product)
  return (
    <Layout>
      {isloading ? (<Loader />) : (<ProductCard product={product} 
      flex={true} renderAdd={true}/>)}
    </Layout>
  );
}

export default ProductDetail;
