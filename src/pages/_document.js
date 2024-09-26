// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="/sunbird-questionset-editor-web-component/styles.css"
        />
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          defer
        ></script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery.fancytree/2.37.0/jquery.fancytree-all-deps.min.js"
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
