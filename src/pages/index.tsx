import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { BestDisplay, Navbar, Image, SearchBar, FilterBox, CoffeeDisplay, Pagination } from "../components";
import { MdClear } from "react-icons/md";
import { Coffees } from "../utils/coffees";
import { useCoffeeContext } from "../context/CoffeeContext";
import { clearSpecificSearchParameters, parseQueryStringToArray } from "../utils/queryFunctions";
import { arrayToSearchQuery } from "../utils/searchFunction";
import { getSearchParam, setSearchParam } from "../utils/searchParameters";

const IndexPage: React.FC<PageProps> = () => {
  const [hasFilter, setHasFilter] = useState(false);
  const { displayedCoffees, setQuery, setPage, pageNum, setSearch } = useCoffeeContext();
  document.documentElement.className = "beans";

  useEffect(() => {
    handleFilter();
    // Reading the page attribute from the search parameter in the url
    const page = getSearchParam("page");

    // If it exists we will set the context of page
    if (page && setPage) {
      setPage(parseInt(page));
    }

    // If it doesnt exist initialize it
    if (!page) setSearchParam("page", "0", true);
  }, []);

  const handleFilter = () => {
    // Every time we want to trigger a filter event

    // We are rendering the filter clear based on the number of search parameters in the url
    const { size } = new URLSearchParams(window.location.search);
    if (size <= 2) {
      setHasFilter(false);
    } else {
      setHasFilter(true);
    }

    // Getting search parameters and turning it into an array and removing the page parameter
    const queryArr = parseQueryStringToArray(window.location.search);
    // Instead of exclusive filter we should use an inclusive filter
    const limitedQueryArr = queryArr.filter(([key, _]) => !["page", "search"].includes(key));

    // Creating our special query for context
    const query = arrayToSearchQuery(limitedQueryArr);
    // Sending it to the context
    if (setQuery) setQuery(query);
  };

  const handleClearFilter = () => {
    //Only clears the paramters we want to ≈ Leaving page attr
    clearSpecificSearchParameters("price", "roast", "origin", "rating", "weight");
    handleFilter();
  };

  return (
    <main>
      <Navbar />
      <div className="relative w-full">
        <Image fileName="hero1920.png" className="absolute w-full min-h-[730px] " />
      </div>
      <BestDisplay />
      <div className="mt-two xl:mt-three flex gap-2xsmall justify-center">
        <SearchBar />
        <div title="Filters">
          <FilterBox onClose={handleFilter} />
        </div>
        {hasFilter && (
          <div onClick={handleClearFilter} className="bg-[#b7b7b7] rounded cursor-pointer flex items-center justify-center w-small" title="Clear Filters">
            <MdClear className="h-small" size={"1.3rem"} />
          </div>
        )}
      </div>
      <div className="mt-small py-large min-h-four bg-white">
        {typeof pageNum === "number" && displayedCoffees && displayedCoffees.length !== 0 ? (
          <Pagination />
        ) : (
          <a
            onClick={() => {
              handleClearFilter();
              setSearch && setSearch("");
            }}
            className="cursor-pointer"
          >
            <p className="text-center px-small text-med text-slate-800">
              <span className="font-bold">Oops!</span> No Coffees here...
            </p>
          </a>
        )}

        <div className="flex flex-wrap my-small max-w-five mx-auto justify-center gap-4">
          {displayedCoffees?.map((coffee, i) => (
            <CoffeeWrapper key={i}>
              <CoffeeDisplay {...coffee} />
            </CoffeeWrapper>
          ))}
        </div>
        {typeof pageNum === "number" && displayedCoffees && displayedCoffees.length > 5 && <Pagination />}
      </div>
      <div className="mt-three"></div>
      <div className="mt-three"></div>
    </main>
  );
};

interface CoffeeWrapperProps {
  children?: React.ReactNode;
}

const CoffeeWrapper: React.FC<CoffeeWrapperProps> = ({ children }) => {
  return <div className="w-two p-3xsmall border bg-[#f7f7f7]">{children}</div>;
};

export default IndexPage;

export const Head: HeadFC = () => <title>Coffee Co.</title>;
