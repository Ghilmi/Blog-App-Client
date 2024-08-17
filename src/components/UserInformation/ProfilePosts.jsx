/* eslint-disable react/prop-types */
import { Container, Divider, Stack, Typography } from "@mui/material";
import ListPosts from "../../components/Home/ListPosts";
import { grey } from "@mui/material/colors";
import Delete from "./Delete";

export default function ProfilePosts({ user, isLoginUser }) {
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
            {user && `@ ${user.name.toLowerCase()}`} Posts(
            {user && user.posts.length})
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
          }}>
          <ListPosts mode="profile" posts={user && user.posts} />
        </Stack>
        {isLoginUser && <Delete user={user} message="Profile" />}
      </Container>
    </>
  );
}
