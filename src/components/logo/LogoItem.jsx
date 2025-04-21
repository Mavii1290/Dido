import Link from "next/link";
import LogoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";
import Image from "next/image";
import Logo from "../../../public/assets/imgs/dido/Logo.png"
import HeaderLogo from "../../../public/assets/imgs/dido/HeaderLogo.png"



export default function LogoItem() {
  return (
    <>
      <div className="header__logo-2">
        <Link href={"/digital-marketing"} className="logo-dark">
          <Image
            priority
            width={100}
            height={100}
            src={Logo}
            alt="Site Logo"
          />
        </Link>
        <Link href={"/digital-marketing"} className="logo-light">
          <Image
            priority
            width={100}
            height={33}
            src={LogoWhite2}
            alt="Site Logo"
          />
        </Link>
      </div>
    </>
  );
}
