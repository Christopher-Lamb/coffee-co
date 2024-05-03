import React, { useRef, useState, forwardRef, useEffect } from "react";
import { RxMixerVertical } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { SlArrowRight } from "react-icons/sl";
// import { navigate } from "gatsby";
import "./FilterBox.css";

function updateQueryParameters(paramsObj: Record<string, string | undefined>) {
  const params = new URLSearchParams(window.location.search);

  // Update each parameter based on the provided object
  Object.entries(paramsObj).forEach(([key, value]) => {
    if (value === undefined || value === "") {
      // If value is undefined or an empty string, remove the parameter
      params.delete(key);
    } else {
      // Otherwise, set or update the parameter with the new value
      params.set(key, value);
    }
  });

  // Update the browser's URL without reloading the page or changing the scroll position
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}
interface SearchFilterProps {
  onClose: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onClose }) => {
  const [isFilter, setIsFilter] = useState(false);

  const handleClick = () => {
    setIsFilter((prev) => !prev);
    if (isFilter) onClose();
  };

  return (
    <div className="">
      <button onClick={handleClick} className="flex items-center text-primarys font-semibold text-small18 px-2xsmall bg-[#f7f7f7] rounded" title="Filter">
        <RxMixerVertical className="h-small" />
      </button>
      {isFilter && <FilterUI onClose={handleClick} />}
    </div>
  );
};

interface FilterUIProps {
  onClose: () => void;
  className?: string;
}

interface Option {
  type: string;
  options: string[];
}
const filterOptions: Option[] = [
  { type: "price", options: ["Low to High", "High to Low"] },
  { type: "roast", options: ["espresso", "dark", "light", "medium"] },
  { type: "origin", options: ["arabic", "ethiopian", "columbian", "indian"] },
];

const FilterUI: React.FC<FilterUIProps> = ({ onClose, className }) => {
  return (
    <div className={`absolute z-[1] w-full left-0 ${className}`}>
      <div className="max-w-four min-h-three bg-[#f7f7f7] p-xsmall border shadow mx-auto">
        <div className="flex justify-between border-b-[1px]">
          <h1 className="text-large border-b-[1px] mb-4">Filters</h1>
          <button className="" onClick={onClose}>
            <MdClose size={"1.4rem"} />
          </button>
        </div>
        <ul>
          {filterOptions.map((option) => (
            <FilterOption key={option.type} {...option} />
          ))}
        </ul>
      </div>
    </div>
  );
};

interface FilterOptionProps extends Option {}

const FilterOption: React.FC<FilterOptionProps> = ({ type, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropDown = () => {
    setIsOpen((prev) => !prev);
    // if (isOpen) {
    //   svgRef?.current?.classList.remove("rotate-90");
    // } else {
    //   svgRef?.current?.classList.add("rotate-90");
    // }
  };

  const handleDropDownChange = (text: string) => {
    setSelectedOption(text);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const optionParam = params.get(type);
    if (optionParam) {
      setIsOpen(true);
      setSelectedOption(optionParam);
    }
  }, []);
  return (
    <>
      <li onClick={handleDropDown} className="py-2xsmall border flex justify-between px-xsmall">
        <span className="capitalize">
          {type}
          {selectedOption && (
            <span>
              : <span className="capitalize text-stone-800">{selectedOption}</span>
            </span>
          )}
        </span>
        <SlArrowRight size={"1.5rem"} className={`stroke-[50px] transition ${isOpen ? "rotate-90" : ""}`} />
      </li>
      <Dropdown onChange={handleDropDownChange} options={options} type={type} className={`${isOpen ? "dropdown-active" : "dropdown-inactive"}`} />
    </>
  );
};

interface DropdownProps extends Option {
  className?: string;
  onChange: (text: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, type, className, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      updateQueryParameters({ [type]: "" });
      onChange("");
    } else {
      setSelectedOption(option);
      updateQueryParameters({ [type]: option });
      onChange(option);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const optionParam = params.get(type);
    if (optionParam) setSelectedOption(optionParam);
  }, []);

  return (
    <div className={className}>
      {options.map((item, i) => (
        <div key={item + i} className={`radio-option ${selectedOption === item ? "selected" : ""}`} onClick={() => handleOptionClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};

export default SearchFilter;
