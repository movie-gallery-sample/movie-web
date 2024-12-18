import AddMovieForm from "@/components/movie/AddMovieForm";
import { useTranslations } from "next-intl";

function AddMovie() {
  const t = useTranslations("Movie");
  return (
    <div className="w-full px-6 py-20 m-auto flex flex-col flex-grow justify-start gap-20 md:gap-30 md:max-lg:px-10 lg:px-20">
      <h2 className="font-semibold max-md:text-3xl">
        {t("Create a new movie")}
      </h2>
      <AddMovieForm />
    </div>
  );
}

export default AddMovie;
