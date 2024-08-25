import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import Header_Details from "../../components/Details/Header_Details";
import Reaction_details from "../../components/Details/Reaction_details";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnePost } from "../../redux/apis/postCallApi";
import { selectOnePost } from "../../store/seloctors/selectPosts";
export default function Details() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector(selectOnePost);

  useEffect(() => {
    dispatch(getOnePost(id));
    return () => {
      dispatch({ type: "post/resetPost" });
    };
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      <Container>
        <Header_Details post={post} />
        <Typography
          sx={{ textIndent: "2em", textAlign: "justify", mb: 3 }}
          className="description"
          variant="h6">
          {post ? (
            post.description
          ) : (
            <Skeleton width="100%" height={400} animation="wave" />
          )}
        </Typography>
        <Reaction_details post={post} />
      </Container>
    </Box>
  );
}
