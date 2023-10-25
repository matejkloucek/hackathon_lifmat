import { Medicine } from "../model/Medicine";
import { Stack, Typography } from "@mui/material";
import { Border, FontWeight } from "../theme/utils";
import { Colors } from "../theme/colors";
import { MedicineDetailBox } from "./MedicineDetailBox";

type Props = {
  medicine: Medicine;
};

export const MedicinePage = ({ medicine }: Props) => {
  const alternativesText = () => {
    if (medicine.alternativeMedicines.length > 1 && medicine.alternativeMedicines.length < 5) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            byly nalezeny
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.alternativeMedicines.length}
          </Typography>
          <Typography fontSize={20}>alternativy :</Typography>
        </Stack>
      );
    } else if (medicine.alternativeMedicines.length > 4) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            bylo nalezeno
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.alternativeMedicines.length}
          </Typography>
          <Typography fontSize={20}>alternativ :</Typography>
        </Stack>
      );
    } else if (medicine.alternativeMedicines.length === 1) {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20} marginRight={"6px"}>
            byla nalezena
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            1
          </Typography>
          <Typography fontSize={20}>alternativa :</Typography>
        </Stack>
      );
    } else {
      return (
        <Stack direction={"row"} marginTop={5}>
          <Typography fontSize={20} marginRight={"6px"}>
            Pro lék
          </Typography>
          <Typography fontWeight={FontWeight.Bold} fontSize={20} marginRight={"6px"}>
            {medicine.name}
          </Typography>
          <Typography fontSize={20}>nebyla nalezena žádná alternativa...</Typography>
        </Stack>
      );
    }
  };
  return (
    <Stack marginBottom={10}>
      <Stack direction={"row"} marginTop={5}>
        <Typography fontSize={20} marginRight={"6px"}>
          Detail léku
        </Typography>
        <Typography fontWeight={FontWeight.Bold} fontSize={20}>
          {medicine.name}
        </Typography>
        <Typography fontSize={20} marginLeft={"3px"}>
          :
        </Typography>
      </Stack>
      <Stack border={Border.Grey.Thick} width={"1000px"} bgcolor={Colors.grey50} paddingX={1} marginTop={1}>
        <MedicineDetailBox medicine={medicine} />
      </Stack>
      {alternativesText()}
      {medicine.alternativeMedicines.length > 0 &&
        medicine.alternativeMedicines.map((entry) => (
          <Stack border={Border.Grey.Thick} width={"1000px"} bgcolor={Colors.grey50} paddingX={1} marginY={3}>
            <Typography marginTop={1} fontWeight={FontWeight.Bold} fontSize={20}>
              {entry.name}
            </Typography>
            <MedicineDetailBox medicine={medicine} />
          </Stack>
        ))}
    </Stack>
  );
};
