import { Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";

// eslint-disable-next-line react/prop-types
export default function HeaderLeft({ togle, setTogle }) {
  const naveTo = useNavigate();
  const handelClick = (baseURL = "/") => {
    setTogle(false);
    naveTo(baseURL);
  };
  const user = useSelector(selectUserFromAuth);
  return (
    <>
      <Stack
        className="header-left"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-between" },
          flexShrink: 1,
          gap: { xs: 1, md: "5rem" },
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            "& i": {
              fontSize: "1.5rem",
              color: "#eee",
              position: "relative",
              left: "-2px",
            },
          }}>
          <Tooltip title="Home">
            <Button
              component="div"
              variant="text"
              sx={{
                p: 0,
                fontSize: { xs: "1rem", md: "1.5rem" },
                color: "#eee",
                textDecoration: "underline 2px",
                border: "none",
                m: 0,
                "& i": {
                  position: "relative",
                  left: "-10px",
                  bottom: "2.9px",
                },
                "&:hover": {
                  textDecoration: "underline 2px",
                },
              }}
              endIcon={<i className="bi bi-pencil-fill" />}
              onClick={() => naveTo("/")}>
              Blog
            </Button>
          </Tooltip>

          <IconButton
            sx={{
              Width: "0.5rem",
              left: "0.5rem",
              display: { xs: "none", sm: "inline-flex", md: "none" },
            }}
            onClick={() => setTogle((prev) => !prev)}>
            {togle ? (
              <i className="bi bi-x-lg" />
            ) : (
              <i className="bi bi-list" />
            )}
          </IconButton>
        </Box>

        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "center",
            "& button": {
              color: "#eee",
              fontSize: "0.7rem",
              border: "none",
              py: "0.3rem",
              px: "1.5rem",
              width: { xs: "100%", md: "max-content" },
              justifyContent: "flex-start",
            },
            gap: 1,
            position: { xs: "absolute", md: "static" },
            top: { xs: "100%", md: "auto" },
            bgcolor: blue[900],
            width: { xs: "100%", md: "max-content" },
            p: 0,
            left: 0,
            clipPath: {
              md: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              xs: !togle
                ? "polygon(0 0, 100% 0, 100% 0, 0 0)"
                : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            },
            tansition: "all 0.7s ease-in-out",
            zIndex: 20,
          }}>
          <Tooltip title="Home">
            <Button
              onClick={() => {
                handelClick("/");
              }}
              variant="text"
              startIcon={<i className="bi bi-house" />}>
              Home
            </Button>
          </Tooltip>
          <Tooltip title="All last Posts">
            <Button
              onClick={() => {
                handelClick("/posts");
              }}
              variant="text"
              startIcon={<i className="bi bi-postcard-heart-fill" />}>
              Posts
            </Button>
          </Tooltip>
          <Tooltip title="Search On Your Post">
            <Button
              onClick={() => {
                handelClick(`/search`);
              }}
              variant="text"
              startIcon={<i className="bi bi-search-heart"></i>}>
              Search
            </Button>
          </Tooltip>

          {user && (
            <Tooltip title="Create New Post">
              <Button
                onClick={() => {
                  handelClick("/create");
                }}
                variant="text"
                startIcon={<i className="bi bi-file-earmark-plus" />}>
                Create
              </Button>
            </Tooltip>
          )}
          {user?.isAdmin && (
            <Tooltip title="Admin Panel">
              <Button
                onClick={() => {
                  handelClick("/admin-dashbord");
                }}
                sx={{
                  flexWrap: "nowrap",
                }}
                variant="text"
                startIcon={<i className="bi bi-file-earmark-spreadsheet" />}>
                Admin Dashboard
              </Button>
            </Tooltip>
          )}
        </Stack>
      </Stack>
    </>
  );
}
