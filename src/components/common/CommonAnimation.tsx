import { useEffect, ReactNode } from "react";
import $ from "jquery";
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
      $(".btn-hover").on("mouseenter", function (e) {
        const offset = $(this).offset();
        if (!offset) return;
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        $(this).find("span").css({ top: y, left: x });
      });

      $(".btn-hover").on("mouseout", function (e) {
        const offset = $(this).offset();
        if (!offset) return;
        const x = e.pageX - offset.left;
        const y = e.pageY - offset.top;

        $(this).find("span").css({ top: y, left: x });
      });

      // Common Animation
      const tHero = gsap.context(() => {
        try {
          const all_btns = gsap.utils.toArray<HTMLElement>(".btn_wrapper");
          const fallback_btns = gsap.utils.toArray<HTMLElement>("#btn_wrapper");
          const all_btn = all_btns.length > 0 ? all_btns : fallback_btns;

          const all_btn_circle = gsap.utils.toArray<HTMLElement>(".btn-item");

          all_btn.forEach((btn, i) => {
            $(btn).on("mousemove", (e) => callParallax(e));
            $(btn).on("mouseleave", () => {
              gsap.to(all_btn_circle[i], 0.5, {
                x: 0,
                y: 0,
                ease: Power2.easeOut,
              });
            });

            function callParallax(e: JQuery.MouseMoveEvent) {
              parallaxIt(e, all_btn_circle[i], 80);
            }

            function parallaxIt(
              e: JQuery.MouseMoveEvent,
              target: HTMLElement,
              movement: number
            ) {
              const $this = $(btn);
              const offset = $this.offset();
              if (!offset) return;
              const relX = e.pageX - offset.left;
              const relY = e.pageY - offset.top;

              gsap.to(target, {
                duration: 0.5,
                  x: ((relX - $this?.width()! / 2) / $this?.width()!) * movement,
                  y: ((relY - $this?.height()! / 2) / $this?.height()!) * movement,
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
