import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/e-clone-40163/us-central1/api",

  //deployed version of amazon server on render
  baseURL: "https://amazon-api-deploy-u9wk.onrender.com/",
// https://amazone-frontend-m.netlify.app/
});
export {axiosInstance};