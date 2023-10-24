import axios from "axios";
// import { getApiUrl } from "../hooks/getApiUrl";

export const getHello = async () => {
  console.log("getHello called");
  await axios.get('http://localhost:8080/hello/').then((response) => {
    console.log(response);
  });
};
