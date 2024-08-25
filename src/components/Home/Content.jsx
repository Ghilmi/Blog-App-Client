import { Container, Grid, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import ListPosts from "./ListPosts";
import CategoriesMenu from "./CategoriesMenu";

// eslint-disable-next-line react/prop-types
export default function Content({ posts }) {
  return (
    <>
      <Container
        sx={{
          mt: 5,
        }}>
        <Typography
          variant="h4"
          sx={{
            "&::before": {
              content: '""',
              position: "absolute",
              bottom: " -10px ",
              width: "100%",
              height: "4px",
              bgcolor: grey[700],
              display: "inline-block",
            },
            position: "relative",
            maxWidth: "max-content",
          }}>
          Latest Posts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <ListPosts posts={posts} />
          </Grid>
          <Grid
            sx={{ display: { xs: "none", md: "block" } }}
            item
            xs={12}
            md={3}>
            <CategoriesMenu />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
