import { ActiveIngredientDetail } from "../model/ActiveIngredientDetail";
import { parseMedicineSimple } from "./parseMedicineSimple";

export const parseActiveIngredientDetail = (data: any): ActiveIngredientDetail => {
  return {
    id: data.id,
    name: data.name,
    dosage: data.dosage,
    units: data.units,
    medicines: parseMedicineSimple(data.medicines),
  };
};
