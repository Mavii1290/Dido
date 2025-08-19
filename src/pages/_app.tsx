// pages/_app.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/assets/scss/master.scss";
import "../styles/extra.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import { useEffect } from "react"; // Import useEffect

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Check if the browser supports Service Workers
    if ("serviceWorker" in navigator) {
      // Register the service worker file located at the root of your public directory
      navigator.serviceWorker
        .register("../../public/sw.js")
        .then((registration) => {
          console.log("Service Worker registration successful:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []); // The empty array ensures this effect runs only once on mount

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
