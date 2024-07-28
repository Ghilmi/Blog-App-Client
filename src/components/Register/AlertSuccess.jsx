/* eslint-disable react/prop-types */
import Dialog from "@mui/material/Dialog";

import { green, red } from "@mui/material/colors";
import Circle from "./Circle";
import { Stack, Typography } from "@mui/material";
const AlertSuccess = ({
  handleClose,
  open,
  message = "Check Your Email ,and Verify Your Account !!",
  error = false,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-succes">
      <Stack
        sx={{
          minWidth: "300px",
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          justifyContent: "center",
          alignItems: "center",
          "& i": {
            color: red[600],
            fontSize: "16rem",
          },
        }}>
        <Typography
          sx={{ color: error ? red[600] : green[300] }}
          variant="h2"
          id="alert-succes">
          {error ? "Error 404" : message}
        </Typography>
        {error ? <i className="bi bi-exclamation-triangle" /> : <Circle />}
      </Stack>
    </Dialog>
  );
};

export default AlertSuccess;
