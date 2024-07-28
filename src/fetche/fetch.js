import axios from "axios";

const fetchData = axios.create({
  baseURL: `${import.meta.env.VITE_ROTE}`,
});
export { fetchData };
