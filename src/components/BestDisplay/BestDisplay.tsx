import React from "react";
import { Coffees } from "../../utils/coffees";
import { CoffeeDisplay } from "../../components";

interface BestDisplyProps {}

const BestDisply: React.FC<BestDisplyProps> = () => {
  return (
    <div className="max-w-five container mx-auto relative">
      <h1 className="text-center text-large mt-med londrina-solid-light">
        Best Seller<span className="hidden md:inline">s</span>
      </h1>
      <div className="flex justify-center mt-small ">
        <CoffeeDisplay {...Coffees[60]} className="w-two hidden md:flex bg-[#f0ebe6] border p-5 rounded shadow-md" />
        <CoffeeDisplay {...Coffees[7]} className="w-two bg-[#f0ebe6] border p-5 scale-110 rounded shadow-md" />
        <CoffeeDisplay {...Coffees[5]} className="w-two hidden md:flex bg-[#f0ebe6] border p-5 rounded shadow-md" />
      </div>
    </div>
  );
};

export default BestDisply;
