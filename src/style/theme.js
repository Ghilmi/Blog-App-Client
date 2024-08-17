const getDesignTokens = (mode) => ({
  palette: {
    // @ts-ignore
    mode,
    ...(mode === "light"
      ? {
          text_color: {
            main: "#fff",
            secondary: "#eee",
          },
        }
      : {
          text_color: {
            main: "#000",
            secondary: "#111",
          },
        }),
  },
});

export default getDesignTokens;
