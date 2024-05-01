import React from "react";
import { Coffees } from "../../utils/coffees";
import { Image } from "../../components";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
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
      <div className="w-full h-five"></div>
    </div>
  );
};

interface CoffeeDisplayProps extends Coffee {
  className?: string;
}

const CoffeeDisplay: React.FC<CoffeeDisplayProps> = ({ name, filename, notes, price, rating, roast, weight, className }) => {
  return (
    <div className={"flex flex-col " + className}>
      {/* {Coffees.coffee1.name}
        {Coffees.coffee1.filename} */}
      <div className="w-full h-full">
        <Image fileName={filename} />
      </div>
      <div>
        <span className="block rosarivo-regular text-2xl text-primary leading-6">{name}</span>
        <span className="block capitalize text-primary-lighter">{roast} Roast</span>
        <span className="block text-[12px]">{notes.map((note, i) => (i === 0 ? note : " | " + note))}</span>
        <div className="h-px w-4/5 bg-primary opacity-40 mt-1" />
        <span className="block text-[14px] mt-3">
          {weight}. {price}
        </span>
      </div>
      <Rating rating={rating} />
      {/* <span className="block">Rating</span> */}
    </div>
  );
};

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  // If odd return true else return false
  const size = "1.2rem";
  const isOdd = rating % 2 === 1 ? true : false;
  const wholeStars = Math.floor(rating / 2);
  const emptyStars = Math.floor(5 - rating / 2);

  console.log("emptyStars:\n\t", emptyStars); //console.log => emptyStars

  console.log("wholeStars:\n\t", new Array(3)); //console.log => wholeStars

  return (
    <div className="flex text-secondary">
      {[...new Array(wholeStars)].map(() => (
        <IoIosStar size={size} />
      ))}
      {isOdd && <IoIosStarHalf size={size} />}
      {emptyStars > 0 && [...new Array(emptyStars)].map(() => <IoIosStarOutline size={size} />)}
    </div>
  );
};

export default BestDisply;
