import axios from "axios";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";
import { parseDrugsAndIngredients } from "../parsers/parseDrugsAndIngredients";

export const getAllDrugs = async (): Promise<DrugsAndIngredients[]> => {
  try {
    const response = await axios.get("http://192.168.116.41:8080/drugs/all");
    return parseDrugsAndIngredients(response.data.items);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
