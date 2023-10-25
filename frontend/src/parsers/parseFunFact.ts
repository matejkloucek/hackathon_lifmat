import { FunFact } from "../model/FunFact";

export const parseFunFact = (data: any): FunFact => {
  return {
    medicineName: data.name,
    sideEffect: data.random_adverse_effect,
  };
};
