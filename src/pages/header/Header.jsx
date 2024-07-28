import { Container, Stack, useTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { useDispatch } from "react-redux";
import HeaderLeft from "../../components/header/HeaderLeft";
import HeaderRight from "../../components/header/HeaderRight";

export default function Header() {
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
