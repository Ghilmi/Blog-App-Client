import { useNavigate, useParams } from "react-router-dom";
import { green, grey } from "@mui/material/colors";
/* eslint-disable react/prop-types */
import {
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { getUserInformation, uploadPhoto } from "../../redux/apis/userCallApi";

export default function UploadPhotoButton({ image, setAvatar }) {
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

      if (userId === user?._id) {
        user?._id &&
          dispatch(getUserInformation(user?._id, `Bearer ${user?.token}`));
      } else {
        userId && dispatch(getUserInformation(userId, null));
      }
      naveTo(`/profile/${user._id}`);
      setAvatar({ url: null, file: null });
    } else console.log("error");
  };
  return (
    <Tooltip
      title={
        !image
          ? "Please chose photo (max size: 3mb),only image type"
          : " (max size: 5mb),only image type"
      }>
      <Stack sx={{ width: "100%" }}>
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
                color: green[400],
                width: "30px",
                height: "30px",
              },
              "& i.bi-hand-thumbs-down": {
                color: red[400],
                width: "30px",
                height: "30px",
              },
            }}>
            <i
              className={
                "bi bi-" +
                (message.error ? "hand-thumbs-down" : "hand-thumbs-up")
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
            }}
            disabled={image ? false : true}>
            Upload
          </Button>
        )}
        <Typography
          textOverflow={"ellipsis"}
          whiteSpace={"nowrap"}
          variant="caption"
          ml={3}
          color={message.error ? red[300] : grey[300]}
          sx={{ opacity: 0.4 }}
          fontSize={"0.6rem"}>
          chose photo (max size: 5mb),only image type
        </Typography>
      </Stack>
    </Tooltip>
  );
}
