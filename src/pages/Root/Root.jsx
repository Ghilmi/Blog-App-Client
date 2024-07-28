//import { CssBaseline, ThemeProvider} from "@mui/material";
import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../header/Header.jsx";
import { blue } from "@mui/material/colors";

const Root = () => {
  return (
    <Box
      sx={{
        "& footer": {
          textAlign: "center",
          bgcolor: blue[700],
        },
      }}>
      <Header />

      <Box>
        <Outlet />
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
