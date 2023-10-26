import axios from "axios";
import { Medicine } from "../model/Medicine";
import { parseMedicine } from "../parsers/parseMedicine";

export const getDrugDetail = async (id: string): Promise<Medicine> => {
  const response = await axios.get(`http://localhost:8080/medicine/${id}`);
  console.log("Response before parsing medicine:", response.data);
  return parseMedicine(response.data);
};
