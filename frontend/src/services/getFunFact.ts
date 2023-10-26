import axios from "axios";
import { FunFact } from "../model/FunFact";
import { parseFunFact } from "../parsers/parseFunFact";

export const getFunFact = async (): Promise<FunFact> => {
  const response = await axios.get("http://localhost:8080/medicine/random");
  return parseFunFact(response.data);
};
