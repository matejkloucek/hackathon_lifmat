import { ActiveIngredient } from "./ActiveIngredient";

export type MedicineSimple = {
  id: string;
  name: string;
  suklCode: number;
  contraindications: string[];
  adverseEffects: string[];
  activeIngredients: ActiveIngredient[];
};
