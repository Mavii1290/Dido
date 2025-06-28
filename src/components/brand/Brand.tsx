import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Image from "next/image";

import Brand5 from "../../../public/assets/imgs/brand/5.png";
import Brand6 from "../../../public/assets/imgs/brand/6.png";
import Kinder from "../../../public/assets/imgs/dido/brands/Kinder.png";
import sanBenedetto from "../../../public/assets/imgs/dido/brands/sanBenedetto.png";
import Bauli from "../../../public/assets/imgs/dido/brands/Bauli.png";
import Partanna from "../../../public/assets/imgs/dido/brands/Partanna.png";
import Sicilian from "../../../public/assets/imgs/dido/brands/a'siciliana.png";
import Rustico from "../../../public/assets/imgs/dido/brands/rustico.png"
import Vallolmo from "../../../public/assets/imgs/dido/brands/Vallolmo.png"



// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const Brand = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const deviceWidth = window.innerWidth;

      setTimeout(() => {
        const tHero = gsap.context(() => {
          gsap.set(".fade_bottom", { y: 30, opacity: 0 });

          if (deviceWidth < 1023) {
            const fadeArray = gsap.utils.toArray<HTMLElement>(".fade_bottom");
            fadeArray.forEach((item) => {
              gsap.timeline({
                scrollTrigger: {
                  trigger: item,
                  start: "top center+=200",
                },
              }).to(item, {
                y: 0,
                opacity: 1,
                ease: "power2.out",
                duration: 1.5,
              });
            });
          } else {
            gsap.to(".fade_bottom", {
              scrollTrigger: {
                trigger: ".fade_bottom",
                start: "top center+=300",
                markers: false,
              },
              y: 0,
              opacity: 1,
              ease: "power2.out",
              duration: 1,
              stagger: {
                each: 0.2,
              },
            });
          }
        });

        return () => tHero.revert();
      }, 100);
    }
  }, []);

  return (
    <section className="brand__area">
      <div className="container pt-140 pb-140">
        <div className="row">
          <div className="col-xxl-12">
            <h2 className="brand__title-3 title-anim">
              We worked with global brands
            </h2>
            <div className="brand__list-3">
              {[Kinder, sanBenedetto, Bauli, Partanna, Rustico, Vallolmo, Sicilian].map((src, i) => (
                <div className="brand__item-2 fade_bottom" key={i}>
                  <Image
                    priority
                    width={120}
                    height={70}
                    src={src}
                    alt="Brand Logo"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand;
