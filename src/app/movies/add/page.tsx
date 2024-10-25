import AddMovieForm from "@/components/movie/AddMovieForm";

function AddMovie() {
  return (
    <div className="max-xs:w-[340px] md:w-[88%] py-20 flex flex-col flex-grow justify-start gap-20 md:gap-30 sm:px-6">
      <h2 className="font-semibold max-sm:text-3xl">Create a new movie</h2>
      <AddMovieForm />
    </div>
  );
}

export default AddMovie;
