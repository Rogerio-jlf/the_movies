import FiltersComponent from "./Filters";
import SearchInputComponent from "./SearchInput";

export default function HeaderComponent () {

  // - RENDERIZAÇÃO
  return (
    <>
      <header>
        <form action="/" method="GET" className="max-w-xl mx-auto">
          <SearchInputComponent />
          <FiltersComponent />
        </form>
      </header>
    </>
  );
}
