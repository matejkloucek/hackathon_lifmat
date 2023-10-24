import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";
import { DrugType } from "../enums/DrugType";

type Props = {
  options: DrugsAndIngredients[];
  onSearchClick: (drug: DrugsAndIngredients) => void;
};

export const SearchBar = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<DrugsAndIngredients | null>(null);

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: DrugsAndIngredients | null) => {
    setSelectedOption(value);
  };

  const handleSearchClick = () => {
    // console.log(selectedOption)
    if (selectedOption) {
      props.onSearchClick(selectedOption);
    }
  };

  const test: DrugsAndIngredients[] = [
    {
      id: "1",
      name: "paralen",
      type: DrugType.Drug,
    },
    {
      id: "2",
      name: "ibalgin",
      type: DrugType.Drug,
    },
    {
      id: "3",
      name: "strepsils",
      type: DrugType.Ingredient,
    },
    {
      id: "4",
      name: "strepsilsky",
      type: DrugType.Ingredient,
    },
  ];

  return (
    <Stack direction={"row"}>
      <Autocomplete
        options={test}
        getOptionLabel={(test) => test.name}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={"outlined"}
            placeholder={"Hledejte dle názvu účinné látky, léku..."}
            sx={{ minWidth: "500px" }}
          />
        )}
      />

      <Button variant={"contained"} onClick={handleSearchClick}>
        <SearchIcon />
      </Button>
    </Stack>
  );
};
