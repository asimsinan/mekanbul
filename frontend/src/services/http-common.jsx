import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  },
});
