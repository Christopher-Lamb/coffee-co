import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Coffees } from "../../utils/coffees";
import { Helmet } from "react-helmet";
import { Image, Navbar, Rating } from "../../components";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { addToCart } from "../../utils/cartFunctions";
import { useCoffeeContext } from "../../context/CoffeeContext";

interface Coffee {
  rating: number;
  name: string;
  roast: string;
  origin: string;
  filename: string;
  notes: string[];
  price: number;
  weight: number;
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

function caps(str: string): string {
  if (!str) return ""; // Return an empty string if the input is empty

  return str.charAt(0).toUpperCase() + str.slice(1);
}

const CoffeePage: React.FC<PageProps> = () => {
  if (typeof document !== "undefined") document.documentElement.className = "";
  const coffee =
    typeof window !== "undefined" &&
    window.location.pathname
      .split("/")
      .filter((i) => i)
      .pop();
  const [coffeeState, setCoffeeState] = useState<Coffee>();
  const [quantity, setQuantity] = useState(1);
  const { setCartAmt } = useCoffeeContext();

  useEffect(() => {
    const item = Coffees.find((item) => item.filename === coffee + ".png");
    setCoffeeState(item);
  });

  const handleQuantity = (quant: number) => {
    setQuantity(quant);
  };

  const handleCart = () => {
    setCartAmt && setCartAmt((prev) => prev + 1);
    addToCart({ name: coffeeState?.filename || "", quantity: quantity, price: coffeeState?.price || 0 });
  };

  return (
    <main className="pb-three">
      <Helmet>
        <title>
          {coffeeState?.name || ""} | {caps(coffeeState?.roast || "")} | {coffeeState?.origin || ""}
        </title>
      </Helmet>
      <Navbar />
      <div className="flex flex-col lg:flex-row max-w-6xl gap-small mt-med mx-auto rounded lg:border py-med lg:py-0 bg-[#f7f7f7] shadow">
        <div className="mx-auto ">
          <Image fileName={coffeeState?.filename || ""} imgClassName="w-three h-three" />
          <div className="max-w-6xl mx-auto flex">
            <button onClick={handleCart} className="w-two h-med londrina-solid-light tracking-wide text-med border-4 hover:bg-stone-100 border-primary text-primary ">
              Add to Cart
            </button>
            <Link to="/cart" className="w-one flex items-center justify-center block h-med londrina-solid-light tracking-wide text-med hover:bg-primary bg-secondary text-accent-lighter">
              Checkout
            </Link>
          </div>
        </div>
        <div className="max-w-four  w-full mx-auto px-8 md:px-0 lg:mt-small">
          <p className="londrina-solid-light tracking-wide">Coffee Co.</p>
          <h1 className="text-one">
            {coffeeState?.name} <span className="text-4xl text-stone-700">/ {caps(coffeeState?.roast || "")}</span>
          </h1>
          <div className="mt-3xsmall">
            <span className="block leading-[0.8rem] text-stone-700">Origin:</span>
            <p className="text-med">{coffeeState?.origin}</p>
          </div>
          {/* <p>Notes: {coffeeState?.notes.join(" ")}</p> */}
          <div className="mt-3xsmall">
            <span className="block leading-[0.8rem] text-stone-700">Weight:</span>
            <p>{formatWeight(coffeeState?.weight || 0)}</p>
          </div>
          {coffeeState?.rating && (
            <div className="mt-3xsmall">
              <Rating rating={coffeeState?.rating} />
            </div>
          )}
          <div className="mt-xsmall">
            <span className="block text-stone-700">Quantity</span>
            <Quantity onChange={handleQuantity} />
          </div>
          <div className="mt-xsmall">
            <span className="block leading-[0.8rem] text-stone-700">Price:</span>
            <p className="text-med text-bold">{formatPrice(coffeeState?.price || 0 * quantity)}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

interface QuantityProps {
  onChange: (num: number) => void;
}

const Quantity: React.FC<QuantityProps> = ({ onChange }) => {
  const [num, setNum] = useState(1);

  useEffect(() => {
    onChange(num);
  }, [num]);

  const handleAdd = () => {
    const newNum = num + 1 > 10 ? 10 : num + 1;
    setNum(newNum);
  };

  const handleSubtract = () => {
    const newNum = num - 1 < 1 ? num : num - 1;
    setNum(newNum);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNum(1);
    if (e.target.value === "") return;

    let newNum = 10 >= value && value >= 1 ? value : num;
    if (value >= 10) newNum = 10;
    if (value <= 1) newNum = 1;
    setNum(newNum);
  };

  return (
    <div className="flex items-center justify-between bg-white border w-one">
      <a onClick={handleSubtract} className="cursor-pointer flex justify-center items-center w-med h-small">
        <FiMinus size={"1.3rem"} />
      </a>
      <input value={num} name="quantity" type="number" min={1} max={10} className="w-full text-center" onChange={handleChange} />
      <a onClick={handleAdd} className="cursor-pointer flex justify-center items-center w-med h-small">
        <IoMdAdd size={"1.3rem"} />
      </a>
    </div>
  );
};

export default CoffeePage;

// export const Head: HeadFC = () => <title>Page Name</title>;
