import React from "react";
import { Coffees } from "../../utils/coffees";
import { CoffeeDisplay } from "../../components";
interface Coffee {
  id: string;
  rating: number;
  name: string;
  roast: string;
  filename: string;
  notes: string[];
  price: string;
  weight: string;
}
interface BestDisplyProps {}

const BestDisply: React.FC<BestDisplyProps> = () => {
  return (
    <div className="max-w-five container mx-auto relative">
      <h1 className="text-center text-large mt-med londrina-solid-light">
        Best Seller<span className="hidden md:inline">s</span>
      </h1>
      <div className="flex justify-center mt-small ">
        <CoffeeDisplay {...Coffees.coffee1} className="w-two hidden md:flex bg-[#f0ebe6] border p-5 rounded shadow-md" />
        <CoffeeDisplay {...Coffees.coffee1} className="w-two bg-[#f0ebe6] border p-5 scale-110 rounded shadow-md" />
        <CoffeeDisplay {...Coffees.coffee1} className="w-two hidden md:flex bg-[#f0ebe6] border p-5 rounded shadow-md" />
      </div>
    </div>
  );
};

export default BestDisply;
