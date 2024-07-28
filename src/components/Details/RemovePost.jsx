import { IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { grey } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { selectOnePost } from "../../store/seloctors/selectPosts";
import { removePost } from "../../redux/apis/postCallApi";

export default function RemovePost() {
  const { id } = useParams();
  const user = useSelector(selectUserFromAuth);
  const post = useSelector(selectOnePost);
  const dispatch = useDispatch();
  const navTo = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    if (user?.token && id && post?.user._id === user?._id) {
      dispatch(removePost(id, `Bearer ${user?.token}`));
      navTo("/");
    }
    handleClose();
  };
  return (
    <>
      <IconButton
        sx={{
          color: red[800],
          width: "3rem",
          height: "3rem",

          "&:hover": {
            color: red[600],
          },
        }}
        onClick={handleClickOpen}>
        <i className="bi bi-trash-fill"></i>
      </IconButton>
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
            Are you sure you want to delete this Post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: grey[700] }} onClick={handleClose}>
            Disagree
          </Button>
          <Button sx={{ color: red[700] }} onClick={handleAgree} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
