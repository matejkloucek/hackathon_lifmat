import { ActiveIngredient } from "./ActiveIngredient";

export type AlternativeMedicine = {
  id: number;
  name: string;
  suklCode: number;
  contraindications: string[];
  adverseEffects: string[];
  activeIngredients: ActiveIngredient[];
};
