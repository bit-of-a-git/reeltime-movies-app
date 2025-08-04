import React, { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import MovieIcon from "@mui/icons-material/Movie";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SiteMenu from "./menu";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const drawerWidth = 250;

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const authOptions = [
    ...(auth.currentUser
      ? [{ label: "Log Out", path: "/logout" }]
      : [{ label: "Log In", path: "/login" }]),
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={toggleDrawer}
            color="inherit"
            size="large"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" sx={styles.title}>
            <Box sx={{ display: "flex", alignItems: "center", ml: 23 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                ReelTime
              </Link>
              <MovieIcon fontSize="large" sx={{ ml: 1 }} />
            </Box>
          </Typography>
          {authOptions.map((opt) => (
            <Button
              key={opt.label}
              color="inherit"
              onClick={() => handleMenuSelect(opt.path)}
            >
              {opt.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Offset />
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary.light",
            color: "secondary.contrastText",
          },
        }}
      >
        <SiteMenu handleDrawerToggle={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default SiteHeader;
