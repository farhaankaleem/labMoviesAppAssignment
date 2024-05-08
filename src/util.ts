import { createTheme } from "@mui/material";
import truncate from "lodash/truncate";

export function excerpt(string: string) {
  return truncate(string, {    
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
}

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // Define your light mode palette colors here
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // Define your dark mode palette colors here
  },
});
