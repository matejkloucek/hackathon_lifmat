import { MedicineSimple } from "./MedicineSimple";

export type ActiveIngredientDetail = {
  id: number;
  name: string;
  dosage: number;
  units: string;
  medicines: MedicineSimple[];
};
