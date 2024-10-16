import React, { useContext, useState, useEffect } from "react";
import classes from "./Order.module.css";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";

function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });

      return () => unsubscribe(); // Cleanup subscription on unmount
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>

          <div>
            {orders?.map((eachOrder) => {
              return (
                <div key={eachOrder.id}>
                  <hr />
                  <p>Order ID: {eachOrder?.id}</p>
                  {eachOrder?.data?.basket?.map((order) => {
                    return (
                      <ProductCard flex={true} product={order} key={order.id} />
                    ); // Ensure to return the ProductCard
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Order;
