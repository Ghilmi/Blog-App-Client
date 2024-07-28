import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { fetchData } from "../../../test.js";
import { useDispatch, useSelector } from "react-redux";
import { selectPosts } from "./../../store/seloctors/selectPosts";
import { selectUser } from "../../store/seloctors/selectUser.js";
import { useEffect } from "react";
import { getPosts, removePost } from "./../../redux/apis/postCallApi";
import { useNavigate } from "react-router-dom";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth.js";

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "user",
    headerName: "User",
    type: "actions",
    renderCell: (params) => <Avatare {...params} />,
    editable: false,
    width: 300,
    description: "post name",
  },

  {
    field: "title",
    headerName: "Post Title",
    description: "title of post",
    type: "string",
    width: 160,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    description: "have an action",
    sortable: false,
    width: 160,
    type: "actions",
    renderCell: (params) => <Action {...params} />,
    editable: false,
  },
];
const Avatare = (params) => {
  const { name, image } = params.row;
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "start",
        textAlign: "start",
        gap: 1,
      }}>
      <Avatar sx={{ width: 33, height: 33 }} src={image} alt={name[0]} />
      {name}
    </Stack>
  );
};
const Action = (param) => {
  const naveTo = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUserFromAuth);
  const handelView = () => {
    naveTo(`/post/details/${param.row.id}`);
  };
  const handelDelete = () => {
    dispatch(removePost(param.row.id, `Bearer ${user?.token}`));
    dispatch(getPosts());
  };
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Button onClick={handelView} variant="contained" color="success">
        View
      </Button>

      <Button onClick={handelDelete} variant="contained" color="error">
        Delete
      </Button>
    </Stack>
  );
};

export default function PostsDashboard() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const message = useSelector((state) => state?.postReducer?.message);
  useEffect(() => {
    if (user) {
      dispatch(getPosts());
    }
  }, [user, message]);
  const posts = useSelector(selectPosts);

  let rows = posts
    ? posts?.map((post) => ({
        id: post._id,
        name: post.user.name,
        image: post.user.profilePhoto.url,
        title: post.title,
      }))
    : [];
  return (
    <Box>
      <Typography
        variant="h3"
        color="initial"
        sx={{
          textDecoration: "underline",
          textUnderlineOffset: 9,
          textDecorationColor: grey[800],
          textDecorationThickness: 4,
          mb: 2,
          mt: 2,
          fontWeight: "bold",
          pl: 2,
          color: grey[800],
          cursor: "pointer",
        }}
        onClick={fetchData}>
        Posts
      </Typography>
      <DataGrid
        sx={{
          textAlign: "start",
          "& .css-1xsg8cl-MuiDataGrid-root ,& .MuiDataGrid-cell--textCenter": {
            justifyContent: "start",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer ,.MuiDataGrid-columnHeaderTitleContainer,.css-19kquh3-MuiDataGrid-root .MuiDataGrid-columnHeader--alignCenter .MuiDataGrid-columnHeaderTitleContainer":
            {
              justifyContent: "start !important",
            },
        }}
        rows={rows}
        columns={columns || []}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
