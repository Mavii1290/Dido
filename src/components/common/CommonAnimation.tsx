import { useEffect, ReactNode } from "react";
import { Power2, gsap } from "gsap";
import {
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
} from "@/plugins";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

interface CommonAnimationProps {
  children: ReactNode;
}

const CommonAnimation = ({ children }: CommonAnimationProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Hover animations
      document.querySelectorAll<HTMLElement>(".btn-hover").forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.pageX - rect.left - window.scrollX;
          const y = e.pageY - rect.top - window.scrollY;
          const span = el.querySelector("span") as HTMLElement;
          if (span) {
            span.style.top = `${y}px`;
            span.style.left = `${x}px`;
          }
        });

        el.addEventListener("mouseout", (e) => {
          const rect = el.getBoundingClientRect();
          const x = e.pageX - rect.left - window.scrollX;
          const y = e.pageY - rect.top - window.scrollY;
          const span = el.querySelector("span") as HTMLElement;
          if (span) {
            span.style.top = `${y}px`;
            span.style.left = `${x}px`;
          }
        });
      });

      // Common Animation
      const tHero = gsap.context(() => {
        try {
          const all_btns = gsap.utils.toArray<HTMLElement>(".btn_wrapper");
          const fallback_btns = gsap.utils.toArray<HTMLElement>("#btn_wrapper");
          const all_btn = all_btns.length > 0 ? all_btns : fallback_btns;
          const all_btn_circle = gsap.utils.toArray<HTMLElement>(".btn-item");

          all_btn.forEach((btn, i) => {
            btn.addEventListener("mousemove", (e) => callParallax(e));
            btn.addEventListener("mouseleave", () => {
              gsap.to(all_btn_circle[i], {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: Power2.easeOut,
              });
            });

            function callParallax(e: MouseEvent) {
              parallaxIt(e, all_btn_circle[i], 80);
            }

            function parallaxIt(
              e: MouseEvent,
              target: HTMLElement,
              movement: number
            ) {
              const rect = btn.getBoundingClientRect();
              const relX = e.pageX - rect.left - window.scrollX;
              const relY = e.pageY - rect.top - window.scrollY;
              const width = btn.offsetWidth;
              const height = btn.offsetHeight;

              gsap.to(target, {
                duration: 0.5,
                x: ((relX - width / 2) / width) * movement,
                y: ((relY - height / 2) / height) * movement,
                ease: Power2.easeOut,
              });
            }
          });

          const all_buttons = [
            ...gsap.utils.toArray<HTMLElement>("#btn_wrapper"),
            ...gsap.utils.toArray<HTMLElement>(".btn_wrapper"),
          ];

          all_buttons.forEach((btn) => {
            if (!btn.classList.contains("hero__button")) {
              gsap.from(btn, {
                scrollTrigger: {
                  trigger: btn,
                  start: "top center+=150",
                  markers: false,
                },
                opacity: 0,
                y: -70,
                ease: "bounce",
                duration: 1.5,
              });
            }
          });

          const splitTitleLines = gsap.utils.toArray<HTMLElement>(".title-anim");
          splitTitleLines.forEach((line) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: line,
                start: "top 90%",
                end: "bottom 60%",
                scrub: false,
                markers: false,
                toggleActions: "play none none none",
              },
            });

            const itemSplitted = new SplitText(line, {
              type: "words, lines",
            });
            gsap.set(line, { perspective: 400 });
            itemSplitted.split({ type: "lines" });

            tl.from(itemSplitted.lines, {
              duration: 1,
              delay: 0.3,
              opacity: 0,
              rotationX: -80,
              force3D: true,
              transformOrigin: "top center -50",
              stagger: 0.1,
            });
          });

          const splitTextLines = gsap.utils.toArray<HTMLElement>(".text-anim p");
          splitTextLines.forEach((line) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: line,
                start: "top 90%",
                end: "bottom 60%",
                scrub: false,
                markers: false,
                toggleActions: "play none none none",
              },
            });

            const itemSplitted = new SplitText(line, {
              type: "lines",
            });
            gsap.set(line, { perspective: 400 });
            itemSplitted.split({ type: "lines" });

            tl.from(itemSplitted.lines, {
              duration: 1,
              delay: 0.5,
              opacity: 0,
              rotationX: -80,
              force3D: true,
              transformOrigin: "top center -50",
              stagger: 0.1,
            });
          });
        } catch (e) {
          console.error(e);
        }
      });

      return () => tHero.revert();
    }
  }, []);

  return <>{children}</>;
};

export default CommonAnimation;
