import { Box, Container, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "../../store/seloctors/selectPosts";
import { useParams } from "react-router-dom";
import { getPosts } from "../../redux/apis/postCallApi";
import { useEffect } from "react";
import ListPosts from "../Home/ListPosts";

export default function Category() {
  const { categoryName } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(getPosts(null, categoryName));

    return () => {
      dispatch({ type: "post/setNullPosts" });
    };
  }, []);

  return (
    <Box sx={{ minHeight: "95vh" }}>
      <Container>
        <Typography
          sx={{ p: "1rem", pb: "4rem", textDecoration: "underline 1px gray" }}
          variant="h2">
          : {categoryName?.toUpperCase()}
        </Typography>
        <ListPosts posts={posts} />
      </Container>
    </Box>
  );
}
