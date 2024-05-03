import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { BestDisplay, Navbar, Image, SearchBar, FilterBox, CoffeeDisplay } from "../components";
import { MdClear } from "react-icons/md";
import { Coffees } from "../utils/coffees";

function clearSpecificSearchParameters(...keys: string[]) {
  const params = new URLSearchParams(window.location.search);

  // Remove specified parameters
  keys.forEach((key) => params.delete(key));

  // Update the browser's URL without reloading the page
  window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
}

const IndexPage: React.FC<PageProps> = () => {
  const [hasFilter, setHasFilter] = useState(false);

  useEffect(() => {
    handleFilter();
  }, []);

  const handleFilter = () => {
    const { size } = new URLSearchParams(window.location.search);
    if (size === 0) {
      setHasFilter(false);
    } else {
      setHasFilter(true);
    }
  };

  const handleClearFilter = () => {
    clearSpecificSearchParameters("price", "roast", "origin");
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
      <div className="py-large bg-white flex flex-wrap justify-center gap-4 mt-small">
        {[...Array(8).keys()].map((i) => (
          <CoffeeWrapper key={i}>
            <CoffeeDisplay {...Coffees[118]} />
          </CoffeeWrapper>
        ))}
      </div>
      <div className="mt-three"></div>
      <button className="glow-button">Glowing Button</button>
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
