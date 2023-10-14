import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const Theme = () =>
  createTheme({
    palette: {
      primary: colors.red,
      // secondary: colors.red,
    },
  });
