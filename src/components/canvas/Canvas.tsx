import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo_White from "../../../public/assets/imgs/dido/Logo_White.png";
import Logo from "../../../public/assets/imgs/dido/Logo.png";
import Olive_White from "../../../public/assets/imgs/dido/Olive_White.png";

interface CanvasProps {
  bladeMode?: HTMLElement | null;
  ofCanvasArea: React.RefObject<HTMLDivElement>;
}

const Canvas: React.FC<CanvasProps> = ({ bladeMode = null, ofCanvasArea }) => {
  const [accordion, setAccordion] = useState<number>(0);
  const [subAccordion, setSubAccordion] = useState<number>(0);
  const headerTitle = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const rootParent = headerTitle.current?.children;
        if (!rootParent) return;

        for (let i = 0; i < rootParent.length; i++) {
          const firstParent = rootParent[i].children;
          for (let j = 0; j < firstParent.length; j++) {
            const className = firstParent[j].className || "";
            if (className.includes("header_title")) {
              const el = firstParent[j].children[0] as HTMLElement;
              const arr = el?.textContent?.split("") ?? [];
              const spanData = arr
                .map((char) =>
                  char === " "
                    ? `<span style='width:2vw;'>${char}</span>`
                    : `<span>${char}</span>`
                )
                .join("");

              el.innerHTML = `<div class="menu-text">${spanData}</div>`;
            }
          }
        }
      }, 10);
    }
  }, []);

  const openData = (data: number) => {
    setAccordion(data);
  };

  const openSubData = (data: number) => {
    setSubAccordion(data);
  };

  const closeCanvas = () => {
    const el = ofCanvasArea.current;
    if (el) {
      el.style.opacity = "0";
      el.style.visibility = "hidden";
    }
    if (bladeMode) {
      bladeMode.style.setProperty("mix-blend-mode", "exclusion");
    }
  };

  return (
    <div className="offcanvas__area" ref={ofCanvasArea}>
      <div className="offcanvas__body">
        <div className="offcanvas__left">
          <div className="offcanvas__logo">
            <Link href="/digital-marketing">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Logo_White}
                alt="Offcanvas Logo"
              />
            </Link>
          </div>
          <div className="offcanvas__links">
            <ul>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="offcanvas__mid">
          <div className="offcanvas__menu-wrapper">
            <nav className="offcanvas__menu">
              <ul className="menu-anim title" ref={headerTitle}>
                <li>
                  <div className="header_title">
                    <Link href={"/dido"}>HOME</Link>
                  </div>
                </li>
                <li>
                  <div className="header_title d-flex">
                    <Link href={"/shop"}>Products</Link>
                    <button
                      type="button"
                      className="accordian-btn"
                      onClick={() => openData(accordion === 4 ? 0 : 4)}
                    >
                      {accordion === 4 ? "-" : "+"}
                    </button>
                  </div>
                  <ul
                    className="sub_title"
                    style={{ display: accordion === 4 ? "" : "none" }}
                  >
                    <li className="sub_header_title">
                      <div className="d-flex justify-content-between">
                        <Link href={"/shop"}>Pantry Staples</Link>
                        <div className="sub-accordian-btn">
                          <a onClick={() => openSubData(subAccordion === 4.1 ? 4 : 4.1)}>
                            {subAccordion === 4.1 ? "-" : "+"}
                          </a>
                        </div>
                      </div>
                      <ul
                        className="sub_title_2"
                        style={{ display: subAccordion === 4.1 ? "" : "none" }}
                      >
                        <li><Link href={"/shop/oil"}>Oil</Link></li>
                        <li><Link href={"/shop/pickled"}>Olives & Pickled Jars</Link></li>
                        <li><Link href={"/shop/pasta"}>Pasta</Link></li>
                        <li><Link href={"/shop/spices"}>Spices & Seasoning</Link></li>
                        <li><Link href={"/service"}>Sauce & Condiments</Link></li>
                        <li><Link href={"/shop/syrup"}>Syrup, Honey & Spreads</Link></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="header_title">
                    <Link href={"/catalog"}>Catalog</Link>
                  </div>
                </li>
                <li>
                  <div className="header_title">
                    <Link href={"/contact"}>CONTACT</Link>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="offcanvas__right">
          <div className="offcanvas__search">
            <form action="#">
              <input type="text" name="search" placeholder="Search keyword" />
              <button type="submit">
                <Search size={16} />
              </button>
            </form>
          </div>
          <div className="offcanvas__contact">
            <h3>Get in touch</h3>
            <ul>
              <li><a href="tel:02094980547">516-727-0114</a></li>
              <li><a href="mailto:info@extradesign.com">didodistributions@gmail.com</a></li>
              <li>Valley Stream, NY</li>
            </ul>
          </div>
        </div>

        <div className="offcanvas__close">
          <button type="button" onClick={closeCanvas}>
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
