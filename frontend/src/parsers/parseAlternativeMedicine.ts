import { AlternativeMedicine } from "../model/AlternativeMedicine";
import { parseActiveIngredients } from "./parseActiveIngredients";

export const parseAlternativeMedicine = (data: any[]): AlternativeMedicine[] => {
  return data.map((entry) => ({
    id: entry.id,
    name: entry.name,
    suklCode: entry.sukl_code,
    contraindications: entry.contraindications,
    adverseEffects: entry.adverse_effects,
    activeIngredients: parseActiveIngredients(entry.active_ingredients),
  }));
};