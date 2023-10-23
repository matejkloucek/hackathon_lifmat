import { Grid, Stack, Typography } from "@mui/material";
import { Colors } from "../theme/colors";
import { FontWeight } from "../theme/utils";

export const PageHeader = () => {
  return (
    <Stack direction={"row"} bgcolor={Colors.primary} padding={2}>
      <Grid container spacing={2}>
        <Grid item xs={2} color={Colors.grey150}>
          <Typography fontSize={18} fontWeight={FontWeight.Bold}>
            První
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};
