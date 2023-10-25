import { ActiveIngredient } from "./ActiveIngredient";
import { NegativeInteractions } from "./NegativeInteractions";
import { AlternativeMedicine } from "./AlternativeMedicine";

export type Medicine = {
  id: number;
  name: string;
  suklCode: number;
  pdfDropboxLink: string;
  contraindications: string[];
  adverseEffects: string[];
  alternativeMedicines: AlternativeMedicine[];
  activeIngredients: ActiveIngredient[];
  negativeInteractions: NegativeInteractions[];
};
