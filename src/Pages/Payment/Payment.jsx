import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../DataProvider/DataProvider";
import Productcard from "../../Components/Product/ProductCard";
import ClipLoader from "react-spinners/ClipLoader";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/Currencyformat/Currencyformat";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  
  const totalitem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  
  const [carderror, setCarderror] = useState("");
  
  const [processing, setProcessing] = useState(false);
  
  const stripe = useStripe();
  const elements = useElements();
  
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCarderror(e.error.message) : setCarderror("");
  };
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      const clientSecrete = response.data?.clientSecrete;
      
      const paymentIntent = await stripe.confirmCardPayment(clientSecrete, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log("Payment Intent:", paymentIntent); // Log to inspect

      // Check for errors in the payment intent
      if (paymentIntent.error) {
        console.error("Payment Error:", paymentIntent.error);
        setCarderror("Payment failed. Please try again.");
        return; // Exit if there's an error
      }
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount || 0, // Default to 0 if undefined
          created: paymentIntent.created || Date.now() / 1000, // Use current time if undefined
        });

      navigate("/orders", { state: { msg: "You have placed a new order" } });
    } catch (error) {
      console.error("Payment Error:", error);
      setCarderror("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };
  return (
    <Layout>
      <div className={classes.payment__header}>Checkout({totalitem})items</div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h2>Delivery Adress</h2>
          <div>
            <div>{user.email}</div>
            <div>123 react lane</div>
            <div>chicago,It</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <Productcard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment methods</h3>

          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {carderror && (
                  <small style={{ color: "red" }}>{carderror}</small>
                )}
                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait</p>
                      </div>
                    ) : (
                      "pay now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
