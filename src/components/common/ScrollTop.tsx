import { ArrowUp } from "lucide-react";
import { useEffect } from "react";

const ScrollTop = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scrollTopButton = document.getElementById("scroll_top");

      if (scrollTopButton) {
        const handleScroll = () => {
          const scrollY =
            document.body.scrollTop || document.documentElement.scrollTop;

          scrollTopButton.style.display = scrollY > 50 ? "block" : "none";
        };

        const scrollToTop = () => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        };

        window.addEventListener("scroll", handleScroll);
        scrollTopButton.addEventListener("click", scrollToTop);

        // Initial check in case the user already scrolled
        handleScroll();

        return () => {
          window.removeEventListener("scroll", handleScroll);
          scrollTopButton.removeEventListener("click", scrollToTop);
        };
      }
    }
  }, []);

  return (
    <button id="scroll_top" className="scroll-top" style={{ display: "none" }}>
      <ArrowUp size={16} />
    </button>
  );
};

export default ScrollTop;
