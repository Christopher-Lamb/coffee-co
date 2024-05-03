import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { Image } from "../";

interface Coffee {
  rating: number;
  name: string;
  roast: string;
  filename: string;
  notes: string[];
  price: number;
  weight: number;
}
interface CoffeeDisplayProps extends Coffee {
  className?: string;
}

const CoffeeDisplay: React.FC<CoffeeDisplayProps> = ({ name, filename, notes, price, rating, roast, weight, className }) => {
  return (
    <div className={"flex flex-col " + className}>
      <div className="w-full h-full bg-white">
        <Image fileName={filename} />
      </div>
      <div>
        <span className="block rosarivo-regular mt-3 text-2xl text-primary leading-6">{name}</span>
        <span className="block capitalize text-primary-lighter">{roast} Roast</span>
        <span className="block text-[12px]">{notes.map((note, i) => (i === 0 ? note : " | " + note))}</span>
        <div className="h-px w-4/5 bg-primary opacity-40 mt-1" />
        <span className="block text-[14px] mt-3">
          {weight}. {price}
        </span>
      </div>
      <Rating rating={rating} />
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

  return (
    <div className="flex text-secondary">
      {[...Array(wholeStars).keys()].map((i) => (
        <IoIosStar key={i} size={size} />
      ))}
      {isOdd && <IoIosStarHalf size={size} />}
      {emptyStars > 0 && [...Array(emptyStars).keys()].map((i) => <IoIosStarOutline key={i} size={size} />)}
    </div>
  );
};

export default CoffeeDisplay;
