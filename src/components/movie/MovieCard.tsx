import Image from "next/image";
import { Movie } from "@/types/movie";
import Link from "next/link";

function MovieCard(props: Movie) {
  return (
    <Link
      href={`/movies/${props.id}`}
      className="flex flex-col gap-4 w-fit min-w-[160px] p-2 rounded-xl bg-cardColor fade-in hover:scale-105 transition-transform duration-300"
    >
      <Image
        src={props.posterUrl}
        alt="poster"
        width={0}
        height={0}
        sizes="100vw"
        className="block object-cover rounded-xl w-[180px] h-[220px] xs:w-[200px] xs:h-[280px] xl:w-[266px] xl:h-[400px]"
      />

      <div className="grid grid-rows-2 gap-2">
        <h5 className="text-lg truncate">{props.title}</h5>
        <p className="text-regular">{props.publishingYear}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
