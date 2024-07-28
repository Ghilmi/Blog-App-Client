/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Likes from "./Likes";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CreateForme from "../CreateForme/CreateForme";
import { categories } from "../../dummyData";
import RemovePost from "./RemovePost";
import { createComment } from "../../redux/apis/commentCallApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";
import { UpdatePost, getOnePost } from "../../redux/apis/postCallApi";
import { useParams } from "react-router-dom";
import {
  selectMessageFromPost,
  selectOnePost,
} from "../../store/seloctors/selectPosts";

export default function Reaction_details() {
  const { id } = useParams();
  const messageFromPost = useSelector(selectMessageFromPost);
  useEffect(() => {
    if (id) dispatch(getOnePost(id));
  }, [messageFromPost]);
  const post = useSelector(selectOnePost);
  //add comments
  const [commentValue, setCommentValue] = useState("");
  //handel dialog to edit
  const [open, setOpen] = useState(false);
  //input statuts
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const user = useSelector(selectUserFromAuth);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelUpdatePost = () => {
    let data = {};
    if (title.length > 3) data.title = title;
    if (description.length > 3) data.description = description;
    if (category.length > 0) data.category = category;
    console.log(category);
    if (post?.id && user?.token)
      dispatch(UpdatePost(data, post?._id, `Bearer ${user?.token}`));
    console.log({ id: post?.id, token: user?.token });

    handleClose();
  };

  const handelComment = () => {
    console.log(post);
    if (commentValue && user) {
      const commentData = {
        text: commentValue,
        user: user?._id,
        postId: post?._id,
      };

      createComment(commentData, `Bearer ${user?.token}`, dispatch);
      setCommentValue("");
    }
  };

  const handelChange = (e) => {
    setCommentValue(e.target.value);
  };
  // Convert the date to ISO string format
  return (
    <>
      {user?._id === post?.user?.id && (
        <Stack>
          <Likes post={post && post} />
          <Box>
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
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Update Your Comment</DialogTitle>
              <DialogContent
                sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
                <DialogContentText>
                  To update your comment, please enter your comment.
                </DialogContentText>
                <CreateForme
                  title={title}
                  description={description}
                  category={category}
                  setCategory={setCategory}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  categories={categories}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handelUpdatePost}>Update</Button>
              </DialogActions>
            </Dialog>
            <RemovePost />
          </Box>
        </Stack>
      )}
      {user && (
        <>
          <TextField
            value={commentValue}
            onChange={(e) => handelChange(e)}
            fullWidth
            color="success"
            sx={{
              placeContent: "center",
              mt: 3,
              mb: 1,
            }}
            label="Comment"
            variant="standard"
          />
          <Button
            onClick={handelComment}
            sx={{ mb: 3 }}
            variant="contained"
            color="success">
            Comment
          </Button>
        </>
      )}
      <Typography variant="h5" sx={{ fontWeight: 600 }}>
        {post?.comments ? post?.comments.length : 0} Comments:
      </Typography>
      <Divider
        variant="fullWidth"
        sx={{ color: "#000", mb: 3, fontWeight: "600" }}
      />
      <Box sx={{ mb: 3 }}>
        {post &&
          post.comments.map((comment, key) => {
            return (
              <Comment
                created={user ? user.id === comment.user : false}
                key={key}
                comment={comment}
              />
            );
          })}
      </Box>
    </>
  );
}
