import React, { ChangeEvent, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useCoffeeContext } from "../../context/CoffeeContext";
import { getSearchParam } from "../../utils/searchParameters";
interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const { setSearch, searchQuery } = useCoffeeContext();

  useEffect(() => {
    const searchParam = getSearchParam("search");
    setSearch && setSearch(searchParam || "");
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch && setSearch(e.target.value);
  };

  return (
    <div className={"relative flex shadow w-fit h-fit rounded overflow-hidden border " + className}>
      <div className="w-small h-small flex items-center justify-center bg-[#f7f7f7]">
        <FaSearch />
      </div>
      <input onChange={handleChange} value={searchQuery} className="w-three h-small text-small18 px-3xsmall" />
    </div>
  );
};

export default SearchBar;
