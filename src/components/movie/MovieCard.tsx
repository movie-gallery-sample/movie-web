import Image from "next/image";
import MoviePoster from "../../../public/assets/poster01.png";
import { Movie } from "@/types/movie";
import Link from "next/link";

function MovieCard(props: Movie) {
  return (
    <Link
      href={`/movies/${props.id}`}
      className="flex flex-col gap-4 max-xs:w-[250px] max-sm:w-[180px] min-w-[200px] min-h-[280px] p-2 rounded-xl bg-cardColor fade-in hover:scale-105 transition-transform duration-300"
    >
      <Image
        src={MoviePoster}
        alt="Bold typography"
        style={{
          display: "block",
          objectFit: "cover",
          backgroundColor: "var(--gray-5)",
          borderRadius: "12px",
        }}
      />

      <div className="flex flex-col gap-2">
        <h5 className="text-lg">{props.title}</h5>
        <p className="text-regular">{props.year}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
