import { useNavigate, useParams } from "react-router-dom";
import { green, grey } from "@mui/material/colors";
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { getUserInformation, uploadPhoto } from "../../redux/apis/userCallApi";

export default function UploadPhotoButton({ image }) {
  const message = useSelector((state) => state.user.message);
  const user = useSelector(selectUserFromAuth);
  const [temp, setTemp] = useState(false);
  const naveTo = useNavigate();
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  useEffect(() => {
    setTemp(true);
    setTimeout(() => setTemp(false), 3000);
  }, [message]);
  const handelUpload = () => {
    if (user && image) {
      uploadPhoto(user._id, image, `Bearer ${user.token}`, dispatch);

      if (userId === user?._id)
        user?._id &&
          dispatch(getUserInformation(user?._id, `Bearer ${user?.token}`));
      else userId && dispatch(getUserInformation(userId, null));
      naveTo(`/profile/${user._id}`);
      console.log({ userId, user: user._id });
    } else console.log("error");
  };
  return (
    <Box sx={{ width: "100%" }}>
      {message.inLoading ? (
        <>
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%">
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          />
        </>
      ) : temp ? (
        <IconButton
          sx={{
            "& i.bi-hand-thumbs-up": {
              fontSize: "1.3rem",
              color: green[400],
            },
            "& i.bi-hand-thumbs-down": { fontSize: "1.3rem", color: red[400] },
          }}>
          <i
            className={
              "bi bi-" + (message.error ? "hand-thumbs-down" : "hand-thumbs-up")
            }
          />
        </IconButton>
      ) : (
        <Button
          onClick={handelUpload}
          variant="contained"
          sx={{
            mt: 2,
            ml: 1,
            fontSize: "0.5rem",
            px: 2,
            py: 0.5,
            bgcolor: grey[200],
            color: grey[900],
          }}>
          Upload
        </Button>
      )}
    </Box>
  );
}
