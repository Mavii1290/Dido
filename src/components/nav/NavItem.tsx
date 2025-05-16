import Link from "next/link";
import { useEffect, useRef } from "react";

interface SubDropdown {
  name: string;
  link: string;
}

interface SubNavItem {
  name: string;
  link: string;
  sub_dropdown_nav?: SubDropdown[];
}

interface NavItemData {
  nav_name: string;
  link: string;
  type?: "megamenu" | "dropdown" | string;
  full_width?: boolean;
  sub_nav?: SubNavItem[];
}

interface NavItemProps {
  nav: NavItemData[];
  navStyle?: string;
}

export default function NavItem({ nav, navStyle = "" }: NavItemProps): JSX.Element {
  const menuAnim = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (menuAnim.current) {
      menuAnimation();
    } else {
      setTimeout(() => {
        menuAnimation();
      }, 1000);
    }
  }, []);

  const menuAnimation = () => {
    if (!menuAnim.current) return;
    const rootParent = menuAnim.current.children;
    for (let i = 0; i < rootParent.length; i++) {
      const firstParent = rootParent[i].children;
      const textContent = firstParent[0]?.textContent ?? "";
      const arr = textContent.split("");
      let spanData = "";

      for (let j = 0; j < arr.length; j++) {
        if (arr[j] === " ") {
          spanData += `<span style='width:6px;'>${arr[j]}</span>`;
        } else {
          spanData += `<span>${arr[j]}</span>`;
        }
      }

      const result = `<div class="menu-text">${spanData}</div>`;
      firstParent[0].innerHTML = result;
    }
  };

  return (
    <div className="header__nav-2">
      <ul
        className={navStyle ? `main-menu-${navStyle} menu-anim` : `main-menu menu-anim`}
        ref={menuAnim}
      >
        {nav.map((el, i) => {
          if (el.type === "megamenu") {
            return (
              <li className="has-megamenu" key={i}>
                <Link href={el.link}>{el.nav_name}</Link>
                <ul className={el.full_width ? "mega-menu" : "mega-menu-2"}></ul>
              </li>
            );
          } else if (el.type === "dropdown" && el.sub_nav) {
            return (
              <li key={i}>
                <Link href={el.link}>{el.nav_name}</Link>
                <ul className="main-dropdown">
                  {el.sub_nav.map((subEl, index) => (
                    <li key={index}>
                      <Link href={subEl.link}>{subEl.name}</Link>
                      {subEl.sub_dropdown_nav && subEl.sub_dropdown_nav.length > 0 && (
                        <ul className="sub-dropdown">
                          {subEl.sub_dropdown_nav.map((subDrop, subIndex) => (
                            <li key={subIndex}>
                              <Link href={subDrop.link}>{subDrop.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            );
          } else {
            return (
              <li key={i}>
                <Link href={el.link}>{el.nav_name}</Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
