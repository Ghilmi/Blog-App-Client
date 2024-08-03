import { Alert, Box, Snackbar } from "@mui/material";
import urlOfHerroImg from "../../images/home-bg.jpg";
import Herro from "../../components/Home/Herro";
import Content from "../../components/Home/Content";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../../redux/apis/postCallApi";
import { selectPosts } from "../../store/seloctors/selectPosts";
export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPosts());
    console.log(posts);
    console.log("posts");
  }, []);

  const message = useSelector((state) => state.auth.message);
  useEffect(() => {
    handleClick();
    console.log(posts);
    return () => {
      handleClose();
      dispatch({
        type: "auth/setMessage",
        payload: {
          text: null,
          inLoading: false,
          error: false,
          random: Math.random(),
        },
      });
    };
  }, []);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Box>
      <Herro urlOfHerroImg={urlOfHerroImg} />
      <Content posts={posts ? posts?.slice(0, 6) : null} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}>
          {message.inLoading ? message.text : "loading..."}
        </Alert>
      </Snackbar>
    </Box>
  );
}
