import { Box, Container, Pagination, Stack } from "@mui/material";
import Content from "../../components/Home/Content";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountOfPosts, getPosts } from "../../redux/apis/postCallApi";
import {
  selectPosts,
  selectPostsCount,
} from "../../store/seloctors/selectPosts";

export default function Posts() {
  const dispatch = useDispatch();
  const countOfPosts = useSelector(selectPostsCount);
  const [page, setPage] = useState(1);

  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);
  useEffect(() => {
    dispatch(getCountOfPosts());
  }, []);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Container>
        <Content posts={posts} />
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            my: 3,
          }}>
          <Pagination
            variant="outlined"
            color="primary"
            count={countOfPosts ? Math.ceil(+countOfPosts / 6) : 0}
            page={page}
            onChange={handleChange}
          />
        </Stack>
      </Container>
    </Box>
  );
}
