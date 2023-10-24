import { Box, CircularProgress, Stack } from "@mui/material";
import { PageHeader } from "./PageHeader";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import { getAllDrugs } from "../services/getAllDrugs";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";
import { getDrugDetail } from "../services/getDrugDetail";
import { Medicine } from "../model/Medicine";
import { InitialLoadPage } from "./InitialLoadPage";

export const MainPage = () => {
  const [drugsAndIngredients, setDrugsAndIngredients] = useState<DrugsAndIngredients[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [drugDetail, setDrugDetail] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("Loading all drugs");
    loadAllDrugs();
  }, []);

  const loadAllDrugs = async () => {
    const response = await getAllDrugs();
    setDrugsAndIngredients(response);
  };

  const loadDrugDetail = async (drug: DrugsAndIngredients) => {
    if (firstLoad) {
      setFirstLoad(false);
    }
    setLoading(true);
    const response = await getDrugDetail(drug.id);
    console.log("Response:", response);
    setDrugDetail(response);
    setLoading(false);
  };

  return (
    <>
      <PageHeader />
      <Stack alignItems={"center"} marginTop={2}>
        <SearchBar options={drugsAndIngredients} onSearchClick={loadDrugDetail} />
        {firstLoad && <InitialLoadPage />}
        {loading && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="500px" // Adjust as needed
          >
            {loading && <CircularProgress />}
          </Box>
        )}
        {/*<Stack*/}
        {/*  border={Border.Grey.Thick}*/}
        {/*  width={"50%"}*/}
        {/*  minWidth={"400px"}*/}
        {/*  bgcolor={Colors.grey50}*/}
        {/*  padding={2}*/}
        {/*  marginTop={3}*/}
        {/*>*/}
        {/*  <Typography>*/}
        {/*    {drugDetail?.name}*/}
        {/*  </Typography>*/}
        {/*</Stack>*/}
      </Stack>
    </>
  );
};
