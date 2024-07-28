import moment from "moment/moment.js";

import { IconButton, Paper } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import EditeComment from "./EditeComment";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../../redux/apis/commentCallApi";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { selectOnePost } from "../../store/seloctors/selectPosts";
// eslint-disable-next-line react/prop-types
export default function Comment({ comment = false, created = false }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserFromAuth);
  const { id: postId } = useSelector(selectOnePost);
  const handelDelete = () => {
    const commentData = {
      commentId: comment._id,
      postId,
    };
    removeComment(commentData, `Bearer ${user.token}`, dispatch);
  };

  const handeldate = (createdAt) => {
    const now = moment();

    const yearsDiff = now.diff(moment(createdAt), "y");
    const monthsDiff = now.diff(moment(createdAt), "M");
    const daysDiff = now.diff(moment(createdAt), "d");
    const hoursDiff = now.diff(moment(createdAt), "h");
    const minutesDiff = now.diff(moment(createdAt), "m");
    const secondsDiff = now.diff(moment(createdAt), "s");
    let messageTime;
    if (yearsDiff !== 0) {
      messageTime = `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
    } else if (monthsDiff !== 0) {
      messageTime = `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
    } else if (daysDiff !== 0) {
      messageTime = `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    } else if (hoursDiff !== 0) {
      messageTime = `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    } else if (minutesDiff !== 0) {
      messageTime = `${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;
    } else if (secondsDiff !== 0) {
      messageTime = `${secondsDiff} second${secondsDiff > 1 ? "s" : ""} ago`;
    } else {
      messageTime = "Just Now";
    }

    return messageTime;
  };

  return (
    <>
      <Paper
        sx={{
          border: 2,
          borderColor: grey[800],
          py: 1,
          px: 2,
          mb: 2,
          boxShadow:
            " 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.5,
          }}>
          <Typography variant="h5">{comment && comment.username}</Typography>{" "}
          <Typography>{handeldate(comment.createdAt)}</Typography>
        </Stack>
        <Typography variant="body1">{comment && comment.text}</Typography>
        <Stack
          sx={{
            my: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}>
          {created && (
            <>
              <EditeComment
                prevComment={comment.text}
                commentId={comment && comment._id}
              />
              <IconButton
                sx={{
                  color: red[800],
                  width: "3rem",
                  height: "3rem",

                  "&:hover": {
                    color: red[600],
                  },
                }}
                onClick={handelDelete}>
                <i className="bi bi-trash-fill"></i>
              </IconButton>
            </>
          )}
        </Stack>
      </Paper>
    </>
  );
}
