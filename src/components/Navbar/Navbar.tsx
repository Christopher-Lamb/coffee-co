import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import Image from "../Image";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const [numCartItems, setNumCartItems] = useState(9);
  return (
    <header className="h-med flex bg-primary">
      <div className="flex items-center justify-around max-w-five w-full mx-auto">
        <div aria-hidden></div>
        <div className="">
          <Image fileName="CoffeeCoLogoNoOutline.png" className="w-[200px]" />
        </div>
        <div className="relative flex items-center">
          {numCartItems > 0 && (
            <div className="relative">
              <div className="absolute w-fit p-1 min-w-[20px] h-5 bg-white rounded-xl flex items-center justify-center text-primary top-[-20px] left-[20px]">{numCartItems}</div>
            </div>
          )}
          <BsCart4 className="text-accent" size={"2rem"} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
