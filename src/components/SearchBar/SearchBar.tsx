import React, { ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  className?: string;
  onChange: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={"relative flex shadow w-fit h-fit rounded overflow-hidden border " + className}>
      <div className="w-small h-small flex items-center justify-center bg-[#f7f7f7]">
        <FaSearch />
      </div>
      <input onChange={handleChange} className="w-three h-small text-small18 px-3xsmall" />
    </div>
  );
};

export default SearchBar;
