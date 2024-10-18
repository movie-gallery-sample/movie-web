"use client";
import Image from "next/image";
import WavyBackground from "../../../public/assets/wavy-background-web.svg";

type Props = {
  children: React.ReactElement;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      {children}

      <Image
        src={WavyBackground}
        alt="curved-line-1"
        className="absolute bottom-0 object-contain w-full"
      />
    </div>
  );
}

export default AuthLayout;
