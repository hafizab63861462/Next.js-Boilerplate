"use client";

/* Core */
import { PropsWithChildren } from "react";
import { createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

/* Instruments */
import { getDesignTokens } from "@/theme/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";

const Providers = ({ children }: PropsWithChildren) => {
  const theme = createTheme(getDesignTokens("light", null, null));

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default Providers;
