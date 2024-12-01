import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: [0, 5, 10, 15],
});
const styles = {
  appBarSearch: {
    borderRadius: 4,
    marginBottom: "1rem",
    display: "flex",
    padding: "16px",
  },
  pagination: {
    borderRadius: 4,
    marginTop: "1rem",
    padding: "16px",
  },
  gridContainer: {
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
    },
  },
};
export default styles;
