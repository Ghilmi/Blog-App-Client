import { Box, Stack, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";
import { useEffect } from "react";
import {
  getCategories,
  removeCategory,
} from "../../redux/apis/categoryCallApi";
import {
  messageFromCategory,
  selectCategories,
} from "./../../store/seloctors/slectCategories";

const columns = [
  { field: "id", headerName: "Id", width: 180 },

  {
    field: "title",
    headerName: "Post Title",
    description: "title of post",
    type: "string",
    width: 260,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    description: "have an action",
    sortable: false,
    width: 260,
    type: "actions",
    renderCell: (params) => <Action {...params} />,
    editable: false,
  },
];

const Action = (param) => {
  const user = useSelector(selectUserFromAuth);
  const dispatch = useDispatch();
  const message = useSelector(messageFromCategory);
  useEffect(() => {
    if (user?.token) dispatch(getCategories());
  }, [message]);
  const handelDelete = () => {
    if (user?.token)
      dispatch(removeCategory(param.row?.id, `Bearer ${user?.token}`));
    console.log(param.row);
  };
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Button onClick={handelDelete} variant="contained" color="error">
        Delete
      </Button>
    </Stack>
  );
};

export default function CategoriesDashboard() {
  const user = useSelector(selectUserFromAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.token) dispatch(getCategories());
  }, [user]);
  const categories = useSelector(selectCategories);
  const rows = categories
    ? categories?.map((category) => ({
        id: category._id,
        title: category.title,
      }))
    : [];
  useEffect(() => {
    console.log(categories);
  }, []);
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
        Categories
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
