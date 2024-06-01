import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: [0, 2, 4, 6],
});
export const styles = {
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: "center",
  },
};
