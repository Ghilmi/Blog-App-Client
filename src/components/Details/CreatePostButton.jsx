/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/apis/postCallApi";
import Backdrop from "@mui/material/Backdrop";
import {
  selectMessageFromPost,
  selectOnePost,
} from "../../store/seloctors/selectPosts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePostButton({
  image,
  category,
  description,
  title,
}) {
  const message = useSelector(selectMessageFromPost);
  const { token } = useSelector(selectUserFromAuth);
  const user = useSelector(selectUserFromAuth);
  const dispatch = useDispatch();
  const [temp, setTemp] = useState(false);
  let post = useSelector(selectOnePost);
  const naveTo = useNavigate();
  useEffect(() => {
    dispatch({
      type: "post/setMessage",
      payload: {
        inLoading: null,
        error: null,
      },
    });

    return () => {
      dispatch({
        type: "post/setMessage",
        payload: {
          inLoading: null,
          error: null,
        },
      });
    };
  }, []);

  useEffect(() => {
    setTemp(true);
    setTimeout(() => setTemp(false), 3000);

    if (message.inLoading) {
      handleOpen();
    } else {
      handleClose();
      !message.error &&
        message.inLoading !== null &&
        naveTo(`/post/details/${post?._id}`);
    }
  }, [message]);
  const handelCreate = async () => {
    if (title && category && description) {
      dispatch(
        createPost(
          user.id,
          title,
          category,
          description,
          image,
          `Bearer ${token}`
        )
      );

      setTemp(true);
    }
  };

  //progress
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {message.inLoading ? (
        <>
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          />
        </>
      ) : temp ? (
        <IconButton
          sx={{
            "& i.bi-hand-thumbs-up": {
              fontSize: "2.4rem",
              color: green[400],
            },
            "& i.bi-hand-thumbs-down": { fontSize: "2.4rem", color: red[400] },
          }}>
          <i
            className={
              "bi bi-" + (message.error ? "hand-thumbs-down" : "hand-thumbs-up")
            }
          />
        </IconButton>
      ) : (
        <Button onClick={handelCreate} fullWidth variant="contained">
          Create
        </Button>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
