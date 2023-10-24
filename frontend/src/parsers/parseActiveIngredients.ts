import { ActiveIngredient } from "../model/ActiveIngredient";

export const parseActiveIngredients = (data: any[]): ActiveIngredient[] => {
  return data.map((entry) => ({
    id: entry.id,
    name: entry.name,
    dosage: entry.dosage,
    units: entry.units,
  }));
};
