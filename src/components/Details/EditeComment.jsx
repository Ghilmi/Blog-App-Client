/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { updateComment } from "../../redux/apis/commentCallApi";
import { selectOnePost } from "../../store/seloctors/selectPosts";
export default function EditeComment({ commentId, prevComment }) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(prevComment);
  const user = useSelector(selectUserFromAuth);
  const { id: postId } = useSelector(selectOnePost);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          color: green[800],
          width: "3rem",
          height: "3rem",

          "&:hover": {
            color: green[600],
          },
        }}>
        <i className="bi bi-pencil-square"></i>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();

            if (comment && user) {
              const commentData = {
                text: comment,
                commentId,
                postId,
              };
              updateComment(commentData, `Bearer ${user.token}`, dispatch);
              setComment("");
            }
            handleClose();
          },
        }}>
        <DialogTitle>Update Your Comment</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update your comment, please enter your comment.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="comment"
            label="comment"
            fullWidth
            variant="standard"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
