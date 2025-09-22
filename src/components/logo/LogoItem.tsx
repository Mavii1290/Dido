import Link from "next/link";
import Image from "next/image";

import Logo from "../../../public/assets/imgs/dido/Logo-1.png";
import LogoWhite2 from "../../../public/assets/imgs/logo/site-logo-white-2.png";

const LogoItem = () => {
  return (
    <div className="header__logo-2">
      <Link href="/" className="logo-dark">
        <Image
          priority
          width={100}
          height={100}
          src={Logo}
          alt="Site Logo Dark"
        />
      </Link>
      <Link href="/" className="logo-light">
        <Image
          priority
          width={100}
          height={33}
          src={LogoWhite2}
          alt="Site Logo Light"
        />
      </Link>
    </div>
  );
};

export default LogoItem;
