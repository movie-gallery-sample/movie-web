"use client";

type Props = {
  children: React.ReactElement;
};

function AuthLayout({ children }: Props) {
  return (
    <div className="relative w-full h-[calc(100vh-50px)] md:h-[calc(100vh-100px)] flex flex-col justify-center items-center">
      {children}
    </div>
  );
}

export default AuthLayout;
