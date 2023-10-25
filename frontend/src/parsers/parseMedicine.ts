import { Medicine } from "../model/Medicine";
import { parseActiveIngredients } from "./parseActiveIngredients";
import { parseNegativeInteractions } from "./parseNegativeInteractions";
import { parseAlternativeMedicine } from "./parseAlternativeMedicine";

export const parseMedicine = (data: any): Medicine => {
  return {
    id: data.id,
    name: data.name,
    suklCode: data.sukl_code,
    contraindications: data.contraindications,
    adverseEffects: data.adverse_effects,
    alternativeMedicines: parseAlternativeMedicine(data.alternative_medicines),
    activeIngredients: parseActiveIngredients(data.active_ingredients),
    negativeInteractions: parseNegativeInteractions(data.negative_interactions),
  };
};
