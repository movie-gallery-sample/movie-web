import { default as EditMovieForm } from "@/components/movie/AddMovieForm";
// import { useTranslation } from "react-i18next";

function EditMovie() {
  // const { t } = useTranslation("movie");
  return (
    <div className="w-full px-6 py-20 lg:px-20 flex flex-col flex-grow justify-start gap-20 md:gap-30">
      <h2 className="font-semibold max-md:text-3xl">Edit</h2>
      <EditMovieForm isEdit />
    </div>
  );
}

export default EditMovie;
