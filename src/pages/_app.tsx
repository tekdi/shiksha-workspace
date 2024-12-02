import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
  useTheme,
} from "@mui/material/styles";
import "../styles/global.css";

import { AppProps } from "next/app";
import customTheme from "@/styles/CustomTheme";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {



  return (
    <CssVarsProvider theme={customTheme}>
      <ToastContainer position="bottom-left" autoClose={3000} stacked={false} />
      <Component {...pageProps} />;
    </CssVarsProvider>
  );
}
