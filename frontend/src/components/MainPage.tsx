import { Button, Stack, Typography } from "@mui/material";
import { PageHeader } from "./PageHeader";
import { Border } from "../theme/utils";
import { Colors } from "../theme/colors";
import { postTest } from "../services/postTest";

export const MainPage = () => {
  const handleClick = async () => {
    await postTest();
  };

  return (
    <>
      <PageHeader />
      <Stack alignItems={"center"} marginTop={2}>
        <Stack border={Border.Grey.Thick} width={"50%"} minWidth={"400px"} bgcolor={Colors.grey50} padding={2}>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae
            rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
            quasi quidem quibusdam.
          </Typography>
        </Stack>
        <Button variant={"contained"} onClick={handleClick} sx={{ marginTop: 2 }}>
          POST
        </Button>
      </Stack>
    </>
  );
};
