/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { grey, red } from "@mui/material/colors";
import { useDispatch } from "react-redux";
import { handelDeleteUser } from "./../../helpers/handelDeleteUser";

// eslint-disable-next-line react/prop-types
export default function Delete({ message = "profile", user }) {
  const naveTo = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        variant="outlined"
        color="error"
        sx={{
          mb: 3,
          fontSize: { xs: "0.5rem", md: "1rem" },
          "& i": { fontSize: { xs: "0.4rem", md: "1rem" } },
        }}
        startIcon={<i className="bi bi-trash"></i>}>
        Remove Your {message}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title-delete"
        aria-describedby="alert-dialog-description-delete">
        <Stack
          sx={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
            "& i": { fontSize: { xs: "2rem", md: "3rem" }, color: "red" },
          }}>
          <i className="bi bi-exclamation-triangle-fill"></i>
        </Stack>
        <DialogTitle id="alert-dialog-title-delete">
          {"Delete Your Profile?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your {message}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: grey[700] }} onClick={handleClose}>
            Disagree
          </Button>
          <Button
            sx={{ color: red[700] }}
            onClick={() =>
              handelDeleteUser(user, handleClose, dispatch, naveTo)
            }
            autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
