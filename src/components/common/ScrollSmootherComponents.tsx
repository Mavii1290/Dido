import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "@/plugins";

// Register GSAP plugin
gsap.registerPlugin(ScrollSmoother);

const ScrollSmootherComponents = (): JSX.Element => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const deviceWidth = window.innerWidth;

      const tHero = gsap.context(() => {
        ScrollSmoother.create({
          smooth: 1,
          effects: deviceWidth >= 1025,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
      });

      return () => tHero.revert();
    }
  }, []);

  return <div></div>;
};

export default ScrollSmootherComponents;
