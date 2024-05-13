import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import Image from "../Image";
import { useCoffeeContext } from "../../context/CoffeeContext";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { cartAmt = 0 } = useCoffeeContext();

  return (
    <header className="h-med flex bg-primary">
      <div className="flex items-center justify-around max-w-five w-full mx-auto">
        <div aria-hidden></div>
        <a href="/">
          <Image fileName="CoffeeCoLogoNoOutline.png" className="w-[200px]" />
        </a>
        <div className="relative flex items-center">
          {cartAmt > 0 && (
            <div className="relative">
              <div className="absolute w-fit p-1 min-w-[20px] h-5 bg-white rounded-xl flex items-center justify-center text-primary top-[-20px] left-[20px]">{cartAmt}</div>
            </div>
          )}
          <a href="/cart">
            <BsCart4 className="text-accent" size={"2rem"} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
