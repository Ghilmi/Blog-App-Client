import { Paper, Typography, Button, Stack } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ElementsDashboard({ title, numbers, path, icon }) {
  const naveTo = useNavigate();
  return (
    <>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h4">{title}</Typography>
        <Typography sx={{ color: blue[500] }} variant="h4">
          {numbers}
        </Typography>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

            mt: "10px",
            "& i": {
              fontSize: "1.5rem",
              color: "#fff",
              bgcolor: green[100],
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
          }}>
          <Button
            onClick={() => naveTo(path)}
            variant="contained"
            sx={{
              bgcolor: green[500],
              color: "#eee",
              fontSize: "0.7rem",
              py: 0.3,
              px: 0.4,
            }}>
            See All {title}
          </Button>
          <i className={"bi bi-" + icon} />
        </Stack>
      </Paper>
    </>
  );
}
