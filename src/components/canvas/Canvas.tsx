// import { Search, X } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import Logo_White from "../../../public/assets/imgs/dido/Logo_White.png";
// import Logo from "../../../public/assets/imgs/dido/Logo.png";
// import Olive_White from "../../../public/assets/imgs/dido/Olive_White.png";

// interface CanvasProps {
//   bladeMode?: HTMLElement | null;
//   ofCanvasArea: React.RefObject<HTMLDivElement>;
// }

// const Canvas: React.FC<CanvasProps> = ({ bladeMode = null, ofCanvasArea }) => {
//   const [accordion, setAccordion] = useState<number>(0);
//   const [subAccordion, setSubAccordion] = useState<number>(0);
//   const headerTitle = useRef<HTMLUListElement | null>(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setTimeout(() => {
//         const rootParent = headerTitle.current?.children;
//         if (!rootParent) return;

//         for (let i = 0; i < rootParent.length; i++) {
//           const firstParent = rootParent[i].children;
//           for (let j = 0; j < firstParent.length; j++) {
//             const className = firstParent[j].className || "";
//             if (className.includes("header_title")) {
//               const el = firstParent[j].children[0] as HTMLElement;
//               const arr = el?.textContent?.split("") ?? [];
//               const spanData = arr
//                 .map((char) =>
//                   char === " "
//                     ? `<span style='width:2vw;'>${char}</span>`
//                     : `<span>${char}</span>`
//                 )
//                 .join("");

//               el.innerHTML = `<div class="menu-text">${spanData}</div>`;
//             }
//           }
//         }
//       }, 10);
//     }
//   }, []);

//   const openData = (data: number) => {
//     setAccordion(data);
//   };

//   const openSubData = (data: number) => {
//     setSubAccordion(data);
//   };

//   const closeCanvas = () => {
//     const el = ofCanvasArea.current;
//     if (el) {
//       el.style.opacity = "0";
//       el.style.visibility = "hidden";
//     }
//     if (bladeMode) {
//       bladeMode.style.setProperty("mix-blend-mode", "exclusion");
//     }
//   };

//   return (
//     <div className="offcanvas__area" ref={ofCanvasArea}>
//       <div className="offcanvas__body">
//         <div className="offcanvas__left">
//           <div className="offcanvas__logo">
//             <Link href="/dido">
//               <Image
//                 priority
//                 style={{ width: "auto", height: "auto" }}
//                 src={Logo_White}
//                 alt="Offcanvas Logo"
//               />
//             </Link>
//           </div>
//           <div className="offcanvas__links">
//             <ul>
//               <li><Link href="/contact">Contact</Link></li>
//             </ul>
//           </div>
//         </div>

//         <div className="offcanvas__mid">
//           <div className="offcanvas__menu-wrapper">
//             <nav className="offcanvas__menu">
//               <ul className="menu-anim title" ref={headerTitle}>
//                 <li>
//                   <div className="header_title">
//                     <Link href={"/dido"}>HOME</Link>
//                   </div>
//                 </li>
                
//                   <div className="header_title d-flex">
                    
//                     <Link href={"/shop"}>Products</Link>
//                     <button
//                       type="button"
//                       className="accordian-btn"
//                       onClick={() => openData(accordion === 4 ? 0 : 4)}
//                     >
//                       {accordion === 4 ? "-" : "+"}
//                     </button>
//                   </div>
//                   <div>
//                   <ul
//                     className="sub_title"
//                     style={{ display: accordion === 4 ? "" : "none" }}
//                   >
//                     <li className="sub_header_title">
//                       <div className="d-flex justify-content-between">
//                         <Link href={"/shop"}>Pantry Staples</Link>
//                         <div className="sub-accordian-btn">
//                           <a onClick={() => openSubData(subAccordion === 4.1 ? 4 : 4.1)}>
//                             {subAccordion === 4.1 ? "-" : "+"}
//                           </a>
//                         </div>
//                       </div>
//                       <ul
//                         className="sub_title_2"
//                         style={{ display: subAccordion === 4.1 ? "" : "none" }}
//                       >
//                         <li><Link href={"/shop?sub=oil"}>Oil</Link></li>
//                         <li><Link href={"/shop?sub=pickled"}>Olives & Pickled Jars</Link></li>
//                         <li><Link href={"/shop?sub=pasta"}>Pasta</Link></li>
//                         <li><Link href={"/shop?sub=sauce"}>Sauce</Link></li>
//                         <li><Link href={"/shop?sub=spices"}>Spices & Seasoning</Link></li>
//                         <li><Link href={"/shop/syrup"}>Syrup, Honey & Spreads</Link></li>
//                       </ul>
//                     </li>

//                     <li className="sub_header_title">
//                       <div className="d-flex justify-content-between">
//                         <Link href={"/shop"}>Dairy & Refridgerated</Link>
//                         <div className="sub-accordian-btn">
//                           <a onClick={() => openSubData(subAccordion === 4.1 ? 4 : 4.1)}>
//                             {subAccordion === 4.1 ? "-" : "+"}
//                           </a>
//                         </div>
//                       </div>
//                       <ul
//                         className="sub_title_2"
//                         style={{ display: subAccordion === 4.1 ? "" : "none" }}
//                       >
//                         <li><Link href={"/shop?sub=dairy"}>Dairy</Link></li>
//                         <li><Link href={"/shop?sub=cheese"}>Cheese</Link></li> 
//                         </ul> 
//                       </li>        
//                   </ul>
                
