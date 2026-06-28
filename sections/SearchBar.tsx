import { SearchForm } from "@/components/forms/SearchForm";

export function SearchBar() {
  return (
    <section
      aria-labelledby="search-title"
      className="relative z-10 -mt-16 pb-16"
    >
      <div className="container-page">
        <h2 className="sr-only" id="search-title">
          Search homes
        </h2>
        <SearchForm />
      </div>
    </section>
  );
}
