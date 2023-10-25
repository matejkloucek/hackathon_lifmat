import { Box, Stack, Typography } from "@mui/material";
import { Colors } from "../theme/colors";
import { FontWeight } from "../theme/utils";
import { Medication } from "@mui/icons-material";
import { FunFact } from "../model/FunFact";

type Props = {
  funFact: FunFact;
};

export const InitialLoadPage = ({ funFact }: Props) => {
  return (
    <>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        height="300px" // Adjust as needed
      >
        <Typography color={Colors.grey500} fontSize={18}>
          Věděli jste, že...
        </Typography>
        <Stack direction={"row"}>
          <Typography color={Colors.grey500} fontSize={18}>
            mezi vedlejší účinky léku{" "}
          </Typography>
          <Typography color={Colors.grey500} fontSize={18} fontWeight={FontWeight.Bold} marginX={"6px"}>
            {funFact.medicineName}
          </Typography>
          <Typography color={Colors.grey500} fontSize={18}>
            patří{" "}
          </Typography>
          <Typography color={Colors.grey500} fontSize={18} fontWeight={FontWeight.Bold} marginLeft={"6px"}>
            {funFact.sideEffect}
          </Typography>
          <Typography color={Colors.grey500} fontSize={18}>
            ?
          </Typography>
        </Stack>
      </Box>
      <Stack direction={"row"} alignItems={"center"} marginLeft={-5} marginTop={10}>
        <Medication style={{ fontSize: 100, color: Colors.grey300 }} />
        <Typography fontWeight={FontWeight.Bold} fontSize={50} color={Colors.grey300}>
          SPICY WIZARD
        </Typography>
      </Stack>
    </>
  );
};
