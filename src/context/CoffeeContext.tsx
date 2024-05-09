import React, { createContext, useContext, useState, useEffect } from "react";
import { sortCoffees, paginateArray, searchCoffees } from "../utils/searchFunction";
import { Coffees } from "../utils/coffees";
import { setSearchParam } from "../utils/searchParameters";

interface Coffee {
  rating: number;
  name: string;
  roast: string;
  origin: string;
  filename: string;
  notes: string[];
  price: number;
  weight: number;
}

type CoffeeFilters = Partial<Omit<Coffee, "price" | "weight" | "rating">> | {};

interface CoffeeQuery {
  filters?: CoffeeFilters;
  sort?: Array<{ key: keyof Coffee; order: "asc" | "desc" }>;
  // Any other filters or parameters can be added here
}

interface CoffeeContextProps {
  displayedCoffees: Coffee[];
  setQuery: (query: CoffeeQuery) => void;
  setPage: (pageNum: number) => void;
  setSearch: (query: string) => void;
  pageNum: number | null;
  totalPages: number;
  searchQuery: string;
}

const defaultContextValue: Partial<CoffeeContextProps> = {
  displayedCoffees: undefined,
  setQuery: undefined,
  setPage: undefined,
  setSearch: undefined,
  pageNum: undefined,
  totalPages: undefined,
  searchQuery: undefined,
};

const CoffeeContext = createContext(defaultContextValue);

const numPerPage = 8;

export const CoffeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [displayedCoffees, setDisplayedCoffees] = useState<Coffee[]>([]);
  const [queryState, setQueryState] = useState<CoffeeQuery>();
  const [pageNum, setPageNum] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [hasInit, setHasInit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const setCoffees = (query: CoffeeQuery, currentPage: number, search: string) => {
    //Remove inaccurate coffees
    const filteredCoffee = sortCoffees(Coffees, query);

    //Handle Search
    const searchedCoffees = searchCoffees(filteredCoffee, search);

    //Get relevant coffees for the page
    const array: Coffee[] = paginateArray(searchedCoffees, numPerPage, currentPage + 1);
    const pageAmount = Math.ceil(searchedCoffees.length / numPerPage);

    // Handle State Changes
    setPageNum(currentPage);
    setTotalPages(pageAmount);
    setDisplayedCoffees(array);
  };

  const setQuery = (query?: CoffeeQuery) => {
    const definedQuery = query || {};
    //Store Query for later use
    setQueryState(definedQuery);
    setHasInit(true);

    // Set Coffee Based on filter
    if (hasInit) {
      setCoffees(definedQuery, 0, searchQuery);
      setSearchParam("page", "0");
    } else {
      setCoffees(definedQuery, pageNum || 0, searchQuery);
    }
  };

  const setPage = (newPageNum: number) => {
    setCoffees(queryState || {}, newPageNum, searchQuery);
  };

  const setSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParam("search", query);
    setCoffees(queryState || {}, 0, query);
  };

  useEffect(() => {
    // setCoffees();
  }, []);

  return (
    <CoffeeContext.Provider value={{ displayedCoffees, setQuery, setPage, setSearch, searchQuery, pageNum, totalPages }}>
      <div className="context-wrapper">
        {displayedCoffees[0] &&
          Object.entries({ "Current Page": pageNum, totalPages, "First Coffee": displayedCoffees[0].name, hasInit, isGay: true, likesMen: true }).map(([key, value], i) => (
            <div className={`${i === 0 ? "context-item-1" : "context-item"} ${i % 2 === 0 ? "item-odd" : "item-even"}`}>
              <span className="context-key">{key}</span>
              {": "}
              <span className="context-value">{`${value}`}</span>
            </div>
          ))}
      </div>
      {children}
    </CoffeeContext.Provider>
  );
};

export const useCoffeeContext = () => useContext(CoffeeContext);
