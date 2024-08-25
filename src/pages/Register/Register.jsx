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
  IconButton,
  Alert,
  Zoom,
} from "@mui/material";
import svg_icon from "./../../SVG/avatar-thinking-5-svgrepo-com.svg";
import {
  handelEmail,
  handelName,
  handelPassword,
} from "../../helpers/handellForm";
import { useEffect, useState } from "react";
import { registerUser } from "../../redux/apis/authCallApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AlertSuccess from "../../components/Register/AlertSuccess";

export default function Register() {
  useEffect(() => {
    dispatch({ type: "auth/resetMessage" });
  }, []);
  //
  const [openAlert, setOpenAlert] = useState(true);
  const registerMessage = useSelector((state) => state.auth.message);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  //alert start
  const [open, setOpen] = useState(false);
  //alert end
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const dispatch = useDispatch();
  //naveTo "/loggin" in have account
  const naveTo = useNavigate();
  useEffect(() => {
    setOpenAlert(registerMessage?.error === true);
  }, [registerMessage]);
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

  useEffect(() => {
    setEmailValid(handelEmail(email));
    return () => {
      setEmailValid(true);
    };
  }, [email]);

  useEffect(() => {
    setPasswordValid(handelPassword(password));
    return () => {
      setPasswordValid(true);
    };
  }, [password]);

  useEffect(() => {
    setNameValid(handelName(name));
    return () => {
      setNameValid(true);
    };
  }, [name]);
  const handleRegister = async () => {
    const data = await registerUser(
      {
        email: email?.toLowerCase(),
        name: name?.toLowerCase(),
        password,
        status: status || "",
      },
      dispatch
    );
    if (
      emailValid &&
      passwordValid &&
      email &&
      password &&
      name &&
      nameValid &&
      !data?.Error_Message &&
      !data?.error
    ) {
      dispatch({
        type: "auth/setMessage",
        payload: {
          text: data.message || "valide expretion, your Register wase valid!",
          error: false,
          rendom: Math.random(),
        },
      });
      if (data) handleClickOpen();
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
          text: data?.Error_Message || "Invalid Data!!",
          error: true,
          rendom: Math.random(),
        },
      });
    }
  };
  //password input:start
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //:end

  return (
    <>
      <Box sx={{ minHeight: "120vh", mt: 6, mb: 4 }}>
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
          <Typography
            sx={{ my: 3, display: "flex", alignItems: "center" }}
            variant="h3">
            <img src={svg_icon} /> Register Your Account
          </Typography>
          <Box height={50}>
            <Zoom
              sx={{
                height: "100%",
              }}
              orientation="horizontal"
              in={openAlert && registerMessage?.error}>
              <Alert
                variant="outlined"
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpenAlert(false);
                    }}>
                    <i className="bi bi-x" fontSize="inherit" />
                  </IconButton>
                }
                sx={{ whiteSpace: "nowrap", textOverflow: "elipssis" }}>
                {registerMessage?.text}
              </Alert>
            </Zoom>
          </Box>
          <Stack
            sx={{
              flexDirection: "column",
              gap: "2rem",
              width: "300px",
              alignItems: "center",
              justifyContent: "center",
              mt: 3,
              height: "auto",
            }}>
            <FormControl required variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="name">
                {nameValid
                  ? "Your Name"
                  : "Invalid Name ,most be more than 3 characters"}
              </InputLabel>
              <Input
                required
                onBlur={() => setNameValid(true)}
                onChange={async (e) => {
                  setName(e.target.value);
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
              <InputLabel htmlFor="status">{"Your status"}</InputLabel>
              <Input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                type="text"
                name="status"
                id="status"
                fullWidth
                placeholder="Enter Your status"
                startAdornment={
                  <InputAdornment position="start">
                    <i className="bi bi-pencil-square" />
                  </InputAdornment>
                }
                defaultValue={"Hello Worlde!"}
              />
            </FormControl>
            <FormControl required variant="standard" sx={{ width: "100%" }}>
              <InputLabel htmlFor="email">
                {emailValid
                  ? "Your Email"
                  : "Invalid Email ,example: 9sJkz@example.com"}
              </InputLabel>
              <Input
                required
                onChange={async (e) => {
                  setEmail(e.target.value);
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
            <FormControl required sx={{ width: "100%" }} variant="standard">
              <InputLabel htmlFor="password">
                {passwordValid
                  ? "Your Password"
                  : "Invalid Password, minimum 8 characters"}
              </InputLabel>
              <Input
                onBlur={() => setPasswordValid(true)}
                onChange={async (e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                required
                fullWidth
                placeholder="Enter Your Password"
                id="password"
                error={!passwordValid}
                name="password"
                startAdornment={
                  <InputAdornment position="start">
                    <i className="bi bi-lock-fill" />
                  </InputAdornment>
                }
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button onClick={handleRegister} fullWidth variant="contained">
              Login
            </Button>
            <Typography noWrap textOverflow={"elipssis"} whiteSpace={"nowrap"}>
              Already have an account?{" "}
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  naveTo("/login");
                }}>
                Loging
              </Link>
              ,
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  naveTo("/login");
                }}>
                Forget Password
              </Link>
            </Typography>
          </Stack>
        </Container>
      </Box>
      <AlertSuccess handleClose={handleClose} open={open} />
    </>
  );
}
