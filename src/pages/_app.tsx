
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/assets/scss/master.scss";
import "../styles/extra.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;

