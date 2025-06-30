import { useEffect, useRef, useState } from "react";
import Canvas from "../canvas/Canvas";
import MenuBlack from "../../../public/menu-black.png";
import Image from "next/image";
import SearchData from "../../data/searchData.json";
import { useRouter } from "next/router";
import NavItem from "../nav/NavItem";
import LogoItem from "../logo/LogoItem";

interface SubDropdown {
  name: string;
  link: string;
}

interface SubNav {
  name: string;
  link: string;
  type?: string;
  sub_dropdown_nav?: SubDropdown[];
}

interface NavItemType {
  nav_name: string;
  link: string;
  type?: string;
  full_width?: boolean;
  sub_nav?: SubNav[];
}

interface NavData {
  nav: NavItemType[];
}

interface Header1Props {
  navData: NavData;
}

const Header1 = ({ navData }: Header1Props) => {
  const [topScroll, setTopScroll] = useState(0);
  const [searchData, setSearchData] = useState<any[]>([]); // Adjust as needed, replace any with the correct type.
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchSlug, setSearchSlug] = useState<string[]>([]);

  const ofCanvasArea = useRef<HTMLDivElement | null>(null);
  const headerArea = useRef<HTMLDivElement | null>(null);
  const headerSearch = useRef<HTMLDivElement | null>(null);
  const searchIcon = useRef<HTMLButtonElement | null>(null);
  const searchClose = useRef<HTMLButtonElement | null>(null);
  const searchContent = useRef<HTMLDivElement | null>(null);

  const router = useRouter();

  const handleTopScroll = () => {
    const position = window.pageYOffset;
    setTopScroll(position);
  };

  useEffect(() => {
    setSearchData(SearchData.search);
    window.addEventListener("scroll", handleTopScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleTopScroll);
    };
  }, []);

  useEffect(() => {
    if (headerArea.current) {
      if (topScroll > 20) {
        headerArea.current.classList.add("sticky-3");
      } else {
        headerArea.current.classList.remove("sticky-3");
      }
    }
  }, [topScroll]);

  const openCanvas = () => {
    if (ofCanvasArea.current) {
      ofCanvasArea.current.style.opacity = "1";
      ofCanvasArea.current.style.visibility = "visible";
    }
  };

  const openSearch = () => {
    if (headerSearch.current) {
      headerSearch.current.classList.add("open-search");
    }
    if (searchIcon.current) {
      searchIcon.current.style.display = "none";
    }
    if (searchClose.current) {
      searchClose.current.style.display = "block";
    }
  };

  const closeSearch = () => {
    if (headerSearch.current) {
      headerSearch.current.classList.remove("open-search");
    }
    if (searchIcon.current) {
      searchIcon.current.style.display = "block";
    }
    if (searchClose.current) {
      searchClose.current.style.display = "none";
    }
    setSearchValue("");
    const inputData = document.getElementById("s") as HTMLInputElement;
    if (inputData) {
      inputData.value = "";
    }
  };

  useEffect(() => {
    if (!searchContent.current) return; // ✅ Make sure the ref is set

    if (searchData && searchData.length) {
      const parentDiv = searchContent.current;

      parentDiv.innerHTML = ""; // ✅ Safe now

      if (searchValue) {
        const allSlug: string[] = [];

        searchData.forEach((el) => {
          if (el.name.includes(searchValue)) {
            allSlug.push(el.slug);

            const createTag = document.createElement("p");
            createTag.innerHTML = el.name;
            createTag.classList.add("search-name");

            parentDiv.appendChild(createTag);
          }
        });

        setSearchSlug(allSlug);
      } else {
        setSearchSlug([]);
      }
    }
  }, [searchData, searchValue]); // ✅ Add dependencies

  const searchItem = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchSlug && searchSlug.length) {
      router.push("/" + searchSlug[0]);
    }
  };


  return (
    <div className="head">
      <header className="header__area-3 relative z-50" ref={headerArea}>
        <div className="header__inner-3">
          <LogoItem />
          <NavItem nav={navData.nav} navStyle={3} />
          <div className="header__nav-icon-3">
            <button
              className="search-icon"
              onClick={openSearch}
              id="search_icon"
              ref={searchIcon}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button
              className="search-icon"
              onClick={closeSearch}
              id="search_close"
              ref={searchClose}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <button onClick={openCanvas}>
              <Image
                priority
                width={21}
                height={15}
                src={MenuBlack}
                alt="Menubar Icon"
              />
            </button>
          </div>
        </div>
      </header>

      <div className="header__search" ref={headerSearch}>
        <form onSubmit={searchItem}>
          <input
            type="text"
            name="s"
            id="s"
            placeholder="Search.."
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <div id="search-value" ref={searchContent}></div>
        </form>
      </div>

      <Canvas ofCanvasArea={ofCanvasArea} />
    </div>
  );
};


export default Header1;
