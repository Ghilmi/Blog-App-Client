import { green, grey } from "@mui/material/colors";
/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateUserButton({ handleClickOpen }) {
  const message = useSelector((state) => state.user.message);

  const [temp, setTemp] = useState(false);

  useEffect(() => {
    setTemp(true);
    setTimeout(() => setTemp(false), 3000);
  }, [message]);

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
              fontSize: "2.4rem",
              color: green[400],
            },
            "& i.bi-hand-thumbs-down": { fontSize: "2.4rem", color: red[400] },
          }}>
          <i
            className={
              "bi bi-" + (message.error ? "hand-thumbs-down" : "hand-thumbs-up")
            }
          />
        </IconButton>
      ) : (
        <Button
          onClick={handleClickOpen}
          sx={{
            bgcolor: green[400],
            color: grey[100],
            px: { xs: 1, sm: 2 },
            py: { xs: 0.4, sm: 1 },
            fontWeight: 500,
            fontSize: { xs: "0.5rem", sm: "0.7rem" },
          }}
          variant="contained"
          startIcon={<i className="bi bi-pencil"></i>}>
          Update Profile
        </Button>
      )}
    </Box>
  );
}
