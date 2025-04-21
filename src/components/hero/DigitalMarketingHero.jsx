import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import Image from "next/image.js";
import homepage_img from "../../../public/assets/imgs/dido/homepage_img.png";

const DigitalMarketingHero = () => {
  const titleLeft = useRef();
  const titleRight = useRef();
  const heroTextAnim = useRef();
  const heroArea = useRef();


  useEffect(() => {
    if (typeof window !== "undefined") {
      let split_creatives = new SplitText(titleLeft.current, { type: "chars" });
      let split_solutions = new SplitText(titleRight.current, {
        type: "chars",
      });
      let split_text_animation = new SplitText(heroTextAnim.current, {
        type: "chars words",
      });
      let tHero = gsap.context(() => {
        let HomeDigital = gsap.timeline();

        HomeDigital.from(split_creatives.chars, {
          duration: 2,
          x: 100,
          autoAlpha: 0,
          stagger: 0.2,
        });
        HomeDigital.from(
          split_solutions.chars,
          { duration: 1, x: 100, autoAlpha: 0, stagger: 0.1 },
          "-=1"
        );
        HomeDigital.from(
          split_text_animation.words,
          { duration: 1, x: 50, autoAlpha: 0, stagger: 0.05 },
          "-=1"
        );
      });
      return () => tHero.revert();
    }
  }, []);


  return (
    <>
      <section className="hero__area-3" ref={heroArea}>
        <div className="container">
          <div className="row">
            <div className="col-xxl-12">
              <div className="hero__inner-3">
                <div className="sec-title-wrapper">
                  <h2 className="sec-sub-title"></h2>
                  <h3 className="sec-title title-left" ref={titleLeft}>
                    Dido
                  </h3>
                  <h3 className="sec-title title-right" ref={titleRight}>
                    Distributions 
                  </h3>
                </div>
                <div className="hero__text-3">
                  <p className="hero__text-animation" ref={heroTextAnim}>
                  Olive Oil | Fine Foods<br></br> Imported Goods | Wholesale Distributor 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="hero3-img-ani">
          <Image
            priority
            width={1195}
            style={{ height: "auto" }}
            src={homepage_img}
            alt="Hero Image"
            className="hero3-img"
          />
        </div>
      </section>
    </>
  );
};

export default DigitalMarketingHero;
