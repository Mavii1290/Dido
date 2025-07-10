import { useEffect, useState } from "react";

const PrivacyConsentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("privacyConsent");
    const dismissed = sessionStorage.getItem("privacyDismissed");

    if (!consent && !dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("privacyConsent", accepted ? "accepted" : "declined");
    localStorage.setItem("privacyConsentDate", new Date().toISOString());
    console.log("Consent:", accepted);
    setIsVisible(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem("privacyDismissed", "true");
    console.log("Dismissed popup for this session");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        padding: "16px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "12px",
        zIndex: 9999,
      }}
    >
      <button
        onClick={handleDismiss}
        style={{
          position: "absolute",
          top: "8px",
          right: "12px",
          background: "none",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        ×
      </button>
      <p style={{ fontSize: "14px" }}>
        We use cookies to enhance your experience.{" "}
        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </p>
      <div style={{ marginTop: "12px", textAlign: "right" }}>
        <button onClick={() => handleConsent(false)} style={{ marginRight: "8px" }}>
          Decline
        </button>
        <button onClick={() => handleConsent(true)}>Accept</button>
      </div>
    </div>
  );
};

export default PrivacyConsentPopup;
