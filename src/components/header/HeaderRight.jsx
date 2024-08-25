/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
} from "@mui/material";
import { yellow } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";
import { selectRandomColor } from "../../store/seloctors/selectMode";

export default function HeaderRight({ handelMode, theme }) {
  const user = useSelector(selectUserFromAuth);
  const naveTo = useNavigate(); //
  const [anchorEl, setAnchorEl] = useState(null);
  const AvatarColor = useSelector(selectRandomColor);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handelClickOnProfile = () => {
    if (user) naveTo(`/profile/${user.id}`);
    handleClose();
  };
  const handelLogout = () => {
    dispatch({ type: "auth/setUser", payload: null });
    naveTo("/");
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
                  src={user && user?.profilePhoto?.url}
                  sx={{ width: 32, height: 32, bgcolor: AvatarColor }}>
                  {user && user != undefined
                    ? user?.name[0]?.toUpperCase()
                    : "?"}
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
              <MenuItem>{user?.name}</MenuItem>
              <Divider variant="middle" />
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
            <Tooltip title="login">
              <Button
                onClick={() => naveTo("/login")}
                variant="contained"
                startIcon={<i className="bi bi-journal-check"></i>}></Button>
            </Tooltip>
            <Tooltip title="register">
              <Button
                onClick={() => naveTo("/register")}
                variant="contained"
                startIcon={<i className="bi bi-person-add"></i>}></Button>
            </Tooltip>
          </>
        )}

        <Tooltip
          title={theme?.palette.mode === "dark" ? "dark mode" : "light mode"}>
          <Button
            variant="text"
            sx={{
              m: 0,
              ml: { xs: "2px", md: "5px" },
              bgcolor: "#transparent",
              "& i::before": { color: yellow[600] },
              p: "0 !important",
            }}
            onClick={handelMode}>
            {theme?.palette.mode === "dark" ? (
              <i className="bi bi-lightbulb"></i>
            ) : (
              <i className="bi bi-lightbulb-fill"></i>
            )}
          </Button>
        </Tooltip>
      </Stack>
    </>
  );
}
