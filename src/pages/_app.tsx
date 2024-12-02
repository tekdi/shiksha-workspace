import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
  useTheme,
} from "@mui/material/styles";
import "../styles/global.css";

import { AppProps } from "next/app";
import customTheme from "@/styles/CustomTheme";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {



  return (
    <CssVarsProvider theme={customTheme}>
      <Component {...pageProps} />;
    </CssVarsProvider>
  );
}
