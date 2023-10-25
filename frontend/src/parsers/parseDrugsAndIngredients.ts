import { DrugsAndIngredients } from "../model/DrugsAndIngredients";
import { DrugType } from "../enums/DrugType";

export const parseDrugsAndIngredients = (data: any[]): DrugsAndIngredients[] => {
  return data.map((entry) => ({
    id: entry.id,
    name: entry.name,
    type: entry.type === "medicine" ? DrugType.Drug : DrugType.Ingredient,
  }));
};
