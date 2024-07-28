import { Box } from "@mui/material";
import urlOfHerroImg from "../../images/home-bg.jpg";
import Herro from "../../components/Home/Herro";
import Content from "../../components/Home/Content";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { posts as postsTemp } from "../../dummyData";
import { getPosts } from "../../redux/apis/postCallApi";
import { selectPosts } from "../../store/seloctors/selectPosts";
export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <Box>
      <Herro urlOfHerroImg={urlOfHerroImg} />
      <Content posts={posts ? posts?.slice(0, 6) : postsTemp} />
    </Box>
  );
}
