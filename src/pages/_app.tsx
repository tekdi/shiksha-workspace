import {
  Experimental_CssVarsProvider as CssVarsProvider,
  useColorScheme,
  useTheme,
} from "@mui/material/styles";
import "../styles/global.css";
import "../../src/libs/sunbird-pdf-player/styles.css";

import { AppProps } from "next/app";
import customTheme from "@/styles/CustomTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={customTheme}>
      <Component {...pageProps} />;
    </CssVarsProvider>
  );
}
