/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { Avatar, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import SaveImage from "./SaveImage";

// eslint-disable-next-line react/prop-types
export default function Header_Details({ post }) {
  const [image, setImage] = useState({ url: null, imageFile: null });
  const [createdByOurUser, setCreatedByOurUser] = useState(false);
  const user = useSelector(selectUserFromAuth);

  useEffect(() => {
    setCreatedByOurUser(post?.user?._id === user?._id);
  }, [post, user]);
  const handelChangeImage = (event) => {
    if (!event.target.files[0]) return 0;
    const url = URL.createObjectURL(event.target.files[0]);
    setImage({ url, imageFile: event.target.files[0] });
  };

  return (
    <>
      <Stack
        sx={{
          "& img": {
            height: { xs: 300, sm: 500, md: 700 },
            maxWidth: "100%",
            py: { sx: 1, sm: 4 },
            objectFit: "fill",
          },
          justifyContent: "center",
          alignItems: "center",
        }}>
        <img src={image.url || (post && post.image.url)} loading="lazy" />
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
              <label htmlFor="contained-button-file">
                <i className="bi bi-upload" /> Choose Image
              </label>
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
          {post && post?.title}
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
          <Avatar
            alt={"user :" + post && post?.user.name}
            src={post && post?.user.profilePhoto.url}>
            {post && post?.user.name[0]}
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: blue[900] }}>
              {post && post?.user.name}
            </Typography>
            <Typography
              sx={{ fontWeight: 500, color: blue[200] }}
              variant="body1">
              {post && post?.createdAt}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
