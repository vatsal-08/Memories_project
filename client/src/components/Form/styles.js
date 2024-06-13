import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: [0, 5, 10, 15],
});
const styles = {
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 1,
  },
};
export default styles;
