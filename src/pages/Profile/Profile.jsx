import { Box } from "@mui/material";
import UserInformation from "../../components/UserInformation/UserInformation";
import ProfilePosts from "../../components/UserInformation/ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "./../../store/seloctors/selectUserFromAuth";
import { useEffect, useState } from "react";
import { getUserInformation } from "../../redux/apis/userCallApi";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserProfile } from "../../store/seloctors/selectUser";

export default function Profile() {
  let [user, setUser] = useState();
  const loginUser = useSelector(selectUserFromAuth);
  const userProfile = useSelector(selectUserProfile);
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const message = useSelector((state) => state.user.message);
  const naveTo = useNavigate();

  useEffect(() => {
    console.log(loginUser?._id);
    console.log({ userId });
    if (loginUser?._id === userId) {
      dispatch(getUserInformation(user?._id, `Bearer ${user?.token}`));
      setUser(loginUser);
    } else {
      dispatch(getUserInformation(userId, null));
      setUser(userProfile);
    }
  }, [message]);
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: "user/setMessage",
        payload: {
          inLoading: false,
          error: false,
          random: Math.random(),
        },
      });
    }, 500);
  }, []);
  useEffect(() => {
    const timeId = setTimeout(() => {
      if (!loginUser) {
        naveTo("/");
      }
    }, 2000);
    return clearTimeout(timeId);
  }, [loginUser]);
  return (
    <Box sx={{ minHeight: "90vh" }}>
      <UserInformation isLoginUser={loginUser?._id === userId} user={user} />
      <ProfilePosts isLoginUser={loginUser?._id === userId} user={user} />
    </Box>
  );
}
