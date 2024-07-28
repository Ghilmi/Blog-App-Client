import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "../../redux/apis/authCallApi";
import { selectIsVerify } from "./../../store/seloctors/selectUserFromAuth";
import Backdrop from "@mui/material/Backdrop";
const VerfifyctionEmail = () => {
  const dispatch = useDispatch();
  const { userId, token } = useParams();
  useEffect(() => {
    console.log({ userId, token });
    dispatch(verifyAccount(userId, token));
  }, [userId, token]);
  const naveTo = useNavigate();
  const isAccountVerified = useSelector(selectIsVerify);

  const message = useSelector((state) => state.auth.message);

  return isAccountVerified ? (
    <Stack
      sx={{
        justfyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        "& .bi-check-circle-fill": {
          color: green[500],
          fontSize: "100px",
        },
        "& .bi-Stack-arrow-in-right": {
          color: green[800],
          fontSize: "30px",
        },
      }}>
      <i className="bi bi-check-circle-fill"></i>
      <Typography variant="h1">Your email has been verified</Typography>
      <Typography color={green[800]} variant="h4">
        You can now LOGIN <i className="bi bi-Stack-arrow-in-right"></i>
      </Typography>
      <Button
        sx={{ mt: 4 }}
        onClick={() => naveTo("/login")}
        variant="outlined"
        color="success">
        Start To Write
      </Button>
    </Stack>
  ) : (
    <Stack
      sx={{
        justfyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        "& .bi-x-circle-fill": {
          color: red[500],
          fontSize: "100px",
        },
        "& .bi-Stack-arrow-in-right": {
          color: red[800],
          fontSize: "30px",
        },
      }}>
      {message?.inLoading ? (
        <>
          <Typography variant="h3" color="initial">
            Hi Pleas Wite
          </Typography>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ) : (
        <>
          <i className="bi bi-x-circle-fill"></i>
          <Typography variant="h1">Error</Typography>
          <Typography color={green[800]} variant="h4">
            Something went wrong (check your email firstly or try again){" "}
            <i className="bi bi-Stack-arrow-in-right"></i>
          </Typography>
          <Button
            sx={{ mt: 4 }}
            onClick={() => naveTo("/")}
            variant="outlined"
            color="warning">
            Go Back To Home
          </Button>
        </>
      )}
    </Stack>
  );
};

export default VerfifyctionEmail;
