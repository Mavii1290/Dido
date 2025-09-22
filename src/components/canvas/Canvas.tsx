import { Search, X, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo_White from "../../../public/assets/imgs/dido/Logo_White.png";
import navDataContent from "../../data/navData.json";

// --- INTERFACES TO MATCH YOUR JSON STRUCTURE ---

interface SubDropdownNavItem {
  name: string;
  link: string;
}

interface SubNavItem {
  name: string;
  link: string;
  type: string;
  sub_dropdown_nav?: SubDropdownNavItem[];
}

interface NavItem {
  nav_name: string;
  link: string;
  type: string;
  sub_nav?: SubNavItem[];
}

interface NavDataRoot {
  nav: NavItem[];
}

interface CanvasProps {
  bladeMode?: HTMLElement | null;
  ofCanvasArea: React.RefObject<HTMLDivElement>;
}

const Canvas: React.FC<CanvasProps> = ({ bladeMode = null, ofCanvasArea }) => {
  const [accordion, setAccordion] = useState<number | null>(null);
  // Renamed to subAccordion and changed type to string for unique keys
  const [subAccordion, setSubAccordion] = useState<string | null>(null);
  const headerTitle = useRef<HTMLUListElement | null>(null);

  const navigationItems: NavItem[] = navDataContent.nav;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const rootParent = headerTitle.current?.children;
        if (!rootParent) return;

        for (const firstParentEl of Array.from(rootParent)) {
          const firstParent = firstParentEl.children;
          for (const childEl of Array.from(firstParent)) {
            const className = childEl.className || "";
            if (className.includes("header_title")) {
              const el = childEl.children[0] as HTMLElement;
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

  const openData = (index: number) => {
    setAccordion((prevAccordion) => (prevAccordion === index ? null : index));
  };

  // Modified to use a unique key for each sub-accordion
  const openSubData = (key: string) => {
    setSubAccordion((prevSubAccordion) => (prevSubAccordion === key ? null : key));
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
            <Link href="/">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Logo_White}
                alt="Offcanvas Logo"
              />
            </Link>
          </div>
          <div className="offcanvas__links">
            <div className="offcanvas__contact">
              <ul>
                <li>
                  <Link href="/contact">
                    <h3>Contact</h3>
                  </Link>
                </li>
                <li>
                  <a href="tel:+15167270114">516-727-0114</a>
                </li>
                <li>
                  <a href="mailto:didodistributions@gmail.com">
                    didodistributions@gmail.com
                  </a>
                </li>
                <li>Valley Stream, NY</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="offcanvas__mid">
          <div className="offcanvas__menu-wrapper">
            <nav className="offcanvas__menu">
              <ul className="menu-anim title" ref={headerTitle}>
                {navigationItems.map((item, index) => (
                  <li key={index}>
                    {item.type === "" ? (
                      <div className="header_title">
                        <Link href={item.link}>{item.nav_name}</Link>
                      </div>
                    ) : (
                      <>
                        <div
                          className="header_title d-flex justify-between items-center"
                          onClick={() => openData(index)}
                          style={{ cursor: "pointer" }}
                        >
                          <Link href={item.link}>{item.nav_name}</Link>
                          {item.sub_nav && (
                            <button
                              type="button"
                              className="accordion-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                openData(index);
                              }}
                            >
                              {accordion === index ? <Minus size={20} /> : <Plus size={20} />}
                            </button>
                          )}
                        </div>
                        {item.sub_nav && (
                          <div
                            style={{
                              display: accordion === index ? "" : "none",
                            }}
                          >
                            <ul className="sub_title">
                              {item.sub_nav.map((subCategory, subIndex) => (
                                <li
                                  key={`${index}-${subIndex}`}
                                  className="sub_header_title"
                                >
                                  {subCategory.sub_dropdown_nav && subCategory.sub_dropdown_nav.length > 0 ? (
                                    <>
                                      <div
                                        className="d-flex justify-between items-center"
                                        onClick={() => openSubData(`${index}-${subIndex}`)}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <Link href={subCategory.link} onClick={(e) => e.preventDefault()}>
                                          {subCategory.name}
                                        </Link>
                                        <button
                                          type="button"
                                          className="accordion-btn plus_minus"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openSubData(`${index}-${subIndex}`);
                                          }}
                                        >
                                          {subAccordion === `${index}-${subIndex}` ? (
                                            <Minus size={20} />
                                          ) : (
                                            <Plus size={20} />
                                          )}
                                        </button>
                                      </div>
                                      <ul
                                        className="sub_title_2"
                                        style={{
                                          display:
                                            subAccordion === `${index}-${subIndex}`
                                              ? ""
                                              : "none",
                                        }}
                                      >
                                        {subCategory.sub_dropdown_nav.map(
                                          (subItem, nestedIndex) => (
                                            <li
                                              key={`${index}-${subIndex}-${nestedIndex}`}
                                            >
                                              <Link
                                                href={subItem.link}
                                                onClick={closeCanvas}
                                              >
                                                {subItem.name}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </>
                                  ) : (
                                    <Link
                                      href={subCategory.link}
                                      onClick={closeCanvas}
                                    >
                                      {subCategory.name}
                                    </Link>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </li>
                ))}
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
