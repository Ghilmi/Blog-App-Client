import { Container, Stack, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import HeaderLeft from "../../components/header/HeaderLeft";
import HeaderRight from "../../components/header/HeaderRight";
import { Slide } from "@mui/material";

function Header() {
  const [togle, setTogle] = useState(false);
  // mange display items
  const handelTogle = () => {
    setTogle(!togle);
  };
  //
  const dispatch = useDispatch();
  //theme of mui
  const theme = useTheme();

  const handelMode = () => {
    dispatch({
      type: "mode/setMode",
      payload: theme.palette.mode === "dark" ? "light" : "dark",
    });
  };

  return (
    <Stack
      className="header"
      sx={{
        position: "relative",
        bgcolor: blue[900],
      }}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          py: 1,
        }}>
        <HeaderLeft
          togle={togle}
          handelTogle={handelTogle}
          setTogle={setTogle}
        />
        <HeaderRight handelMode={handelMode} theme={theme} />
      </Container>
    </Stack>
  );
}

export default function MainHeader() {
  const [show, setShow] = useState(false);
  document.body.onscroll = (e) => {
    setShow(e.currentTarget.scrollY > 500);
  };
  return (
    <>
      <Slide direction="down" in={show}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}>
          <Header />
        </div>
      </Slide>
      <Header />
    </>
  );
}
