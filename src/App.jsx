import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { RouterProvider } from "react-router-dom";
import { router as rootRouter } from "./router/router.jsx";

import { selectMode } from "./store/seloctors/selectMode";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import getDesignTokens from "./style/theme.jsx";

function App() {
  const message = useSelector((state) => state.auth.message);
  useEffect(() => {
    handleClick();
  }, [message]);

  const mode = useSelector(selectMode);
  const rootTheme = useMemo(() => {
    const rootTheme = createTheme(getDesignTokens(mode));
    return rootTheme;
  }, [mode]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <ThemeProvider theme={rootTheme}>
      <CssBaseline />
      <RouterProvider router={rootRouter} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.error ? "error" : "success"}
          variant="filled"
          sx={{ width: "100%" }}>
          {message.text && typeof message.text === "string" && message.text}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
