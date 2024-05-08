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
  const { displayedCoffees, setQuery, setPage, pageNum } = useCoffeeContext();

  useEffect(() => {
    handleFilter();
    // Reading the page attribute from the search parameter in the url
    const page = getSearchParam("page");

    console.log("page:\n\t", page); //console.log => page

    // If it exists we will set the context of page
    if (page && setPage) {
      console.log({ page });
      setPage(parseInt(page));
    }

    // If it doesnt exist initialize it
    if (!page) setSearchParam("page", "0", true);
  }, []);

  const handleFilter = () => {
    // Every time we want to trigger a filter event

    // We are rendering the filter clear based on the number of search parameters in the url
    const { size } = new URLSearchParams(window.location.search);
    if (size <= 1) {
      setHasFilter(false);
    } else {
      setHasFilter(true);
    }

    // Getting search parameters and turning it into an array and removing the page parameter
    const queryArr = parseQueryStringToArray(window.location.search);
    // Instead of exclusive filter we should use an inclusive filter
    const limitedQueryArr = queryArr.filter(([key, _]) => key !== "page");

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
      <div className="mt-three flex gap-2xsmall justify-center">
        <SearchBar onChange={() => {}} />
        <div title="Filters">
          <FilterBox onClose={handleFilter} />
        </div>
        {hasFilter && (
          <div onClick={handleClearFilter} className="bg-[#b7b7b7] rounded cursor-pointer flex items-center justify-center w-small" title="Clear Filters">
            <MdClear className="h-small" size={"1.3rem"} />
          </div>
        )}
      </div>
      <div className="mt-small py-large bg-white">
        {typeof pageNum === "number" && <Pagination />}
        <div className="flex flex-wrap mt-small justify-center gap-4">
          {displayedCoffees?.map((coffee, i) => (
            <CoffeeWrapper key={i}>
              <CoffeeDisplay {...coffee} />
            </CoffeeWrapper>
          ))}
        </div>
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

export const Head: HeadFC = () => <title>HomePage</title>;
