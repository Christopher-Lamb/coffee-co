import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { Image } from "../";
import { Link } from "gatsby";

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
const formatWeight = (num: number) => {
  // return Math.round((num / 16) * 100);
  const lbs = Math.floor(num / 16);
  const oz = num - lbs * 16;
  const lbStr = lbs === 1 ? " lb" : " lbs";
  return `${lbs ? lbs + lbStr : ""} ${oz ? oz + " oz" : ""}`;
};
const formatPrice = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Ensure two decimal places
  }).format(num);
};

const CoffeeDisplay: React.FC<CoffeeDisplayProps> = ({ name, filename, notes, price, rating, roast, weight, className }) => {
  const route = "/coffee/" + filename.replace(".png", "");
  return (
    <Link to={route}>
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
            {formatWeight(weight)} | {formatPrice(price)}
          </span>
        </div>
        <Rating rating={rating} />
      </div>
    </Link>
  );
};

interface RatingProps {
  rating: number;
}

export const Rating: React.FC<RatingProps> = ({ rating }) => {
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
