/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Post from "./Post";

// eslint-disable-next-line react/prop-types
export default function ListPosts({ posts, mode = "home" }) {
  const handelMode = (mode) => {
    switch (mode) {
      case "profile":
        return { xs: "300px", md: "700px" };

      default:
        return "100%";
    }
  };
  return (
    <>
      <Box sx={{ m: 0, mb: 2 }} className="PostsList">
        {posts &&
          posts?.map((post) => {
            return <Post width={handelMode(mode)} key={post._id} post={post} />;
          })}
      </Box>
    </>
  );
}