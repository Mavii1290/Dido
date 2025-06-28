import { useEffect, RefObject } from "react";
import { gsap } from "gsap";

interface CursorAnimationProps {
  cursor1: RefObject<HTMLDivElement | null>;
  cursor2: RefObject<HTMLDivElement | null>;
}

const CursorAnimation = ({ cursor1, cursor2 }: CursorAnimationProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tHero = gsap.context(() => {
        const mousemoveHandler = (e: MouseEvent) => {
          try {
            const tl = gsap.timeline({
              defaults: {
                x: e.clientX,
                y: e.clientY,
              },
            });

            // Main Cursor Moving
            tl.to(".cursor1", {
              ease: "power2.out",
            }).to(
              ".cursor2",
              {
                ease: "power2.out",
              },
              "-=0.4"
            );
          } catch (error) {
            console.error(error);
          }
        };

        document.addEventListener("mousemove", mousemoveHandler);

        // Clean up
        return () => {
          document.removeEventListener("mousemove", mousemoveHandler);
        };
      });

      return () => tHero.revert();
    }
  }, []);

  return (
    <>
      <div className="cursor1" ref={cursor1}></div>
      <div className="cursor2" ref={cursor2}></div>
    </>
  );
};

export default CursorAnimation;
