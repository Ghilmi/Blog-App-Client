/* eslint-disable react/prop-types */
import { Container, Divider, Stack, Typography } from "@mui/material";
import ListPosts from "../../components/Home/ListPosts";
import { grey } from "@mui/material/colors";
import Delete from "./Delete";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../../store/seloctors/selectUser";

export default function ProfilePosts({ user, isLoginUser }) {
  const auther = useSelector(selectUserProfile);
  return (
    <>
      <Container className="posts">
        <Stack>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: "bold",
            }}>
            {isLoginUser
              ? `@${user?.name.toLowerCase()}      `
              : `@${auther?.name.toLowerCase()}    `}{" "}
            Posts(
            {isLoginUser ? user?.posts.length : auther?.posts.length})
          </Typography>
          <Divider
            sx={{
              mt: 1,
              width: "100%",
              borderWidth: "2px",
              borderColor: grey[700],
            }}
          />
        </Stack>

        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexDirection: "column",
            my: 2,
            "& .postsList": {
              flexDirection: "coloumn-reverse !important",
            },
          }}>
          <ListPosts
            mode="profile"
            posts={isLoginUser ? user?.posts : auther?.posts}
            user={isLoginUser ? user : auther}
          />
        </Stack>
        {isLoginUser && <Delete user={user} message="Profile" />}
      </Container>
    </>
  );
}
