import { ActiveIngredient } from "./ActiveIngredient";
import { NegativeInteractions } from "./NegativeInteractions";

export type Medicine = {
  id: number;
  name: string;
  suklCode: number;
  contraindications: string[];
  adverseEffects: string[];
  activeIngredients: ActiveIngredient[];
  negativeInteractions: NegativeInteractions[];
};
