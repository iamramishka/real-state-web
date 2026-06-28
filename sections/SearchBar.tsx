import { SearchForm } from "@/components/forms/SearchForm";
import { FilterChipRow, SuggestionChipRow } from "@/components/ui/Chip";
import { propertyFilters } from "@/data/filters";
import { searchSuggestions } from "@/data/suggestions";

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
        <div className="grid gap-5">
          <SearchForm />
          <SuggestionChipRow items={searchSuggestions} />
          <FilterChipRow items={propertyFilters} />
        </div>
      </div>
    </section>
  );
}
