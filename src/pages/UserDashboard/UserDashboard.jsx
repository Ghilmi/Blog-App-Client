import { Avatar, Box, Stack, Typography, Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  RemoveUserFromDashboard,
  getAllUsers,
} from "../../redux/apis/userCallApi";
import { selectUsers } from "../../store/seloctors/selectUser";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Id", width: 90 },
  {
    field: "User",
    headerName: "User",
    type: "actions",
    renderCell: (params) => <Avatare {...params} />,
    editable: false,
    width: 300,
  },

  {
    field: "email",
    headerName: "Email",
    type: "string",
    width: 110,
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
      <Avatar
        sx={{ width: 33, height: 33 }}
        src={image && image.url}
        alt={name[0]}
      />
      {name}
    </Stack>
  );
};
const Action = (param) => {
  const naveTo = useNavigate();
  const user = useSelector(selectUserFromAuth);
  const dispatch = useDispatch();
  const handelView = () => {
    naveTo(`/profile/${param.row.id}`);
  };
  const handelDelete = async () => {
    if (user && !param.row.isAdmin) {
      const authoraition = `Bearer ${user?.token}`;
      dispatch(RemoveUserFromDashboard(param.row.id, authoraition));
    }
  };
  return (
    <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Button onClick={handelView} variant="contained" color="success">
        View
      </Button>

      {!param.row.isAdmin && (
        <Button onClick={handelDelete} variant="contained" color="error">
          Delete
        </Button>
      )}
    </Stack>
  );
};

export default function UserDashboard() {
  const user = useSelector(selectUserFromAuth);
  const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      const authoraition = `Bearer ${user?.token}`;
      dispatch(getAllUsers(authoraition));
    }
  }, [user]);

  const rows = users
    ? users?.map((user) => ({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        image: user?.profilePhoto,
        isAdmin: user?.isAdmin,
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
        }}>
        Users
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
