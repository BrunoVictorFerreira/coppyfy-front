import Axios from "axios";
import env from "react-dotenv";

// export const urlsApiRest = {
//   test: process.env.REACT_APP_BASE_URL,
//   development: process.env.REACT_APP_BASE_URL,
//   production: process.env.REACT_APP_BASE_URL
// };
const api = Axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

export default api;