//                 </div>
//                 <li>
//                   <div className="header_title">
//                     <a href="/catalog/Dido_Product_Catalog.pdf" target="_blank" rel="noopener noreferrer">CATALOG</a>
//                   </div>
//                 </li>
//                 <li>
//                   <div className="header_title">
//                     <Link href={"/contact"}>CONTACT</Link>
//                   </div>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>

//         <div className="offcanvas__right">
//           <div className="offcanvas__search">
//             <form action="#">
//               <input type="text" name="search" placeholder="Search keyword" />
//               <button type="submit">
//                 <Search size={16} />
//               </button>
//             </form>
//           </div>
//           <div className="offcanvas__contact">
//             <h3>Get in touch</h3>
//             <ul>
//               <li><a href="tel:02094980547">516-727-0114</a></li>
//               <li><a href="mailto:info@extradesign.com">didodistributions@gmail.com</a></li>
//               <li>Valley Stream, NY</li>
//             </ul>
//           </div>
//         </div>

//         <div className="offcanvas__close">
//           <button type="button" onClick={closeCanvas}>
//             <X size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Canvas;

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo_White from "../../../public/assets/imgs/dido/Logo_White.png";
// import Logo from "../../../public/assets/imgs/dido/Logo.png"; // Not used in this snippet
// import Olive_White from "../../../public/assets/imgs/dido/Olive_White.png"; // Not used in this snippet

// Adjust path as per your file structure, assuming it's correctly named navData.json now
import navDataContent from "../../data/navData.json"; 

// --- UPDATED INTERFACES TO MATCH YOUR JSON STRUCTURE ---

interface SubDropdownNavItem {
  name: string;
  link: string;
}

interface SubNavItem {
  name: string;
  link: string;
  type: string; // "dropdown"
  sub_dropdown_nav?: SubDropdownNavItem[];
}

interface NavItem {
  nav_name: string;
  link: string;
  type: string; // e.g., "", "dropdown"
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
  // Use unique identifiers (index based for simplicity, but IDs are better)
  const [accordion, setAccordion] = useState<number | null>(null);
  const [subAccordion, setSubAccordion] = useState<number | null>(null);
  const headerTitle = useRef<HTMLUListElement | null>(null);

  // Directly access the 'nav' array from the imported JSON
  const navigationItems: NavItem[] = navDataContent.nav;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const rootParent = headerTitle.current?.children;
        if (!rootParent) return;

        // Apply text animation as before
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
  }, []); // Empty dependency array means this runs once on mount

  // Pass the index as the identifier for toggling
  const openData = (index: number) => {
    setAccordion((prevAccordion) => (prevAccordion === index ? null : index));
  };

  const openSubData = (index: number) => {
    setSubAccordion((prevSubAccordion) => (prevSubAccordion === index ? null : index));
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
            <Link href="/dido">
              <Image
                priority
                style={{ width: "auto", height: "auto" }}
                src={Logo_White}
                alt="Offcanvas Logo"
              />
            </Link>
          </div>
          <div className="offcanvas__links">
            {/* You can keep or remove this section based on your navData.json */}
            {/* If "Contact" is only in the main nav, you don't need this duplicate */}
           <div className="offcanvas__contact">
              
              
            <ul>
              <li><Link href="/contact"><h3>Contact</h3></Link></li>
              <li><a href="tel:+15167270114">516-727-0114</a></li>
              <li><a href="mailto:info@extradesign.com">didodistributions@gmail.com</a></li>
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
                  <li key={index}> {/* Using index as key, consider adding unique IDs to JSON */}
                    {/* Main Nav Item */}
                    {item.type === "" ? ( // No type usually means a simple link
                      <div className="header_title">
                        <Link href={item.link}>{item.nav_name}</Link>
                      </div>
                    ) : (
                      // Dropdown Nav Item (e.g., PRODUCTS)
                      <>
                        <div className="header_title d-flex">
                          <Link href={item.link}>{item.nav_name}</Link>
                          {item.sub_nav && ( // Only show button if there are sub-navigation items
                            <button
                              type="button"
                              className="accordian-btn"
                              onClick={() => openData(index)} // Use index for accordion state
                            >
                              {accordion === index ? "-" : "+"}
                            </button>
                          )}
                        </div>
                        {item.sub_nav && ( // Render sub-nav only if it exists
                          <div style={{ display: accordion === index ? "" : "none" }}>
                            <ul className="sub_title">
                              {item.sub_nav.map((subCategory, subIndex) => (
                                <li key={`${index}-${subIndex}`} className="sub_header_title">
                                  {subCategory.type === "dropdown" && subCategory.sub_dropdown_nav ? (
                                    // Nested Dropdown (e.g., Pantry Staples)
                                    <>
                                      <div className="d-flex justify-content-between">
                                        <Link href={subCategory.link}>{subCategory.name}</Link>
                                        <div className="sub-accordian-btn">
                                          <a onClick={() => openSubData(subIndex)}> {/* Use subIndex for subAccordion state */}
                                            {subAccordion === subIndex ? "-" : "+"}
                                          </a>
                                        </div>
                                      </div>
                                      <ul
                                        className="sub_title_2"
                                        style={{
                                          display: subAccordion === subIndex ? "" : "none",
                                        }}
                                      >
                                        {subCategory.sub_dropdown_nav.map((subItem, nestedIndex) => (
                                          <li key={`${index}-${subIndex}-${nestedIndex}`}>
                                            <Link href={subItem.link}>{subItem.name}</Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </>
                                  ) : (
                                    // Simple Sub-Category Link (if there were any without further nesting)
                                    <Link href={subCategory.link}>{subCategory.name}</Link>
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