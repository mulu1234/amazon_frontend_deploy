import React, { useState } from 'react'
import classes from "./Results.module.css"
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { productUrl } from "../../Api/Endpoint";
import ProductCard from '../../Components/Product/ProductCard'
function Results() {
  const[results,setresults]=useState([]);
  const {categoryName} = useParams()
  useEffect(()=>{axios
    .get(`${productUrl}/products/category/${categoryName}`)
    .then((res) => {
      setresults(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  console.log(categoryName);
  
  return (
    <Layout>
      <section>
        <div>Results</div>
        <div className={classes.product__container}>
          {results?.map((product) => (
            <ProductCard 
            key={product.id}
            product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Results
