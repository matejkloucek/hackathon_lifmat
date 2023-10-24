import { AppBar, Button, Stack, Typography } from "@mui/material";
import { Colors } from "../theme/colors";
import { FontWeight } from "../theme/utils";
import PersonIcon from "@mui/icons-material/Person";
import { Medication } from "@mui/icons-material";

type Props = {
  patientName?: string;
};

export const PageHeader = (props: Props) => {
  return (
    <AppBar position={"static"}>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} height={"60px"} paddingX={10}>
        <Stack direction={"row"} alignItems={"center"}>
          <Medication fontSize={"large"} />
          <Typography fontWeight={FontWeight.Bold} fontSize={22}>
            SPICY WIZARD
          </Typography>
        </Stack>
        <Button variant={"text"}>
          <Typography color={Colors.white} sx={{ marginRight: 1 }} fontSize={16}>
            {props.patientName ?? "Příhlásit se"}
          </Typography>
          <PersonIcon color={"secondary"} fontSize={"large"} />
        </Button>
      </Stack>
    </AppBar>
  );
};
