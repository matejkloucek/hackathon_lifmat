import { Autocomplete, Button, Menu, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { DrugsAndIngredients } from "../model/DrugsAndIngredients";
import { FontWeight } from "../theme/utils";

type Props = {
  options: DrugsAndIngredients[];
  onSearchClick: (drug: DrugsAndIngredients) => void;
  onChatClick: (query: string) => void;
  onChatModeSelect: () => void;
  onSearchModeSelect: () => void;
};

export const SearchBar = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<DrugsAndIngredients | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMode, setSelectedMode] = useState<string>("SEARCH");
  const [textFieldValue, setTextFieldValue] = useState<string>("");

  // Define a function to handle text field changes
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Update the state variable with the new value
    setTextFieldValue(event.target.value);
  };
  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: DrugsAndIngredients | null) => {
    setSelectedOption(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: string) => {
    setSelectedMode(option);
    handleClose();
  };

  const handleSearchClick = () => {
    if (selectedOption && selectedMode === "SEARCH") {
      props.onSearchClick(selectedOption);
    } else if (textFieldValue && selectedMode === "CHAT") {
      props.onChatClick(textFieldValue);
    }
  };

  return (
    <Stack direction={"row"}>
      <Button variant={"contained"} onClick={handleClick} sx={{ width: "80px" }}>
        <Typography fontWeight={FontWeight.Bold}>{selectedMode}</Typography>
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            handleOptionClick("SEARCH");
            props.onSearchModeSelect();
          }}
        >
          <Typography fontWeight={FontWeight.Bold}>SEARCH</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleOptionClick("CHAT");
            props.onChatModeSelect();
          }}
        >
          <Typography fontWeight={FontWeight.Bold}>CHAT</Typography>
        </MenuItem>
      </Menu>
      {selectedMode === "SEARCH" && (
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
      )}
      {selectedMode === "CHAT" && (
        <TextField
          variant={"outlined"}
          placeholder={"Položte libovolný dotaz..."}
          value={textFieldValue}
          onChange={handleTextFieldChange}
          sx={{ minWidth: "500px" }}
        />
      )}
      <Button variant={"contained"} onClick={handleSearchClick}>
        <SearchIcon />
      </Button>
    </Stack>
  );
};
