import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "@/plugins";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; // If you want navigation arrows
import 'swiper/css/pagination'; // If you want pagination dots

// Import required modules
// *** FIX STARTS HERE ***
import { Autoplay, Navigation, Pagination } from 'swiper'; // Import modules directly from 'swiper'
// *** FIX ENDS HERE ***

// Your brand images
import Kinder from "../../../public/assets/imgs/dido/brands/Kinder.png";
import sanBenedetto from "../../../public/assets/imgs/dido/brands/sanBenedetto.png";
import Bauli from "../../../public/assets/imgs/dido/brands/Bauli.png";
import Partanna from "../../../public/assets/imgs/dido/brands/Partanna.png";
import Sicilian from "../../../public/assets/imgs/dido/brands/a'siciliana.png";
import Vallolmo from "../../../public/assets/imgs/dido/brands/Vallolmo.png";

// Register the plugin (keep for existing GSAP animations if still needed elsewhere)
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

  const brandImages = [Kinder, sanBenedetto, Bauli, Partanna, Vallolmo, Sicilian];

  return (
    <section className="brand__area">
      <div className="container pt-140 pb-140">
        <div className="row">
          <div className="col-xxl-12">
            <h2 className="brand__title-3 title-anim fade_bottom">
              We worked with global brands
            </h2>
            <div className="brand__carousel_container fade_bottom">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={30}
                slidesPerView={2}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                breakpoints={{
                  640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                  1200: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                  },
                }}
              >
                {brandImages.map((src, i) => (
                  <SwiperSlide key={i}>
                    <div className="brand__item-2">
                      <Image
                        priority
                        width={120}
                        height={70}
                        src={src}
                        alt="Brand Logo"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brand;