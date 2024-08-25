//import { CssBaseline, ThemeProvider} from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { blue } from "@mui/material/colors";
import MainHeader from "../header/Header.jsx";
import CategoriesSpeedDial from "../SpeedDial/SpeedDial";
import LabelBottomNavigation from "../BottomNavigation/BottomNavigation.jsx";

const Root = () => {
  return (
    <Box
      sx={{
        "& footer": {
          textAlign: "center",
          bgcolor: blue[700],
        },
      }}>
      <MainHeader />

      <Box
        sx={{
          position: "relative",
          "& .css-1k0kull": {
            height: "auto !important",
          },
        }}>
        <Outlet />
        <CategoriesSpeedDial />
        <LabelBottomNavigation />
      </Box>
      <footer>
        <Typography
          sx={{ textTransform: "capitalize", color: "#eee" }}
          variant={"h6"}>
          copyright {new Date().getFullYear()}&#169;
        </Typography>
      </footer>
    </Box>
  );
};

export default Root;
