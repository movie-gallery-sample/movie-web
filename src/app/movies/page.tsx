import Link from "next/link";

function MoviesList() {
  const movies = [
    {
      name: "movie 1",
      link: "/movie-1",
    },
    {
      name: "movie 2",
      link: "/movie-2",
    },
    {
      name: "movie 3",
      link: "/movie-3",
    },
  ];

  return (
    <>
      <h6>List of movies</h6>
      <ol>
        {movies.map((item, index) => (
          <li key={index}>
            <Link href={`movies${item.link}`}>{item.name}</Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export default MoviesList;
