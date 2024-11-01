import Image from "next/image";
import MoviePoster from "../../../public/assets/poster01.png";
import { Movie } from "@/types/movie";
import { Link } from "@/i18n/routing";

function MovieCard(props: Movie) {
  return (
    <Link
      href={`/movies/${props.id}`}
      className="flex flex-col gap-4 w-fit min-w-[160px] p-2 rounded-xl bg-cardColor fade-in hover:scale-105 transition-transform duration-300"
    >
      <Image
        src={MoviePoster}
        alt="poster"
        style={{
          display: "block",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />

      <div className="grid grid-rows-2 gap-2">
        <h5 className="text-lg truncate">{props.title}</h5>
        <p className="text-regular">{props.publishingYear}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
