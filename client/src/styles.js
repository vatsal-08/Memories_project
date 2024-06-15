const breakpoints = {
  xs: "@media (max-width:0px)",
  sm: "@media (max-width:600px)",
  md: "@media (max-width:900px)",
  lg: "@media (max-width:1200px)",
  xl: "@media (max-width:1536px)",
};
const styles = {
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "rgba(0,183,255, 1)",
  },
  image: {
    marginLeft: "15px",
  },
  mainContainer: {
    [breakpoints.sm]: {
      flexDirection: "column-reverse",
    },
  },
};
export default styles;
