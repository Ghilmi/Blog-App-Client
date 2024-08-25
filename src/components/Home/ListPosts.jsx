/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import Post from "./Post";
import PostSkeleton from "../Skeletons/PostSkeleton";

// eslint-disable-next-line react/prop-types
export default function ListPosts({ posts, mode = "home", user }) {
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
      <Stack
        sx={{ m: 0, mb: 2, width: "100%", flexDirection: "column" }}
        className="postsList">
        {posts
          ? posts?.map((post) => {
              return (
                <Post
                  width={handelMode(mode)}
                  key={post._id}
                  post={
                    user
                      ? {
                          ...post,
                          user: { ...user },
                        }
                      : post
                  }
                />
              );
            })
          : arrySkeleton.map((item, index) => <PostSkeleton key={index} />)}
      </Stack>
    </>
  );
}

const arrySkeleton = new Array(5).fill("");
