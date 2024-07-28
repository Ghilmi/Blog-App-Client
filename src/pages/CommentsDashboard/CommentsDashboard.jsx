import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";
import { useEffect } from "react";
import { getAllComments, removeComment } from "../../redux/apis/commentCallApi";
import { selectComments } from "./../../store/seloctors/selectComment";

const columns = [
  { field: "id", headerName: "Count", width: 90 },
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
    field: "text",
    headerName: "Comment",
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
  const dispatch = useDispatch();
  const user = useSelector(selectUserFromAuth);
  const handelDelete = () => {
    console.log(param.row);
    const commentData = {
      commentId: param.row.id,
      postId: param.row.id,
    };
    removeComment(commentData, `Bearer ${user.token}`, dispatch);
    console.log({ token: user?.token });
    if (user?.token) dispatch(getAllComments(`Bearer ${user?.token}`));
  };
  return (
    <Button onClick={handelDelete} variant="contained" color="error">
      Delete
    </Button>
  );
};

export default function CommentsDashboard() {
  const user = useSelector(selectUserFromAuth);
  const dispatch = useDispatch();
  const message = useSelector((state) => state?.comment?.message);
  useEffect(() => {
    if (user?.token) dispatch(getAllComments(`Bearer ${user?.token}`));
    console.log(message);
  }, [user, message]);
  const comments = useSelector(selectComments);

  const rows = comments
    ? comments?.map((comment) => {
        console.log(comment?.user);
        return {
          id: comment._id,
          name: comment.username,
          image: comment?.user?.profilePhoto?.url,
          text: comment.text,
          postId: comment?.postId,
        };
      })
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
        }}>
        Comments
      </Typography>
      <DataGrid
        sx={{
          textAlign: "start",
          "& .css-1xsg8cl-MuiDataGrid-root ,& .MuiDataGrid-cell--textCenter": {
            justifyContent: "start",
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: "start",
          },
        }}
        rows={rows}
        columns={columns}
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
