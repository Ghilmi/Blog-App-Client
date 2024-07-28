import { Box, Divider, Grid, Stack } from "@mui/material";
import NavigationDashboard from "../../components/Dashboard/NavigationDashboard";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";

export default function Dashboard() {
  const user = useSelector(selectUserFromAuth);
  const naveTo = useNavigate();
  useEffect(() => {
    if (!user?.isAdmin) naveTo("/");
  }, [user]);
  return (
    <Box sx={{ minHeight: "87vh" }}>
      <Grid
        sx={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: 0,
        }}
        container>
        <Grid item xs={12} md={3}>
          <Stack
            sx={{
              flexDirection: "row",
              m: 0,
            }}>
            <NavigationDashboard />
            <Divider orientation="vertical" flexItem />
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
