/* eslint-disable react/prop-types */
import { Box, Skeleton } from "@mui/material";
import { Avatar, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import SaveImage from "./SaveImage";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { selectRandomColor } from "../../store/seloctors/selectMode";

// eslint-disable-next-line react/prop-types
export default function Header_Details({ post = null }) {
  const AvatarColor = useSelector(selectRandomColor);
  const [image, setImage] = useState({ url: null, imageFile: null });
  const [createdByOurUser, setCreatedByOurUser] = useState(false);
  const user = useSelector(selectUserFromAuth);
  const naveTo = useNavigate();
  useEffect(() => {
    setCreatedByOurUser(post?.user?._id === user?._id);
  }, [post, user]);
  const handelChangeImage = (event) => {
    if (!event.target.files[0]) return 0;
    const url = URL.createObjectURL(event.target.files[0]);
    setImage({ url, imageFile: event.target.files[0] });
  };
  const handelNaveToUserProfile = () => {
    if (post != null && post != undefined) {
      naveTo(`/profile/${post?.user?._id || post?.user}`);
    }
  };
  return (
    <>
      <Stack
        sx={{
          "& img": {
            height: { xs: 300, sm: 500, md: 700 },
            width: "100%",
            py: { sx: 1, sm: 4 },
            objectFit: "contain",
          },
          justifyContent: "center",
          alignItems: "center",
        }}>
        {post ? (
          <img src={image.url || (post && post.image.url)} loading="lazy" />
        ) : (
          <Skeleton
            sx={{ height: { xs: 300, sm: 500, md: 700 }, width: "100%" }}
          />
        )}
        {createdByOurUser && (
          <Box sx={{ width: "100%" }}>
            <Stack
              sx={{
                "& input": { display: "none" },
                "& label": {
                  bgcolor: blue[700],
                  borderRadius: 2,
                  p: 1,
                  color: "#eee",
                  cursor: "pointer",
                },
                "&:hover label": { bgcolor: blue[800] },
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "row",
                gap: 1,
                width: "100%",
              }}>
              {post ? (
                <label htmlFor="contained-button-file">
                  <i className="bi bi-upload" /> Choose Image
                </label>
              ) : (
                <Skeleton sx={{ width: 100, height: 50 }} />
              )}
              <input
                onChange={handelChangeImage}
                accept="image/*"
                id="contained-button-file"
                type="file"
              />
              <SaveImage image={image} />
            </Stack>
          </Box>
        )}
      </Stack>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          {post ? post?.title : <Skeleton sx={{ width: "100%" }} />}
        </Typography>
        <Stack
          sx={{
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
            alignItems: "center",
            my: 3,
          }}
          className="avatare">
          {post ? (
            <Avatar
              onClick={handelNaveToUserProfile}
              sx={{
                width: 50,
                height: 50,
                cursor: "pointer",
                bgcolor: AvatarColor,
              }}
              alt={"user :" + post && post?.user.name}
              src={post && post?.user.profilePhoto.url}>
              {post && post?.user.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Skeleton variant="circular" sx={{ width: 50, height: 50 }} />
          )}
          <Box>
            <Typography
              onClick={handelNaveToUserProfile}
              variant="h6"
              sx={{ fontWeight: 700, color: blue[900], cursor: "pointer" }}>
              {post ? (
                `@ ${post?.user.name.toLowerCase()}`
              ) : (
                <Skeleton sx={{ width: 100 }} />
              )}
            </Typography>
            <Typography
              sx={{ fontWeight: 500, color: blue[200] }}
              variant="body1">
              {post ? (
                moment(post?.createdAt).format("MMM DD ,YYYY")
              ) : (
                <Skeleton sx={{ width: 100 }} />
              )}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
