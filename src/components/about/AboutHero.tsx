import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "@/plugins";
import Link from "next/link.js";
import RootLayout from "@/components/common/layout/RootLayout";
import About31 from "../../../public/assets/imgs/about/3/1.jpg";
import Distributor1 from "../../../public/assets/imgs/dido/Distributor1.png";
import Distributor2 from "../../../public/assets/imgs/dido/Distributor2.png";
import Distributor3 from "../../../public/assets/imgs/dido/Distributor3.png";

import Image from "next/image.js";

gsap.registerPlugin(ScrollSmoother);

const AboutHero = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      let device_width = window.innerWidth;
      let tHero = gsap.context(() => {
        ScrollSmoother.create({
          smooth: 1.35,
          effects: device_width < 1025 ? false : true,
          smoothTouch: false,
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
      });
      return () => tHero.revert();
    }
  }, []);
  return (
    <>
      <section className="about__area-3">
        <div className="container pt-140 pb-110">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="about__img-3">
                <Image
                  priority
                  style={{ width: "auto", height: "auto" }}
                  src={Distributor3}
                  alt="About Thumbnail"
                  data-speed="auto"
                  className="smootherReset768"
                />
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6">
              <div className="sec-title-wrapper">
                <h2 className="sec-sub-title title-anim">Who We Are</h2>
                <h3 className="sec-title title-anim">
                WE ARE A LEADING DISTRIBUTOR OF PREMIUM IMPORTED GOODS.
                </h3>
              </div>
              <div className="sec-text-wrapper">
                <div className="sec-text text-anim">
                  <p>
                  Dido Distributions, your premier wholesale partner, delivers premium olive oil, fine foods, and imported goods to New York’s top stores. With swift, secure shipping and a curated selection, we elevate your inventory—explore excellence with every order.                  </p>
                  <div className="btn_wrapper">
                    <Link
                      className="wc-btn-light btn-hover btn-item"
                      href="/about"
                    >
                      <span></span> Explore Us{" "}
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;
