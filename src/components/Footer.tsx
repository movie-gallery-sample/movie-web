"use client";

import Image from "next/image";
import WavyBackgroundWeb from "../../public/assets/wavy-background-web.svg";
import WavyBackgroundMobile from "../../public/assets/wavy-background-mobile.svg";
import useWindowSize from "@/lib/hooks/useWindowSize";

function Footer() {
  const { width: windowWidth } = useWindowSize();

  return (
    <>
      {windowWidth === 0 ? null : windowWidth < 640 ? (
        <Image
          src={WavyBackgroundMobile}
          alt="curved-line-1"
          className="object-contain w-full justify-self-end"
          height={100}
          priority
        />
      ) : (
        <Image
          src={WavyBackgroundWeb}
          alt="curved-line-1"
          className="object-contain w-full justify-self-end"
          height={100}
          priority
        />
      )}
    </>
  );
}

export default Footer;
