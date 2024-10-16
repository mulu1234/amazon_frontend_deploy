import React, { useState, useContext } from "react";
import classes from "./Signup.module.css";
import { Link,useLocation,useNavigate} from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate()
  const navstatedata=useLocation();

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    if (e.target.name == "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navstatedata?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          setLoading({ ...loading, signUp: true });
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navstatedata?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  
  // console.log(password,email)

  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://xwiki.com/en/download/company/references/amazon/amazon.jpg"
          alt=""
        />
      </Link>
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navstatedata?.state?.msg && (<small style ={{
          padding :"5px",
          textAlign:"center",
          color:"red",
          fontWeight:"bold"
        }}> 
        {navstatedata?.state?.msg}</small>)}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className={classes.login__signinbutton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Condition of use &
          sale. please see our Privacy Notice, our Cookies Notice and our
          Internet-Based Ads Notice.
        </p>
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className={classes.login__registerbutton}
        >
          Create your Amazon Account
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
