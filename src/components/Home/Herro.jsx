import { Box, Typography, useTheme } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Herro({ urlOfHerroImg }) {
  const theme = useTheme();
  return (
    <Box
      className="herro"
      sx={{
        backgroundImage: `url(${urlOfHerroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <Typography
        color={"#000"}
        sx={{
          bgcolor: theme.palette.getContrastText("#000"),
          padding: "10px",
          border: "2px solid #000",
          borderRadius: "2rem",
          width: "max-content",
          fontSize: { xs: "2rem", sm: "4rem" },
        }}
        variant="h3">
        Welcome to Blog
      </Typography>
    </Box>
  );
}
