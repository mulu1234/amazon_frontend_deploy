import {useEffect,useContext,} from "react";
import React from "react";
import { DataContext } from "./DataProvider/DataProvider.jsx";
import "./App.css";
import Routing from "./Router.jsx";
import { auth } from "./Utility/firebase.js";
import { Type } from "./Utility/action.type.js";

function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        // console.log(authuser);
        dispatch({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return <Routing />;
}

export default App;
