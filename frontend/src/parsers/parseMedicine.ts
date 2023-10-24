import { Medicine } from "../model/Medicine";
import { parseActiveIngredients } from "./parseActiveIngredients";
import { parseNegativeInteractions } from "./parseNegativeInteractions";

export const parseMedicine = (data: any): Medicine => {
  console.log("data inside medicine parser:", data.contraindications);
  return {
    id: data.id,
    name: data.name,
    suklCode: data.sukl_code,
    contraindications: data.contraindications,
    adverseEffects: data.adverse_effects,
    activeIngredients: parseActiveIngredients(data.active_ingredients),
    negativeInteractions: parseNegativeInteractions(data.negative_interactions),
  };
};
