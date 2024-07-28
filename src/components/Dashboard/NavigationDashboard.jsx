import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function NavigationDashboard() {
  const naveTo = useNavigate();
  return (
    <Stack
      sx={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        pl: 2,
        pt: 2,
        width: "100%",
        height: "100%",
        "& button": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          cursor: "pointer",

          "& i": {
            fontSize: "2rem",
            color: blue[900],
          },
        }}
        onClick={() => naveTo("")}>
        <i className="bi bi-layout-wtf" />
        <Typography variant="h4">Dashboard</Typography>
      </Stack>
      <Button
        onClick={() => naveTo("users")}
        fullWidth
        startIcon={<i className="bi bi-person-fill-gear" />}>
        Users
      </Button>
      <Button
        onClick={() => naveTo("posts")}
        fullWidth
        startIcon={<i className="bi bi-postcard-fill" />}>
        Posts
      </Button>
      <Button
        onClick={() => naveTo("categories")}
        fullWidth
        startIcon={<i className="bi bi-signpost-2" />}>
        Categories
      </Button>
      <Button
        onClick={() => naveTo("comments")}
        fullWidth
        startIcon={<i className="bi bi-chat-square-text-fill" />}>
        Comments
      </Button>
    </Stack>
  );
}
