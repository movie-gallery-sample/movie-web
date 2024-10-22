"use client";
type Props = {
  children: React.ReactElement;
};

function MovieLayout({ children }: Props) {
  return (
    <div className="w-full flex flex-grow flex-col justify-start items-center">
      {children}
    </div>
  );
}

export default MovieLayout;
