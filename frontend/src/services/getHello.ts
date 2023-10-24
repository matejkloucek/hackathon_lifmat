import axios from "axios";
import { getApiUrl } from "../hooks/getApiUrl";
// import { getApiUrl } from "../hooks/getApiUrl";

export const getHello = async () => {
  console.log("getHello called");
  await axios.get(getApiUrl() + "hello/").then((response) => {
    console.log(response);
  });
};
