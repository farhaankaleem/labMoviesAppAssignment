import React, { ChangeEvent } from "react";
import { FilterOption, GenreData, SortOption } from "../../types/interfaces"
import { SelectChangeEvent } from "@mui/material";
import { getGenres } from "../../api/tmdb-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import { useQuery } from "react-query";
import Spinner from '../spinner'
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

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string)  => void;
  onSortChange: (sortOption: SortOption) => void;
  titleFilter: string;
  genreFilter: string;
  sortOption: SortOption;
}

  const FilterMoviesCard: React.FC<FilterMoviesCardProps> = (props) => {

    const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

    if (isLoading) {
      return <Spinner />;
    }
    if (isError) {
      return <h1>{(error as Error).message}</h1>;
    }
    const genres = data?.genres || [];
    if (genres[0].name !== "All") {
      genres.unshift({ id: "0", name: "All" });
    }

    const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
      e.preventDefault()
      props.onUserInput(type, value)
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e, "title", e.target.value)
    }
  
    const handleGenreChange = (e: SelectChangeEvent) => {
      handleChange(e, "genre", e.target.value)
    };

    const handleSortChange = (e: SelectChangeEvent) => {
      props.onSortChange(e.target);
    };


  const production_countries = [
    {
      iso_3166_1: "US",
      name: "United States of America",
    },
    {
      iso_3166_1: "FR",
      name: "France",
    },
    {
      iso_3166_1: "Li",
      name: "Lithuania",
    }
  ]

  return (
    <>
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={styles.formControl}
          id="filled-search"
          label="Search field"
          type="search"
          value={props.titleFilter}
          variant="filled"
          onChange={handleTextChange}
        />
        <FormControl sx={styles.formControl}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>

          <InputLabel id="production_countries-label">Production Countries</InputLabel>
          <Select
            labelId="production_countries-label"
            id="production_countries-select"
          >
            {production_countries.map((prod_count) => {
              return (
                <MenuItem key={prod_count.iso_3166_1} value={prod_count.iso_3166_1}>
                  {prod_count.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
    <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the movies.
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
              <MenuItem value="rating.desc">Rating Descending</MenuItem>
              <MenuItem value="rating.asc">Rating Ascending</MenuItem>
              <MenuItem value="release.desc">Release Date Descending</MenuItem>
              <MenuItem value="release.asc">Release Date Ascending</MenuItem>
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
