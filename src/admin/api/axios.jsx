import axios from "axios";

export default axios.create({
  baseURL: "https://modern-pear-crane.cyclic.app/api/",
  timeout: 5000,
});
