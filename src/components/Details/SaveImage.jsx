/* eslint-disable react/prop-types */
import { CircularProgress, IconButton } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { useDispatch, useSelector } from "react-redux";
import { handelUploadImage } from "../../redux/apis/postCallApi";
import {
  selectMessageFromPost,
  selectOnePost,
} from "../../store/seloctors/selectPosts";
import { useEffect, useState } from "react";

export default function SaveImage({ image }) {
  const message = useSelector(selectMessageFromPost);
  const { token } = useSelector(selectUserFromAuth);
  const post = useSelector(selectOnePost);
  const dispatch = useDispatch();
  const [temp, setTemp] = useState(false);
  useEffect(() => {
    setTemp(true);
    setTimeout(() => setTemp(false), 3000);
  }, [message]);
  const handelUpload = () => {
    if (image.imageFile)
      handelUploadImage(image.imageFile, post._id, `Bearer ${token}`, dispatch);
  };

  return (
    <div>
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
      ) : (
        <IconButton
          onClick={handelUpload}
          sx={{
            "& i.bi-hand-thumbs-up,& i.bi-save2-fill": {
              fontSize: "2.4rem",
              color: green[400],
            },
            "& i.bi-hand-thumbs-down": { fontSize: "2.4rem", color: red[400] },
          }}>
          {temp ? (
            <i
              className={
                "bi bi-" +
                (message.error ? "hand-thumbs-down" : "hand-thumbs-up")
              }
            />
          ) : (
            <i className="bi bi-save2-fill" />
          )}
        </IconButton>
      )}
    </div>
  );
}
