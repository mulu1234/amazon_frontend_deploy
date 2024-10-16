import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/Currencyformat/Currencyformat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
  // const [{ basket}, dispatch] = useContext(DataContext);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  console.log(basket);
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>hello</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket?.length == 0 ? (
            <p>opps ! no item is in your cart</p>
          ) : (
            basket?.map((item, i) => {
              return (
                <section className={classes.cart_product}>
                  <ProductCard
                    key={i}
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                  />
                  <div className={classes.btn__container}>
                    <button onClick={() => increment(item)}>
                      <IoIosArrowUp size={20} />
                    </button>
                    <span>{item.amount}</span>
                    <button onClick={() => decrement(item.id)}>
                      <IoIosArrowDown size={20} />
                    </button>
                  </div>
                </section>
              );
            })
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>Subtotal ({basket?.length}items)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkbox</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
