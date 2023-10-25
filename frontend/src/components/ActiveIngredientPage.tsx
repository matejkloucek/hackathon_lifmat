import { ActiveIngredientDetail } from "../model/ActiveIngredientDetail";
import { Stack, Typography } from "@mui/material";
import { Border, FontWeight } from "../theme/utils";
import { Colors } from "../theme/colors";
import { MedicineDetailBox } from "./MedicineDetailBox";

type Props = {
  activeIngredient: ActiveIngredientDetail;
};

export const ActiveIngredientPage = ({ activeIngredient }: Props) => {
  const alternativeText = () => {
    if (activeIngredient.medicines.length > 4) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Bylo nalezeno
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.medicines.length}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            léčiv obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.name}
          </Typography>
          <Typography>:</Typography>
        </Stack>
      );
    } else if (activeIngredient.medicines.length > 1 && activeIngredient.medicines.length < 5) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Bylo nalezeny
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.medicines.length}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            léčiva obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.name}
          </Typography>
          <Typography>:</Typography>
        </Stack>
      );
    } else if (activeIngredient.medicines.length === 1) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Byl nalezen
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.medicines.length}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            lék obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {activeIngredient.name}
          </Typography>
          <Typography>:</Typography>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Nebyl nalezen žádný lék obsahující aktivní látku
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20}>
            {activeIngredient.name}
          </Typography>
          <Typography>...</Typography>
        </Stack>
      );
    }
  };
  return (
    <Stack marginBottom={10} marginTop={5}>
      {alternativeText()}
      {activeIngredient.medicines.length > 0 &&
        activeIngredient.medicines.map((entry) => (
          <Stack border={Border.Grey.Thick} width={"1000px"} bgcolor={Colors.grey50} paddingX={1} marginY={3}>
            <Typography marginTop={1} fontWeight={FontWeight.Bold} fontSize={20}>
              {entry.name}
            </Typography>
            <MedicineDetailBox medicine={entry} />
          </Stack>
        ))}
    </Stack>
  );
};
