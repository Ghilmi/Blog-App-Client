/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { red, yellow } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";

export default function HeaderRight({ handelMode, theme }) {
  const user = useSelector(selectUserFromAuth);
  const navTo = useNavigate(); //
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelClickOnProfile = () => {
    if (user) navTo(`/profile/${user.id}`);
    handleClose();
  };
  const handelLogout = () => {
    dispatch({ type: "auth/setUser", payload: null });
    navTo("/");
    handleClose();
  };

  return (
    <>
      <Stack
        className="header-right"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          gap: "4px",
          "& button": {
            color: "#eee",
            fontSize: { xs: "0.5rem", md: "0.7rem" },
            py: { xs: "0.2rem", md: "0.3rem" },
            px: { xs: "0.3rem", md: "0.5rem" },
            width: "max-content",
            height: "max-content",
          },
        }}>
        <IconButton
          sx={{
            width: "5rem",
            height: "5rem",
            "& i::before": {
              color: red[700],
              fontSize: "3rem",
              cursor: "pointer",
            },
          }}>
          <i className="bi bi-search-heart"></i>
        </IconButton>
        {user ? (
          <>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}>
                <Avatar
                  src={user && user.profilePhoto.url}
                  sx={{ width: 32, height: 32 }}>
                  {user ? user.name[0].toUpperCase() : "?"}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              <MenuItem onClick={handelClickOnProfile}>
                <ListItemIcon>
                  <i className="bi bi-person-circle" />
                </ListItemIcon>
                Profile
              </MenuItem>

              <MenuItem onClick={handelLogout}>
                <ListItemIcon>
                  <i className="bi bi-box-arrow-right" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button
              onClick={() => navTo("/login")}
              variant="contained"
              startIcon={<i className="bi bi-journal-check"></i>}>
              log-in
            </Button>
            <Button
              onClick={() => navTo("/register")}
              variant="contained"
              startIcon={<i className="bi bi-person-add"></i>}>
              Register
            </Button>
          </>
        )}

        <Button
          variant="text"
          sx={{
            ml: { xs: "5px", md: "10px" },
            bgcolor: "#transparent",
            "& i::before": { color: yellow[600] },
            p: 0,
          }}
          onClick={handelMode}>
          {theme?.palette.mode === "dark" ? (
            <i className="bi bi-lightbulb"></i>
          ) : (
            <i className="bi bi-lightbulb-fill"></i>
          )}
        </Button>
      </Stack>
    </>
  );
}
