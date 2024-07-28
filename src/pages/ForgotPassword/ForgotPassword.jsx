import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import AlertSuccess from "../../components/Register/AlertSuccess";
import { handelSendResetPassword } from "../../redux/apis/passwordCallApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [errorEmail, setErrorEmail] = useState(false);
  const [resError, setResError] = useState(false);
  //alert start
  const [open, setOpen] = useState(false);
  //alert end

  //...........
  const handelSubmitEmail = async () => {
    const reg = new RegExp(/^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/);
    if (errorEmail) return setErrorEmail(!reg.test(email));
    //
    const { error, res } = await handelSendResetPassword(email);
    console.log(res);
    setResError(Boolean(error));
    //
    handleClickOpen();
  };
  //alert start
  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 5000);
  };

  const handleClose = () => {
    setOpen(false);
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
        <Typography sx={{ mt: 7 }} variant="h1" color="inhiret">
          Forgot Password
        </Typography>
        <TextField
          id="Email"
          label={
            errorEmail ? "please entre valid email..." : "Tap Your Email Her..."
          }
          variant="outlined"
          color="primary"
          margin="none"
          sizes="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "300px", mt: 7 }}
          error={errorEmail}
        />
        <Button
          sx={{ width: "200px", mt: 3, py: 1 }}
          variant="contained"
          color="primary"
          onClick={handelSubmitEmail}>
          Set New Password
        </Button>
      </Container>
      <AlertSuccess
        handleClose={handleClose}
        open={open}
        message="Plese chek your Email and flow the nest steps!!"
        error={resError}
      />
    </Box>
  );
};

export default ForgotPassword;
