import { useEffect, useRef } from "react";

const Preloader = () => {
  const preloaderSection = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeout = setTimeout(() => {
        if (preloaderSection.current) {
          preloaderSection.current.style.display = "none";
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, []);

  return (
    <div className="preloader" ref={preloaderSection}>
      <div className="loading">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
        <div className="bar bar4"></div>
        <div className="bar bar5"></div>
        <div className="bar bar6"></div>
        <div className="bar bar7"></div>
        <div className="bar bar8"></div>
      </div>
    </div>
  );
};

export default Preloader;
