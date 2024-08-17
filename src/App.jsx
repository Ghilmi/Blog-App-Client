import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router as rootRouter } from "./router/router.jsx";

import { selectMode } from "./store/seloctors/selectMode";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import getDesignTokens from "./style/theme.js";

function App() {
  const mode = useSelector(selectMode);
  const rootTheme = useMemo(() => {
    const rootTheme = createTheme(getDesignTokens(mode));
    return rootTheme;
  }, [mode]);

  return (
    <ThemeProvider theme={rootTheme}>
      <CssBaseline />
      <RouterProvider router={rootRouter} />
    </ThemeProvider>
  );
}

export default App;
