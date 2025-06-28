import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Image, { StaticImageData } from "next/image";

import Brand1 from "../../../public/assets/imgs/brand/1.png";
import Brand2 from "../../../public/assets/imgs/brand/2.png";
import Brand3 from "../../../public/assets/imgs/brand/3.png";
import Brand4 from "../../../public/assets/imgs/brand/4.png";
import Brand5 from "../../../public/assets/imgs/brand/5.png";
import Brand6 from "../../../public/assets/imgs/brand/6.png";

gsap.registerPlugin(ScrollTrigger);

const Brands = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const deviceWidth = window.innerWidth;

      const tHero = gsap.context(() => {
        gsap.set(".fade_bottom", { y: 30, opacity: 0 });

        if (deviceWidth < 1023) {
          const fadeArray = gsap.utils.toArray<HTMLElement>(".fade_bottom");
          fadeArray.forEach((item) => {
            const fadeTl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top center+=200",
              },
            });
            fadeTl.to(item, {
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
    }
  }, []);

  const brands: StaticImageData[] = [
    Brand1, Brand2, Brand3, Brand4, Brand5, Brand6,
    Brand3, Brand4, Brand5, Brand6, Brand1, Brand2,
  ];

  return (
    <section className="brand__area">
      <div className="container g-0 line pt-140 pb-130">
        <span className="line-3"></span>
        <div className="row">
          <div className="col-xxl-12">
            <div className="sec-title-wrapper">
              <h2 className="sec-sub-title title-anim">International Brands</h2>
              <h3 className="sec-title title-anim">
                We’re proud to partner with some of the <br/>
                world’s leading brands
              </h3>
            </div>
          </div>
          <div className="col-xxl-12">
            <div className="brand__list">
              {brands.map((brand, index) => (
                <div className="brand__item fade_bottom" key={index}>
                  <Image
                    priority
                    width={100}
                    height={70}
                    src={brand}
                    alt={`Brand Logo ${index + 1}`}
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

export default Brands;
