import { NegativeInteractions } from "../model/NegativeInteractions";

export const parseNegativeInteractions = (data: any[]): NegativeInteractions[] => {
  return data.map((entry) => ({
    id: entry.id,
    name: entry.name,
  }));
};
