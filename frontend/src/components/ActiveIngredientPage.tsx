import { ActiveIngredientDetail } from "../model/ActiveIngredientDetail";
import { Stack } from "@mui/material";

type Props = {
  activeIngredient: ActiveIngredientDetail;
};

export const ActiveIngredientPage = ({ activeIngredient }: Props) => {
  return <Stack>{activeIngredient.name}</Stack>;
};
