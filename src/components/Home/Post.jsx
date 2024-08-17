/* eslint-disable react/prop-types */
import { Box, IconButton, Stack, Typography, Tooltip } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Post({ post }) {
  const naveTo = useNavigate();
  const handelRedMore = () => {
    naveTo(`/post/details/${post?._id}`);
  };
  const handelNaveToUserProfile = () => {
    if (post != null && post != undefined) {
      naveTo(`/profile/${post?.user?._id || post?.user}`);
    }
  };
  return (
    <Stack
      sx={{
        position: "relative",
        width: "100%",
        height: { md: "300px", sm: "250px", xs: "180px" },
        border: "1px solid",
        my: 2,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        overflow: "hidden",
        bgcolor: "#ededed47",
        backdropFilter: "blur(3px)",
        "& img": {
          objectFit: "cover",
          width: "100%",
          height: "100%",
          zIndex: 10,
          objectPosition: "center",
        },
      }}>
      <img loading="lazy" src={post.image.url} alt={post?.description} />
      <Box
        className="containt"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          zIndex: 11,
          width: "100%",
          minHeight: "150px",
          p: 1,
          bgcolor: "#95959547",
          backdropFilter: "blur(3px)",
        }}>
        <Stack
          flexDirection={"row"}
          sx={{
            justifyContent: "flex-start",
            alignItems: "center",
            gap: { xs: 0, sm: 1, md: 4 },
          }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              fontSize: { xs: "1rem", sm: "1.5rem" },
              textTransform: "unset",
            }}
            className="title">
            {post?.title}
          </Typography>
          <Tooltip title="Red More...">
            <IconButton
              onClick={handelRedMore}
              sx={{
                color: "rgba(255, 255, 255, 0.54)",
                fontSize: { xs: "10px", sm: "20px" },
              }}
              aria-label={`info about ${post?.title}`}>
              <i className="bi bi-info-circle"></i>
            </IconButton>
          </Tooltip>
        </Stack>
        <Typography
          onClick={handelNaveToUserProfile}
          variant="caption"
          sx={{ opacity: 0.6, cursor: "pointer" }}
          color="initial">
          @ {` ${post?.user.name}`}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            mb: 1,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textTransform: "unset",
            fontSize: { xs: "0.8rem", sm: "1rem" },
            width: "100%",
            textWrap: "no-wrap",
          }}
          className="description"
          variant="h5"
          color="initial">
          {post?.description}
        </Typography>
        <Stack
          flexDirection={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Typography
            variant="caption"
            sx={{ opacity: 0.6 }}
            color="initial">{`${post.likes?.length} like${
            post.likes?.length > 1 ? "s" : ""
          }`}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.6 }} color="initial">
            in{" "}
            {` ${post?.user && moment(post?.createdAt).format("MMM DD ,YYYY")}`}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
