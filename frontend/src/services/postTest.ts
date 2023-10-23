import axios from "axios";
import { getApiUrl } from "../hooks/getApiUrl";

export const postTest = async () => {
  console.log("postTest called");
  axios.post(getApiUrl()).then((response) => {
    console.log(response);
  });
};
