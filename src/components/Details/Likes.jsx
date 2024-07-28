/* eslint-disable react/prop-types */
import { IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handelLike } from "../../redux/apis/postCallApi";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
//length
export default function Likes({ post }) {
  const [like, setLike] = useState();
  const dispatch = useDispatch();
  const user = useSelector(selectUserFromAuth);

  useEffect(() => {
    const isLiked = post && post.likes.filter((likeId) => likeId === user._id);
    setLike(Array.isArray(isLiked) ? isLiked.length === 1 : false);
  }, []);
  const handelClick = () => {
    if (user?.token) {
      setLike((prev) => !prev);
      handelLike(post._id, `Bearer ${user?.token}`, dispatch);
    }
  };
  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 0.5,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        className="like">
        <IconButton onClick={handelClick}>
          {like ? (
            <i className="bi bi-suit-heart-fill" />
          ) : (
            <i className="bi bi-suit-heart" />
          )}
        </IconButton>
        <Typography>{post && post.likes?.length} likes</Typography>
      </Stack>
    </>
  );
}
