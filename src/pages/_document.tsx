// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';
import { DocumentProps } from 'next/document';
import Script from 'next/script';

export default function Document(props: DocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="/sunbird-questionset-editor-web-component/styles.css"
        />
        <script src="/sunbird-questionset-editor-web-component/sunbird-questionset-editor.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
