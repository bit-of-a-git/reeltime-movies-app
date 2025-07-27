const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
  paper: {
    padding: "60px",
  },
  title: {
    textAlign: "center",
  },
};
export default styles;
