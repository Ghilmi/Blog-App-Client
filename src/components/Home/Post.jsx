/* eslint-disable react/prop-types */
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Post({ post, width }) {
  const naveTo = useNavigate();
  const handelRedMore = () => {
    naveTo(`/post/details/${post?._id}`);
  };
  return (
    <>
      <Stack
        sx={{
          "& img": {
            width: "100%",
            objectFit: "content",
            aspictRatio: 1,
          },
          px: 2,
          py: 1,
          border: "2px solid #000",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          maxWidth: width,
          overflow: "hidden",
        }}
        className="Post">
        <img loading="lazy" src={post.image.url} alt="user avatar" />
        <Stack
          sx={{
            flexDirection: "row",

            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            fontSize: { xs: "0.6rem", sm: "1.2rem" },
          }}
          className="info">
          <Typography
            sx={{
              "& strong": {
                color: green[600],
                fontSize: "inherit",
              },
              "& span": { fontSize: "inherit" },
            }}
            className="author">
            <strong>Author:</strong>
            <span>{post?.user.name}</span>
          </Typography>
          <Typography
            sx={{ color: green[500], fontSize: "inherit" }}
            className="date">
            {post?.user && moment(post?.user?.createdAt).format("MMM DD ,YYYY")}
          </Typography>
        </Stack>

        <Box
          sx={{
            width: "100%",
            mt: 1,
          }}
          className="content">
          <Divider color={grey[400]} variant="fullWidth" />
          <Stack
            sx={{
              flexDirection: "row",
              mt: 2,
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.5rem" } }}
              className="title">
              {post?.title}
            </Typography>
            {post?.category && (
              <Typography
                sx={{
                  px: 2,
                  py: 0.5,
                  bgcolor: red[300],
                  border: "1px solid" + blue[100],
                  borderRadius: 4,

                  fontSize: { xs: "0.6rem", sm: "1rem" },
                }}
                className="category">
                {post?.category}
              </Typography>
            )}
          </Stack>
          <Typography
            sx={{
              mt: 1,
              mb: 2,
              textOverflow: "ellipsis  ",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textTransform: "capitalize",
              fontSize: { xs: "0.8rem", sm: "1.2rem" },
            }}
            className="description">
            {post?.description}
          </Typography>

          <Button
            onClick={handelRedMore}
            sx={{
              width: "100%",
            }}
            variant={"outlined"}>
            Read More
          </Button>
        </Box>
      </Stack>
    </>
  );
}
