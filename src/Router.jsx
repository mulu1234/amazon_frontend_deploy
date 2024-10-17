import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Order from "./Pages/Order/Order";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRout from "./Components/ProtectedRout/ProtectedRout";

const stripePromise = loadStripe(
  "pk_test_51Mw5P8C8DGe0wOb3qQ3KzpzfCnniRlqx5D5z1QTZtwU02lKJZx6jjsE8DMUKqgSKKU7XiwT8WAsfbTYuvqvtbcTw005RUEzY0j"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRout
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRout
              msg={"you must log in to see your orders"}
              redirect={"/orders"}
            >
              <Order />
            </ProtectedRout>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
