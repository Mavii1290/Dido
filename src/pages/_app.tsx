
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/assets/scss/master.scss";
import "../styles/extra.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;

// pages/_app.tsx

// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../public/assets/scss/master.scss";
// import "../styles/extra.css";
// import "../styles/globals.css";

// import type { AppProps } from "next/app";
// import PrivacyConsentPopup from "@/components/privacy/PrivacyConsentPopup"; // adjust path as needed

// function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Component {...pageProps} />
//       <PrivacyConsentPopup
//         policyLink="/privacy-policy"
//         expirationDays={180}
//         onAccept={() => console.log("✅ Privacy accepted")}
//         onDecline={() => console.log("❌ Privacy declined")}
//       />
//     </>
//   );
// }

// export default App;
