import axios from "axios";
import { ActiveIngredientDetail } from "../model/ActiveIngredientDetail";
import { parseActiveIngredientDetail } from "../parsers/parseActiveIngredientDetail";

export const getActiveIngredientDetail = async (id: string): Promise<ActiveIngredientDetail> => {
  const response = await axios.get(`http://192.168.116.41:8080/active_ingredient/${id}`);
  console.log("Response before parsing active ingredient:", response.data);
  return parseActiveIngredientDetail(response.data);
};
