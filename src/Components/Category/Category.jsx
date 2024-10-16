import React from "react";
import categoryInfo from "./categoryfullinfos.jsx";
import CategoryCard from "./CategoryCard.jsx";
import classes from "./Category.module.css";

function Category() {
  console.log(categoryInfo);
  return (
    <section className={classes.category__container}>
      {
        categoryInfo.map(info => (
        <CategoryCard data={info} />
      ))}
    </section>
  );
}

export default Category;
