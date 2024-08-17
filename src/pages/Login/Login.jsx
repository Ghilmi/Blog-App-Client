import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { handelEmail, handelPassword } from "../../helpers/handellForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logUser } from "../../redux/apis/authCallApi";
import { useNavigate } from "react-router-dom";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";

export default function Login() {
  const userMessage = useSelector((state) => state.auth.message);
  const [open, setOpen] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const dispatch = useDispatch();
  const naveTo = useNavigate();
  const user = useSelector(selectUserFromAuth);

  useEffect(() => {
    setOpen(userMessage?.error === true);
  }, [userMessage]);

  useEffect(() => {
    if (user) naveTo("/");
  }, [user]);

  const handleBlurFromEmail = () => {
    setEmailValid(handelEmail(email));
  };
  const handleBlurFromPassword = () => {
    setPasswordValid(handelPassword(password));
  };
  let Data = {
    email: null,
    password: null,
  };
  const handleLogin = () => {
    Data = {
      email,
      password,
    };
    if (emailValid && passwordValid && Data.email && Data.password) {
      dispatch(logUser(Data));

      dispatch({
        type: "auth/setMessage",
        payload: {
          text: "valide data, your log-in wase successfully!",
          error: false,
          rendom: Math.random(),
        },
      });
    } else {
      dispatch({
        type: "auth/setMessage",
        payload: {
          text: "invalide email or password",
          error: true,
          rendom: Math.random(),
        },
      });
    }
  };
  return (
    <Box minHeight={"89vh"}>
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
          Login To Your Account
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
          <Collapse in={open && userMessage?.error}>
            <Alert
              variant="outlined"
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}>
                  <i className="bi bi-x" fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}>
              {userMessage?.text}
            </Alert>
          </Collapse>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="email">
              {emailValid
                ? "Your Email"
                : "Invalid Email ,example: 9sJkz@example.com"}
            </InputLabel>
            <Input
              value={email}
              onChange={async (e) => {
                await setEmail(e.target.value);
                handleBlurFromEmail(e);
              }}
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
              value={password}
              onChange={async (e) => {
                await setPassword(e.target.value);
                handleBlurFromPassword(e);
              }}
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
          <Button onClick={handleLogin} fullWidth variant="contained">
            Login
          </Button>
          <Typography>
            Did you forget your password ?{" "}
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => naveTo("/forgot-password")}>
              Reset
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
