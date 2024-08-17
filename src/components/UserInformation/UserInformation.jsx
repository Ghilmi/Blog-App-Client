/* eslint-disable react/prop-types */
import {
  Avatar,
  Badge,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { green, grey } from "@mui/material/colors";
import UpdateProfile from "./UpdateProfile";
import moment from "moment/moment.js";
import UploadPhotoButton from "./UploadPhotoButton";
import { useSelector } from "react-redux";
import { selectRandomColor } from "../../store/seloctors/selectMode";
// eslint-disable-next-line react/prop-types
export default function UserInformation({ user, isLoginUser = null }) {
  const [avatar, setAvatar] = useState({ url: null, file: null });
  const AvatarColor = useSelector(selectRandomColor);
  //
  const handelAvatar = (e) => {
    if (e.target.files[0] && user) {
      setAvatar({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
    } else {
      setAvatar({ url: null, file: null });
    }
  };
  return (
    <>
      <Container
        sx={{
          textAlign: "center",
          bgcolor: grey[900],
          borderRadius: "2px",
          py: 4,
          my: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "center",
            "& i": {
              fontSize: "0.7rem",
              bgcolor: grey[200],
              color: grey[900],
              p: 1,
              borderRadius: "50%",
              cursor: "pointer",
            },
          }}>
          {user ? (
            isLoginUser ? (
              <>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: grey[300],
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    },
                  }}
                  badgeContent={
                    <IconButton
                      sx={{
                        "& input": { display: "none" },
                      }}>
                      <label
                        htmlFor="icon-button-file"
                        className="bi bi-camera2">
                        <input
                          onChange={(e) => handelAvatar(e)}
                          id="icon-button-file"
                          type="file"
                          placeholder=""
                          accept="image/*"
                        />
                      </label>
                    </IconButton>
                  }>
                  <Avatar
                    alt={user ? user?.name.toUpperCase() : "?"}
                    // eslint-disable-next-line react/prop-types
                    src={
                      avatar.url ? avatar.url : user && user?.profilePhoto?.url
                    }
                    sx={{
                      width: { xs: 70, md: 100 },
                      height: { xs: 70, md: 100 },
                      bgcolor: AvatarColor,
                      fontSize: "3rem",
                    }}
                  />
                </Badge>
                <UploadPhotoButton
                  isLoginUser={isLoginUser}
                  image={avatar.file}
                />
              </>
            ) : (
              <Avatar
                alt={user ? user?.name.toUpperCase() : "?"}
                // eslint-disable-next-line react/prop-types
                src={avatar.url ? avatar.url : user && user?.profilePhoto?.url}
                sx={{
                  width: { xs: 70, md: 100 },
                  height: { xs: 70, md: 100 },
                  bgcolor: AvatarColor,
                  fontSize: "3rem",
                }}
              />
            )
          ) : (
            <Skeleton
              variant="circular"
              sx={{
                width: { xs: 70, md: 100 },
                height: { xs: 70, md: 100 },
                bgcolor: grey[100],
              }}
            />
          )}
        </Stack>
        <Typography
          sx={{
            color: grey[200],
            fontWeight: 700,
            fontSize: { xs: "1.4rem", sm: "3rem" },
          }}
          className="name">
          {user ? (
            user?.name
          ) : (
            <Skeleton sx={{ bgcolor: grey[100] }} width={100} />
          )}
        </Typography>
        <Typography
          sx={{
            color: grey[200],
            fontSize: { xs: "0.8rem", sm: "1rem" },
            minHeight: 20,
          }}
          className="bio">
          {user ? (
            user?.bio
          ) : (
            <Skeleton sx={{ bgcolor: grey[100] }} height={20} width={200} />
          )}
        </Typography>
        <Typography
          sx={{
            color: grey[400],
            fontSize: { xs: "0.6rem", sm: "0.8rem" },
            fontWeight: 700,
            "& span": { color: green[300] },
          }}
          className="Date">
          Date Joined:{" "}
          <span>
            {user ? (
              moment(user.createdAt).format("MMM DD ,YYYY")
            ) : (
              <Skeleton width={60} sx={{ bgcolor: grey[100] }} />
            )}
          </span>
        </Typography>
        {isLoginUser && (
          <UpdateProfile userId={user && user._id} token={user && user.token} />
        )}
      </Container>
    </>
  );
}
