import axios from "axios";
const link = "http://localhost:3000";
const http = axios.create({
  baseURL: link,
});
export default http;
