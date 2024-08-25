/* eslint-disable react/prop-types */
import { IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handelLike } from "../../redux/apis/postCallApi";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { blue } from "@mui/material/colors";
//length
export default function Likes({ post }) {
  const [like, setLike] = useState(false);
  const [length, setLength] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectUserFromAuth);

  useEffect(() => {
    const isLiked =
      post &&
      post.likes.filter((likeId) => {
        if (!user) {
          return false;
        } else {
          return likeId === user?._id;
        }
      });
    setLike(Array.isArray(isLiked) ? isLiked.length === 1 : false);
    return () => {
      setLike(null);
    };
  }, [post]);

  const handelClick = async () => {
    if (user?.token) {
      setLike((prev) => !prev);
      const data = await handelLike(
        post._id,
        `Bearer ${user?.token}`,
        dispatch
      );

      setLength(data?.likes?.length);
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
          "& .bi-suit-heart-fill": {
            color: blue[400],
          },
        }}
        className="like">
        <IconButton onClick={handelClick}>
          {like ? (
            <i className="bi bi-suit-heart-fill" />
          ) : (
            <i className="bi bi-suit-heart" />
          )}
        </IconButton>
        <Typography>
          {length === null ? post && post?.likes?.length : length} likes
        </Typography>
      </Stack>
    </>
  );
}
