import { Button, Stack, Typography } from "@mui/material";
import { PageHeader } from "./PageHeader";
import { Border } from "../theme/utils";
import { Colors } from "../theme/colors";
import { getHello } from "../services/getHello";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import { getAllDrugs } from "../services/getAllDrugs";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";

export const MainPage = () => {
  const [drugsAndIngredients, setDrugsAndIngredients] = useState<DrugsAndIngredients[]>([]);
  useEffect(() => {
    console.log("Loading all drugs");
    loadAllDrugs();
  }, []);

  const loadAllDrugs = async () => {
    const response = await getAllDrugs();
    setDrugsAndIngredients(response);
  };

  const handleClick = async () => {
    await getHello();
  };

  return (
    <>
      <PageHeader />
      <Stack alignItems={"center"} marginTop={2}>
        <SearchBar options={drugsAndIngredients} />
        <Stack
          border={Border.Grey.Thick}
          width={"50%"}
          minWidth={"400px"}
          bgcolor={Colors.grey50}
          padding={2}
          marginTop={3}
        >
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
