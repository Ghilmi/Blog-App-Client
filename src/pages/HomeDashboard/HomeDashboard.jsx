import {
  Box,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import ElementsDashboard from "../../components/HomeDashboard/ElementsDashboard";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";
import { getUsersCount } from "./../../redux/apis/userCallApi";
import { getCommentsCount } from "../../redux/apis/commentCallApi";
import { getCountOfPosts } from "../../redux/apis/postCallApi";
import { selectPostsCount } from "./../../store/seloctors/selectPosts";
import { selectUsersCount } from "../../store/seloctors/selectUser";
import { selectCommentsCount } from "../../store/seloctors/selectComment";
import {
  createCategory,
  getCategoriesCount,
} from "../../redux/apis/categoryCallApi";
import {
  selectCategoriesCount,
  messageFromCategory as slectMessageFromcategory,
} from "../../store/seloctors/slectCategories";

export default function HomeDashboard() {
  const user = useSelector(selectUserFromAuth);
  const usersCount = useSelector(selectUsersCount);
  const postsCount = useSelector(selectPostsCount);
  const commentsCount = useSelector(selectCommentsCount);
  const messageFromcategory = useSelector(slectMessageFromcategory);
  const categoriesCount = useSelector(selectCategoriesCount);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const authoraition = `Bearer ${user?.token}`;
      dispatch(getUsersCount(authoraition));
      dispatch(getCommentsCount(authoraition));
      dispatch(getCountOfPosts());
      dispatch(getCategoriesCount(authoraition));
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      const authoraition = `Bearer ${user?.token}`;

      dispatch(getCategoriesCount(authoraition));
    }
  }, [user, messageFromcategory]);
  const [category, setCategory] = useState();

  const handelAdd = () => {
    if (user?.token && category)
      dispatch(createCategory(category, `Bearer ${user?.token}`));
    setCategory("");
  };
  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Grid
        sx={{
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
        spacing={2}
        container>
        <Grid item xs={12} sm={6} md={3}>
          <ElementsDashboard
            title={"Users"}
            path="users"
            numbers={usersCount && usersCount}
            icon="person-fill-gear"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ElementsDashboard
            title={"Posts"}
            path="posts"
            numbers={postsCount && postsCount}
            icon="postcard-fill"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ElementsDashboard
            title={"categories"}
            path="categories"
            numbers={categoriesCount && categoriesCount}
            icon="signpost-2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ElementsDashboard
            title={"comments"}
            path="comments"
            numbers={commentsCount && commentsCount}
            icon="chat-square-text-fill"
          />
        </Grid>
      </Grid>
      <Divider variant="middle" flexItem sx={{ borderWidth: 1, my: 2 }} />
      <Paper
        sx={{
          p: 2,
          mt: 5,
          mx: 1,
        }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add New Category
        </Typography>
        <TextField
          id="add-categorie"
          label="Add categorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
        />
        <Button
          onClick={handelAdd}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          color="success">
          Add
        </Button>
      </Paper>
    </Box>
  );
}
