type Props = {
  children: React.ReactElement;
};

function MovieLayout({ children }: Props) {
  return (
    <main className="w-full flex flex-grow flex-col justify-start items-center">
      {children}
    </main>
  );
}

export default MovieLayout;
