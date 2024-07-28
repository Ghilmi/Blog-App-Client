import axios from "axios";

export const fetchData = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/post");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
