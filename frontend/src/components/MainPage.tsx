import { Box, CircularProgress, Stack } from "@mui/material";
import { PageHeader } from "./PageHeader";
import { SearchBar } from "./SearchBar";
import { useEffect, useState } from "react";
import { getAllDrugs } from "../services/getAllDrugs";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";
import { getDrugDetail } from "../services/getDrugDetail";
import { Medicine } from "../model/Medicine";
import { InitialLoadPage } from "./InitialLoadPage";
import { MedicinePage } from "./MedicinePage";
import { DrugType } from "../enums/DrugType";
import { getActiveIngredientDetail } from "../services/getActiveIngredientDetail";
import { ActiveIngredientDetail } from "../model/ActiveIngredientDetail";
import { ActiveIngredientPage } from "./ActiveIngredientPage";
import { getFunFact } from "../services/getFunFact";
import { FunFact } from "../model/FunFact";

export const MainPage = () => {
  const [drugsAndIngredients, setDrugsAndIngredients] = useState<DrugsAndIngredients[]>([]);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const [drugDetail, setDrugDetail] = useState<Medicine | null>(null);
  const [funFact, setFunFact] = useState<FunFact | null>(null);
  const [activeIngredientDetail, setActiveIngredientDetail] = useState<ActiveIngredientDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    console.log("Loading all drugs");
    loadFunFact();
    loadAllDrugs();
  }, []);

  const loadAllDrugs = async () => {
    const response = await getAllDrugs();
    setDrugsAndIngredients(response);
  };

  const loadFunFact = async () => {
    const response = await getFunFact();
    setFunFact(response);
  };

  const loadDrugDetail = async (drug: DrugsAndIngredients) => {
    if (firstLoad) {
      setFirstLoad(false);
    }
    setLoading(true);
    setDrugDetail(null);
    setActiveIngredientDetail(null);
    if (drug.type === DrugType.Drug) {
      const response = await getDrugDetail(drug.id);
      console.log("Response:", response);
      setDrugDetail(response);
    } else {
      const response = await getActiveIngredientDetail(drug.id);
      console.log("Response:", response);
      setActiveIngredientDetail(response);
    }
    setLoading(false);
  };

  return (
    <>
      <PageHeader />
      <Stack alignItems={"center"} marginTop={2}>
        <SearchBar options={drugsAndIngredients} onSearchClick={loadDrugDetail} />
        {firstLoad && funFact && <InitialLoadPage funFact={funFact} />}
        {loading && (
          <Box display="flex" alignItems="center" justifyContent="center" height="500px">
            {loading && <CircularProgress />}
          </Box>
        )}
        {drugDetail && <MedicinePage medicine={drugDetail} />}
        {activeIngredientDetail && <ActiveIngredientPage activeIngredient={activeIngredientDetail} />}
      </Stack>
    </>
  );
};
