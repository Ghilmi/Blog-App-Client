/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Likes from "../Details/Likes";
import { grey, yellow } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";

// eslint-disable-next-line react/prop-types
export default function Post({ post }) {
  const user = useSelector(selectUserFromAuth);
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
          <Tooltip title={post ? post?.description : "ride more..."}>
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
        <Stack flexDirection={"row"}>
          <Avatar
            onClick={handelNaveToUserProfile}
            sx={{
              width: 20,
              height: 20,
              cursor: "pointer",
              mr: 0.5,
              fontSize: "9px",
            }}
            alt={"user :" + post && post?.user.name}
            src={post && post?.user?.profilePhoto?.url}>
            {post && post?.user.name[0].toUpperCase()}
          </Avatar>
          <Typography
            onClick={handelNaveToUserProfile}
            variant="caption"
            sx={{ opacity: 0.6, cursor: "pointer" }}
            color="initial">
            {` @${post?.user.name}`}
          </Typography>
        </Stack>
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
          <Typography variant="caption" sx={{ opacity: 0.6 }} color="initial">
            in{" "}
            {` ${post?.user && moment(post?.createdAt).format("MMM DD ,YYYY")}`}
          </Typography>
          {user?._id && <Likes post={post && post} />}
        </Stack>
      </Box>
      <Typography
        sx={{
          position: "absolute",
          top: "10px",
          right: "14px",
          zIndex: 30,
          backgroundColor: yellow[700],
          py: 0.5,
          px: 1,
          fontWeight: 700,
          borderRadius: 1,
          border: "solid 2px",
          borderColor: grey[200],
          fontSize: 8,
        }}
        variant="caption"
        color="initial">
        {post.category?.title || post?.category}
      </Typography>
    </Stack>
  );
}
