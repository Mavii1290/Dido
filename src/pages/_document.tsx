// pages/_document.tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Link to the manifest file for PWA compatibility */}
          <link rel="manifest" href="/manifest.json" />

          {/* Set the theme color for the browser UI, if desired */}
          <meta name="theme-color" content="#000000" />
          
          {/* Any other global meta tags or links can go here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;