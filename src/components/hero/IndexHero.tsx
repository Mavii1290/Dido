import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "@/plugins";
import Image from "next/image";
import homepage_img from "../../../public/assets/imgs/dido/homepage_img.png";
import CTAButton from "../cta/CTAButton";
import Link from "next/link";

const IndexHero = () => {
  const titleLeft = useRef<HTMLHeadingElement>(null);
  const titleRight = useRef<HTMLHeadingElement>(null);
  const heroTextAnim = useRef<HTMLParagraphElement>(null);
  const heroArea = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        titleLeft.current &&
        titleRight.current &&
        heroTextAnim.current
      ) {
        const split_creatives = new SplitText(titleLeft.current, { type: "chars" });
        const split_solutions = new SplitText(titleRight.current, { type: "chars" });
        const split_text_animation = new SplitText(heroTextAnim.current, { type: "chars words" });

        const tHero = gsap.context(() => {
          const HomeDigital = gsap.timeline();

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
        }, heroArea);

        return () => tHero.revert();
      }
    }
  }, []);

  return (


    <section on className="hero__area-3" ref={heroArea}>
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
      <div className="container">
        <div className="row">



          <div className="col-xxl-12">
            <div className="hero__inner-3">
              <div className="sec-title-wrapper">
                <h3 className="sec-title title-left" ref={titleLeft}>
                  Dido
                </h3>
                <h3 className="sec-title title-right" ref={titleRight}>
                  Distributions
                </h3>
              </div>
              <div className="hero__text-3">
                <p className="hero__text-animation" ref={heroTextAnim}>
                  Olive Oil | Fine Foods  <br />
                </p>
                <p className="hero__text-animation" ref={heroTextAnim}>
                    Imported Goods | Wholesale Distributor
                </p>
                <br/>
                 <Link href="/contact" className=" btn-hover btn-item">
              <h2 className="cta__content_button">Work with us</h2>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export default IndexHero;
