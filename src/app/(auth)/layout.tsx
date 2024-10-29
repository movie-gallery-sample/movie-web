"use client";

import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactElement;
};

function AuthLayout({ children }: Props) {
  const router = useRouter();

  if (typeof window !== "undefined") {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      router.push("/movies");
    }
  }

  return (
    <main className="relative w-full h-[calc(100vh-50px)] md:h-[calc(100vh-100px)] flex flex-col justify-center items-center">
      {children}
    </main>
  );
}

export default AuthLayout;
