import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";

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

  return (
    <Stack direction={"row"}>
      <Autocomplete
        options={props.options}
        getOptionLabel={(option) => option.name}
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
