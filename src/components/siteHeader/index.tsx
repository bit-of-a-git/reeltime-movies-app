import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import MovieIcon from "@mui/icons-material/Movie";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import SiteMenu from "./menu";
import { yellow, teal } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[200],
      dark: teal[300],
    },
    secondary: {
      main: yellow[500],
      dark: yellow[700],
    },
  },
});

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const drawerWidth = 250;

const SiteHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const authOptions = currentUser
    ? [
        {
          label: "Log Out",
          path: "/logout",
          color: "secondary" as const,
          icon: LogoutIcon,
        },
      ]
    : [
        {
          label: "Log In",
          path: "/login",
          color: "primary" as const,
          icon: LoginIcon,
        },
      ];

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleMenuSelect = async (pageURL: string) => {
    if (pageURL === "/logout") {
      try {
        await logout();
        navigate("/");
      } catch (error) {
        console.error("Error logging out");
      }
    } else {
      navigate(pageURL, { state: { from: location } });
      setDrawerOpen(false);
    }
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="Open navigation drawer"
            onClick={toggleDrawer}
            color="inherit"
            size="large"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: drawerOpen ? 23 : 0,
                // https://www.w3schools.com/cssref/func_cubic-bezier.php - matches the curve of the menu drawer
                transition: "margin-left 225ms cubic-bezier(0, 0, 0.2, 1)",
              }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                ReelTime
              </Link>
              <MovieIcon fontSize="large" sx={{ ml: 1 }} />
            </Box>
          </Typography>
          <ThemeProvider theme={theme}>
            {authOptions.map((opt) => (
              <Button
                key={opt.label}
                color={opt.color}
                variant="contained"
                onClick={() => handleMenuSelect(opt.path)}
                endIcon={<opt.icon />}
              >
                {opt.label}
              </Button>
            ))}
          </ThemeProvider>
        </Toolbar>
      </AppBar>
      <Offset />
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "primary.light",
            color: "secondary.contrastText",
            overflowY: "auto",
            scrollbarWidth: "none",
          },
        }}
      >
        <SiteMenu handleDrawerToggle={toggleDrawer} />
      </Drawer>
    </>
  );
};

export default SiteHeader;
