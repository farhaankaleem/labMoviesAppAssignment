import React, { ChangeEvent } from "react";
import { FilterOptionActor, GenderData, SortOption } from "../../types/interfaces"
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
 
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterActorsCardProps {
  onUserInput: (f: FilterOptionActor, s: string)  => void;
  onSortChange: (sortOption: SortOption) => void;
  nameFilter: string;
  genderFilter: string;
  sortOption: SortOption;
}

  const FilterMoviesCard: React.FC<FilterActorsCardProps> = (props) => {

    const genders: GenderData = {
        1: "female", 2: "male"
    }

    const handleChange = (e: SelectChangeEvent, type: FilterOptionActor, value: string) => {
      e.preventDefault()
      props.onUserInput(type, value)
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e, "name", e.target.value)
    }
  
    const handleGenderChange = (e: SelectChangeEvent) => {
      handleChange(e, "gender", e.target.value)
    };

    const handleSortChange = (e: SelectChangeEvent) => {
      props.onSortChange(e.target);
    };


  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the actors.
        </Typography>
        <TextField
          sx={styles.formControl}
          id="filled-search"
          label="Search field"
          type="search"
          value={props.nameFilter}
          variant="filled"
          onChange={handleNameChange}
        />
        <FormControl sx={styles.formControl}>
          <InputLabel id="genre-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender-select"
            value={props.genderFilter}
            onChange={handleGenderChange}
          >
            {Object.entries(genders).map(([id, value]) => (
                <MenuItem key={id} value={id}>
                {value}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the actors.
          </Typography>
          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={props.sortOption.value}
              onChange={handleSortChange}
            >
              <MenuItem value="popularity.desc">Popularity Descending</MenuItem>
              <MenuItem value="popularity.asc">Popularity Ascending</MenuItem>
              <MenuItem value="name.asc">Name A-Z</MenuItem>
              <MenuItem value="name.desc">Name Z-A</MenuItem>
              
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      </>
  );
}

export default FilterMoviesCard;
