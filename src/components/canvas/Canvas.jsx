import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo_White from "../../../public/assets/imgs/dido/Logo_White.png"
import Logo from "../../../public/assets/imgs/dido/Logo.png"
import Olive_White from "../../../public/assets/imgs/dido/Olive_White.png"



const Canvas = ({ bladeMode = "", ofCanvasArea }) => {
  const [accordion, setAccordion] = useState(0);
  const [subAccordion, setSubAccordion] = useState(0);
  const headerTitle = useRef();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        let rootParent = headerTitle.current.children;
        for (let i = 0; i < rootParent.length; i++) {
          let firstParent = rootParent[i].children;
          for (let j = 0; j < firstParent.length; j++) {
            if (firstParent[j].className.includes("header_title")) {

              let arr = firstParent[j].children[0].textContent.split("");
              let spanData = "";
              for (let k = 0; k < arr.length; k++) {
                if (arr[k] == " ") {
                  spanData += `<span style='width:2vw;'>${arr[k]}</span>`;
                } else {
                  spanData += `<span>${arr[k]}</span>`;
                }
              }
              let result = '<div class="menu-text">' + spanData + "</div>";
              firstParent[j].children[0].innerHTML = result;
            }
          }
        }
      }, 10);
    }
  }, []);
  const openData = (data) => {
    setAccordion(data);
  };
  const openSubData = (data) => {
    setSubAccordion(data);
  };
  const closeCanvas = () => {
    ofCanvasArea.current.style.opacity = "0";
    ofCanvasArea.current.style.visibility = "hidden";
    if (bladeMode) {
      let header_bg = bladeMode;
      header_bg.style.setProperty("mix-blend-mode", "exclusion");
    }
  };
  return (
    <>
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
            <div className="offcanvas__social">
              <h3 className="social-title">Follow Us</h3>
              <ul>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
              </ul>
            </div>
            <div className="offcanvas__links">
              <ul>
                <li>
                  <Link href="/about">Our Story</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="offcanvas__mid">
            <div className="offcanvas__menu-wrapper">
              <nav className="offcanvas__menu">
                <ul className="menu-anim title" ref={headerTitle}>
                  <li>
                    <div className="header_title">
                      <Link href={"/digital-marketing"}>HOME</Link>
                      </div>
                  </li>
                  <li>
                    <div className="header_title">
                      <Link href={"/about"}>OUR STORY</Link>
                    </div>
                  </li>
                  <li>
                    <div className="header_title d-flex">
                      <Link href={"#"}>Products</Link>
                      <div className="accordian-btn">
                        {accordion === 4 ? (
                          <a onClick={() => openData(0)}>-</a>
                        ) : (
                          <a onClick={() => openData(4)}>+</a>
                        )}
                      </div>
                    </div>
                    <ul
                      className="sub_title"
                      style={
                        accordion === 4 ? { display: "" } : { display: "none" }
                      }
                    >
                      <li className="sub_header_title">
                        <div className="d-flex justify-content-between">
                          <Link href={"/service"}>Pantry Staples</Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 4.1 ? (
                              <a onClick={() => openSubData(4)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(4.1)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2"
                          style={
                            subAccordion === 4.1
                              ? { display: "" }
                              : { display: "none" }
                          }
                        >
                          <li>
                            <Link href={"/service"}>Oil</Link>
                          </li>
                          <li>
                            <Link href={"/service"}>Olives & Pickled Jars</Link>
                          </li>
                          <li>
                            <Link href={"/service"}>Pasta</Link>
                          </li>
                          <li>
                            <Link href={"/service"}>Spices & Seasoning</Link>
                          </li>
                          <li>
                            <Link href={"/service"}>Sauce & Condiments</Link>
                          </li>
                          <li>
                            <Link href={"/service"}>Syrup, Honey & Spreads</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="sub_header_title">
                        <div className="d-flex justify-content-between">
                          <Link href={"/portfolio"}>Beverages</Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 4.2 ? (
                              <a onClick={() => openSubData(4)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(4.2)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2"
                          style={
                            subAccordion === 4.2
                              ? { display: "" }
                              : { display: "none" }
                          }
                        >
                          <li>
                            <Link href={"/portfolio"}>portfolio</Link>
                          </li>
                          <li>
                            <Link href={"/portfolio-dark"}>portfolio dark</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="sub_header_title">
                        <div className="d-flex justify-content-between">
                          <Link href={"/team"}>Dairy & Refrigerated</Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 4.3 ? (
                              <a onClick={() => openSubData(4)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(4.3)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2"
                          style={
                            subAccordion === 4.3
                              ? { display: "" }
                              : { display: "none" }
                          }
                        >
                          <li>
                            <Link href={"/team"}>Dairy</Link>
                          </li>
                        </ul>
                      </li>
                      <li className="sub_header_title">
                        <div className="d-flex justify-content-between">
                          <Link href={"/team"}>Frozen</Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 4.3 ? (
                              <a onClick={() => openSubData(4)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(4.3)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2"
                          style={
                            subAccordion === 4.3
                              ? { display: "" }
                              : { display: "none" }
                          }
                        >
                          <li>
                            <Link href={"/team"}>Frozen</Link>
                          </li>
                        </ul>
                      </li>


                      <li className="sub_header_title">
                        <div className="d-flex justify-content-between">
                          <Link href={"#"}>Sweets</Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 4.4 ? (
                              <a onClick={() => openSubData(4)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(4.4)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2"
                          style={
                            subAccordion === 4.4
                              ? { display: "" }
                              : { display: "none" }
                          }
                        >
                          <li>
                            <Link href={"/about"}>Desserts</Link>
                          </li>
                          <li>
                            <Link href={"/about-dark"}>Chocolate</Link>
                          </li>
                        </ul>
                      </li>
                      
                      <li className="sub_header_title">
                        <div className="d-flex justify-content-between">
                          <Link href={"/blog"}>Paper Goods</Link>
                          <div className="sub-accordian-btn">
                            {subAccordion === 4.5 ? (
                              <a onClick={() => openSubData(4)}>-</a>
                            ) : (
                              <a onClick={() => openSubData(4.5)}>+</a>
                            )}
                          </div>
                        </div>
                        <ul
                          className="sub_title_2"
                          style={
                            subAccordion === 4.5
                              ? { display: "" }
                              : { display: "none" }
                          }
                        >
                          <li>
                            <Link href={"/blog"}>Paper Goods</Link>
                          </li>
                        </ul>
                      </li>

                    </ul>
                  </li>
                  <li>

                    <div className="header_title">
                      <Link href={"/blog"}>Catalog</Link>
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
                <button>
                  <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
              </form>
            </div>
            <div className="offcanvas__contact">
              <h3>Get in touch</h3>
              <ul>
                <li>
                  <a href="tel:02094980547">+(02) - 094 980 547</a>
                </li>
                <li>
                  <a href="mailto:info@extradesign.com">info@extradesign.com</a>
                </li>
                <li>230 Norman Street New York, QC (USA) H8R 1A1</li>
              </ul>
            </div>
          </div>
          <div className="offcanvas__close">
            <button type="button" onClick={closeCanvas}>
              <FontAwesomeIcon icon={faXmark}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Canvas;
