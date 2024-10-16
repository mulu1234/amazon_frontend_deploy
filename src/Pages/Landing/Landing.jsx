import React from "react";
import Layout from "../../Components/Layout/Layout";
import CarouselEffect from "../../Components/Carousel/Carousel";
import Category from "../../Components/Category/Category";
import Product from "../../Components/Product/Poduct"
function Landing() {
  return (
    <Layout>
      <CarouselEffect />
      <Category />
      <Product/>
    </Layout>
  );
}

export default Landing;
