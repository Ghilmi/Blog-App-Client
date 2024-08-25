import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword, testLink } from "../../redux/apis/passwordCallApi";
import AlertSuccess from "../../components/Register/AlertSuccess";
import forget_password from "./../../SVG/forget_password.svg";
const ResetPassword = () => {
  const { token, userId } = useParams(false);
  const [errorResposnce, setErrorResposnce] = useState();
  const naveTo = useNavigate();
  //alert start
  const [open, setOpen] = useState(false);
  //alert end
  const sendTestLink = async () => {
    const { error = false, res = null } = await testLink(userId, token);
    if (error) {
      setErrorResposnce(true);
      naveTo("/");
    } else {
      setErrorResposnce(false);
      console.log(res);
    }
  };
  useEffect(() => {
    sendTestLink();
  }, []);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handelSaveNewPassword = async () => {
    if (password.length < 8) {
      setPasswordError(true);

      return -1;
    } else {
      setPasswordError(false);
      handleClickOpen();
    }
    if (errorResposnce) return -1;
    const { res, error } = await resetPassword(userId, token, password);
    if (error) {
      setErrorResposnce(true);
      console.log(error);
    } else {
      setErrorResposnce(false);
      console.log(res);
    }
    handleClickOpen();
  };
  //alert start
  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    naveTo("/");
  };

  //end alsert
  return (
    <Box minHeight={"89vh"}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Typography
          sx={{ mt: 7, display: "flex", alignItems: "center" }}
          variant="h1"
          color="inhiret">
          <img src={forget_password} /> Reset Password
        </Typography>
        <TextField
          id="Email"
          label={
            passwordError
              ? "please tap a solid password, 8 caracter or more..."
              : "Tap Your New Password Her..."
          }
          variant="outlined"
          color="success"
          margin="none"
          sizes="small"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "300px", mt: 7 }}
          error={passwordError}
        />

        <Button
          onClick={handelSaveNewPassword}
          sx={{ width: "200px", mt: 3, py: 1 }}
          variant="contained"
          color="success">
          Save
        </Button>
      </Container>
      <AlertSuccess
        handleClose={handleClose}
        open={open}
        message="Enjoy browsing now...your password are changed !!"
        error={errorResposnce}
      />
    </Box>
  );
};

export default ResetPassword;
