import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Stack,
  Typography,
  Zoom,
} from "@mui/material";
import { handelEmail, handelPassword } from "../../helpers/handellForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logUser } from "../../redux/apis/authCallApi";
import { useNavigate } from "react-router-dom";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";

export default function Login() {
  useEffect(() => {
    dispatch({ type: "auth/resetMessage" });
  }, []);

  //
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

  let Data = {
    email: null,
    password: null,
  };
  const handleLogin = () => {
    Data = {
      email: email?.toLowerCase(),
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
  //password input:start
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //:end
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
        <Typography
          sx={{ my: 3, display: "flex", alignItems: "center" }}
          variant="h3">
          <svg
            className="svg"
            width="70px"
            height="70px"
            viewBox="-4.8 -4.8 57.60 57.60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0)">
            <g id="SVGRepo_bgCarrier" strokeWidth={0}>
              <path
                transform="translate(-4.8, -4.8), scale(1.7999999999999998)"
                d="M16,29.193908388415974C18.64482911073811,29.64780170992347,21.93877566138242,30.08215063552857,23.8205631613484,28.169033812830953C25.767054038293953,26.19013638579453,23.885158845477797,22.650925548387015,24.955141024439445,20.08967587342986C25.967236230397795,17.666992049104753,29.201796965009475,16.598223430581516,29.728891857625,14.0260833502692C30.31221973998609,11.179535134369324,29.902012623364726,7.795164034208914,27.907633662170667,5.6819766968133045C25.918230569737144,3.574061648717725,22.567477273979886,3.8209686367012092,19.69982151335021,3.399565085815274C17.207883928645504,3.0333735222399776,14.564142315767459,2.2911996210881105,12.296768486838886,3.3879516929746494C10.115616400131513,4.442997420183367,9.83570092447723,7.488596214728669,7.993281592783223,9.062139006663324C5.641488165730764,11.070719535318084,0.47925658480970396,10.647686760440124,0.19103578084329165,13.72701409474207C-0.10431789197747093,16.882548412484915,4.987278433374313,17.6470206126226,6.95738001304918,20.12962617699728C8.28335355689508,21.8005396629449,8.226614335925865,24.241276520879612,9.733145210753964,25.751416395093443C11.451224448610805,27.473611411138215,13.602407550179773,28.782444677489675,16,29.193908388415974"
                fill="#7ed0ec"
                strokeWidth={0}
              />
            </g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              <path
                d="M6 9.25564L24.0086 4L42 9.25564V20.0337C42 31.3622 34.7502 40.4194 24.0026 44.0005C13.2521 40.4195 6 31.36 6 20.0287V9.25564Z"
                stroke="#000000"
                strokeWidth="0.4800000000000001"
                strokeLinejoin="round"
              />
              <circle
                cx={24}
                cy={18}
                r={5}
                fill="#2F88FF"
                stroke="#000000"
                strokeWidth="0.4800000000000001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32 31C32 26.5817 28.4183 23 24 23C19.5817 23 16 26.5817 16 31"
                stroke="#000000"
                strokeWidth="0.4800000000000001"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          Login To Your Account{" "}
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
          <Zoom
            sx={{
              height: "100%",
            }}
            orientation="horizontal"
            in={open && userMessage?.error}>
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
              sx={{ whiteSpace: "nowrap", textOverflow: "elipssis" }}>
              {userMessage?.text}
            </Alert>
          </Zoom>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="email">
              {emailValid
                ? "Your Email"
                : "Invalid Email ,example: 9sJkz@example.com"}
            </InputLabel>
            <Input
              required
              value={email}
              onBlur={() => setEmailValid(true)}
              onChange={async (e) => {
                setEmail(e.target.value);
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
              required
              value={password}
              onBlur={() => setPasswordValid(true)}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
