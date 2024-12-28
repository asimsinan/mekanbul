import axios from "axios";
export default axios.create({
  baseURL: "https://backend-topaz-sigma-51.vercel.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
