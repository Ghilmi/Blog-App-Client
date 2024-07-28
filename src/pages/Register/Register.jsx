import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import {
  handelEmail,
  handelName,
  handelPassword,
} from "../../helpers/handellForm";
import { useState } from "react";
import { registerUser } from "../../redux/apis/authCallApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/Register/AlertSuccess";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [boi, setboi] = useState(" ");
  //alert start
  const [open, setOpen] = useState(false);
  //alert end
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const dispatch = useDispatch();
  //naveTo "/loggin" in have account
  const naveTo = useNavigate();

  //register
  //alert start
  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(handleClose, 2000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //end alsert
  const handleBlurFromEmail = () => {
    setEmailValid(handelEmail(email));
  };
  const handleBlurFromPassword = () => {
    setPasswordValid(handelPassword(password));
  };

  const handleBlurFromName = () => {
    setNameValid(handelName(name));
  };
  const handleRegister = async () => {
    if (emailValid && passwordValid && email && password && name && nameValid) {
      const data = await registerUser({
        email,
        name,
        password,
        boi: boi || " ",
      });

      dispatch({
        type: "auth/setMessage",
        payload: {
          text: data.message || "valide expretion, your Register wase valid!",
          error: false,
          rendom: Math.random(),
        },
      });
      if (data.message) handleClickOpen();
      else {
        dispatch({
          type: "auth/setMessage",
          payload: {
            text:
              data.Error_Message ||
              "invalide data, your Register wase not successfully!",
            error: true,
            rendom: Math.random(),
          },
        });
      }
    } else {
      dispatch({
        type: "auth/setMessage",
        payload: {
          text: "Invalid Data!!",
          error: true,
          rendom: Math.random(),
        },
      });
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "89vh" }}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            height: "87vh",
            gap: "2rem",
            width: "100%",
          }}>
          <Typography sx={{ my: 3 }} variant="h3">
            Register Your Account
          </Typography>
          <Stack
            sx={{
              flexDirection: "column",
              gap: "2rem",
              width: "300px",
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
            }}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="name">
                {nameValid
                  ? "Your Name"
                  : "Invalid Name ,most be more than 3 characters"}
              </InputLabel>
              <Input
                required
                onChange={async (e) => {
                  await setName(e.target.value);
                  handleBlurFromName(e);
                }}
                value={name}
                error={!nameValid}
                type="name"
                name="name"
                id="name"
                fullWidth
                placeholder="Enter Your name"
                startAdornment={
                  <InputAdornment position="start">
                    <i className="bi bi-pencil-square" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="boi">{"Your boi"}</InputLabel>
              <Input
                value={boi}
                onChange={(e) => setboi(e.target.value)}
                type="text"
                name="boi"
                id="boi"
                fullWidth
                placeholder="Enter Your boi"
                startAdornment={
                  <InputAdornment position="start">
                    <i className="bi bi-pencil-square" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="email">
                {emailValid
                  ? "Your Email"
                  : "Invalid Email ,example: 9sJkz@example.com"}
              </InputLabel>
              <Input
                required
                onChange={async (e) => {
                  await setEmail(e.target.value);
                  handleBlurFromEmail(e);
                }}
                value={email}
                error={!emailValid}
                type="email"
                name="email"
                id="email"
                fullWidth
                placeholder="Enter Your Email"
                startAdornment={
                  <InputAdornment position="start">
                    <i className="bi bi-person-fill" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="password">
                {passwordValid
                  ? "Your Password"
                  : "Invalid Password, minimum 8 characters"}
              </InputLabel>
              <Input
                onChange={async (e) => {
                  await setPassword(e.target.value);
                  handleBlurFromPassword(e);
                }}
                value={password}
                required
                fullWidth
                type="password"
                placeholder="Enter Your Password"
                id="password"
                error={!passwordValid}
                name="password"
                startAdornment={
                  <InputAdornment position="start">
                    <i className="bi bi-lock-fill" />
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button onClick={handleRegister} fullWidth variant="contained">
              Login
            </Button>
            <Typography>
              Already have an account?{" "}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  naveTo("/login");
                }}>
                Login
              </Link>
            </Typography>
          </Stack>
        </Container>
      </Box>
      <AlertSuccess handleClose={handleClose} open={open} />
    </>
  );
}
