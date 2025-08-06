import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 1.5,
  },
};

interface HeaderProps {
  title: string;
  changePage?: (delta: number) => void;
}

const Header: React.FC<HeaderProps> = ({ title, changePage }) => {
  return (
    <Paper component="div" sx={styles.root}>
      <IconButton
        aria-label="go back"
        onClick={() => changePage && changePage(-1)}
      >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h4">
        {title}
      </Typography>
      <IconButton
        aria-label="go forward"
        onClick={() => changePage && changePage(1)}
      >
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Header;
