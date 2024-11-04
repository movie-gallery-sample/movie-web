import Image from "next/image";
import { Movie } from "@/types/movie";
import { Link } from "@/i18n/routing";
import { convertPathToUrl } from "@/utils/uploadfile.utils";

function MovieCard(props: Movie) {
  return (
    <Link
      href={`/movies/${props.id}`}
      className="flex flex-col gap-4 w-fit min-w-[160px] p-2 rounded-xl bg-cardColor fade-in hover:scale-105 transition-transform duration-300"
    >
      <Image
        src={convertPathToUrl(props.posterUrl)}
        alt="poster"
        width={0}
        height={0}
        sizes="100vw"
        className="w-auto h-[100%] block rounded-lg object-cover"
      />

      <div className="grid grid-rows-2 gap-2">
        <h5 className="text-lg truncate">{props.title}</h5>
        <p className="text-regular">{props.publishingYear}</p>
      </div>
    </Link>
  );
}

export default MovieCard;
