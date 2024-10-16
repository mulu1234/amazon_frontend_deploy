import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdLocationPin } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { BiCart } from "react-icons/bi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"
function Header() {
const [{basket,user},dispatch]= useContext(DataContext)
  console.log(basket)
    const totalitem = basket?.reduce(
      (amount, item) => {
        return item.amount + amount;
      },0);
  
  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to={"/"}>
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <MdLocationPin />
              </span>
              <div>
                <p>delivered to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="search prouct" />
            <CiSearch size={38} />
          </div>
          {/* right side link */}
          <div className={classes.order__container}>
            <Link to={""} className={classes.language}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSStLCwjHko3RVGheTvVMInchH_GtYl1nd_KA&s"
                alt=""
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            {/* three components */}
            <Link to={!user && "/auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello{user.email?.split("@")[0]}</p>
                    <span onClick={() => auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p>Hello,sign In</p>
                    <span>Account and Lists</span>
                  </>
                )}
              </div>
            </Link>
            {/* order */}
            <Link to={"/order"}>
              <p>returns</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span>{totalitem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;
