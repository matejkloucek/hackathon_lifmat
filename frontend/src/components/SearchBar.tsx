import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import { postQuery } from "../services/postQuery";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAutocompleteChange = (event: React.ChangeEvent<{}>, value: string | null) => {
    if (value) {
      setSearchQuery(value);
    }
  };

  const handleSearchClick = async () => {
    await postQuery(searchQuery);
  };

  return (
    <Stack direction={"row"}>
      <Autocomplete
        options={top100Films.map((option) => option.title)}
        freeSolo
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={"outlined"}
            placeholder={"Hledejte dle názvu účinné látky, léku..."}
            sx={{ minWidth: "500px" }}
            value={searchQuery}
            onChange={handleTextFieldChange}
          />
        )}
      />

      <Button variant={"contained"} onClick={handleSearchClick}>
        <SearchIcon />
      </Button>
    </Stack>
  );
};

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
];
