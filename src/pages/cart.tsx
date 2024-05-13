import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Navbar, Form, Input, BreadCrumbs, Payment, Information, Shipping, CheckoutNav, CheckChangeDisplay } from "../components";
import { MdClose } from "react-icons/md";
import { getStoredCart, deleteFromCart } from "../utils/cartFunctions";
import { Coffees } from "../utils/coffees";
import { Image } from "../components";
import { FiMinus } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useCoffeeContext } from "../context/CoffeeContext";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

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

const shippingOptions: Record<string, number> = { "Ground (2-6 business days)": 0, "3 Day Select (3 business days)": 9, "2nd Day Air (2-3 business days)": 11, "Next Day Air (2 business days)": 21 };

const formatPrice = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Ensure two decimal places
  }).format(num);
};

const CartPage: React.FC<PageProps> = () => {
  const [cartItems, setCartItems] = useState<Item[]>();
  const [subtotal, setSubTotal] = useState(0);
  const [storedFormData, setStoredFormData] = useState({ shipTo: "", email: "", shipping: "Ground (2-6 business days)" });
  const [stepState, setStepState] = useState("information");
  document.documentElement.style.background = "white";

  const { setCartAmt } = useCoffeeContext();

  useEffect(() => {
    const storedCart = getStoredCart();
    setCartItems(storedCart);
  }, []);
  useEffect(() => {}, [storedFormData]);

  const handleStoredFormData = (key: string, value: string) => {
    setStoredFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDelete = (itemIndex: number) => {
    const arrCopy: Item[] = JSON.parse(JSON.stringify(cartItems));
    arrCopy.splice(itemIndex, 1);
    setCartAmt && setCartAmt((prev) => prev - 1);

    deleteFromCart(itemIndex);
    setCartItems(arrCopy);
    calcSubtotal(arrCopy);
  };

  const handleQuantity = (index: number, value: number) => {
    const arrCopy: Item[] = JSON.parse(JSON.stringify(cartItems));
    const updatedCopy = arrCopy.map((item, i) => (index === i ? { ...item, quantity: value } : item));
    setCartItems(updatedCopy);
    calcSubtotal(updatedCopy);
  };

  const calcSubtotal = (updatedArr?: Item[]) => {
    const items = updatedArr || cartItems;
    // const shipPrice = parseFloat(shippingOptions.find(({ value, price }) => storedFormData.shipping === value)?.price.replace("$", "") || "0") || 0;
    const total = items?.reduce((prev, current, index, array) => prev + array[index].price * array[index].quantity, 0) || 0;

    setSubTotal(total || 0);
  };

  return (
    <main className="pb-three">
      <button
        onClick={() => calcSubtotal()}
        className="text-med px-2xsmall py-2xsmall fixed bg-white rounded bg-blue-600 text-white shadow shadow-blue-700 hover:translate-y-[-1px] hover:shadow-md hover:shadow-blue-700 active:shadow active:shadow-blue-700 active:translate-y-[1px]"
      >
        Calc Subtotal
      </button>
      <Navbar />
      <div className="max-w-five w-full min-h-four mx-auto bg-[#f7f7f7] flex">
        <div className=" w-full flex flex-col justify-between">
          <div className="h-full">
            <div className="px-xsmall">
              <div className="pt-small pb-2xsmall border-b-2">
                <div className="h-med w-med bg-black mb-3xsmall"></div>
                <BreadCrumbs value={stepState} onChange={(value) => setStepState(value)} />
              </div>
            </div>
            <div>
              <CheckChangeDisplay stepChange={(step) => setStepState(step)} step={stepState} stored={storedFormData} />
            </div>
            {/* <div>{stepMap[stepState]}</div> */}
            <Information
              onChange={(email, shipTo) => {
                handleStoredFormData("email", email);
                handleStoredFormData("shipTo", shipTo);
              }}
              step={stepState}
            />
            <Shipping
              onChange={(shipping) => {
                handleStoredFormData("shipping", shipping);
              }}
              step={stepState}
            />
            <Payment step={stepState} />
          </div>
          <div className=" w-full h-large">
            <CheckoutNav step={stepState} options={["information", "shipping", "payment"]} onChangeStep={(step) => setStepState(step)} />
          </div>
        </div>
        <div className=" w-full">
          <div className=" h-2/3 p-xsmall">
            <div className="border bg-white flex flex-col gap-2xsmall overflow-y-auto h-full w-full p-2xsmall">
              {cartItems && cartItems?.length > 0 ? (
                cartItems?.map((item, index) => <CartItem onQuantityChange={handleQuantity} onDelete={handleDelete} {...item} index={index} />)
              ) : (
                <div className="text-center text-gray-600 text-med mt-small">No Coffee Items yet…</div>
              )}
            </div>
          </div>
          <div className="p-xsmall border-t-[1px]">
            <div className="flex justify-between text-2xl mt-1">
              <p>Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
            {storedFormData.shipping && (
              <div className="flex justify-between text-2xl mt-1">
                <p>Shipping</p>
                <p>{formatPrice(shippingOptions[storedFormData.shipping])}</p>
              </div>
            )}
            <div className="flex justify-between text-2xl mt-1">
              <p>Taxes</p>
              <p>{formatPrice(subtotal * 0.06625)}</p>
            </div>
            <div className="flex justify-between text-3xl mt-2 border-t-[1px] pt-1 border-black">
              <p>Total</p>
              <p>{formatPrice(shippingOptions[storedFormData.shipping] + subtotal + subtotal * 0.06625)}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

interface CartItemProps extends Item {
  onDelete: (delIndex: number) => void;
  index: number;
  onQuantityChange: (index: number, value: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ name, quantity, price, index, onDelete, onQuantityChange }) => {
  const [coffeeState, setCoffeeState] = useState<Coffee>();

  useEffect(() => {
    const coffee = Coffees.find((item) => item.filename === name);
    setCoffeeState(coffee);
  }, []);

  const handeDelete = () => {
    onDelete(index);
  };

  const handleQuantity = (value: number) => {
    onQuantityChange(index, value);
  };

  return (
    <div className="h-large w-full flex">
      <Image fileName={name} className="h-large shrink-0 w-large" />
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-center p-2xsmall">
          <div>
            <span className="capitalize">
              {coffeeState?.name} | {coffeeState?.roast} | {coffeeState?.origin}
            </span>
          </div>
          <div>
            <span>{formatPrice(price * quantity || 0)}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Quantity onChange={handleQuantity} initialValue={quantity} />
          <button className="p-2xsmall ml-xsmall" onClick={handeDelete}>
            <MdClose size={"1.5rem"} />
          </button>
        </div>
      </div>
    </div>
  );
};

interface QuantityProps {
  onChange: (num: number) => void;
  initialValue: number;
}
const Quantity: React.FC<QuantityProps> = ({ onChange, initialValue }) => {
  const [num, setNum] = useState(initialValue);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setNum(1);
    if (e.target.value === "") return;

    let newNum = 10 >= value && value >= 1 ? value : num;
    if (value >= 10) newNum = 10;
    if (value <= 1) newNum = 1;
    setNum(newNum);
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white border w-med rounded ">
      <a onClick={handleAdd} className="cursor-pointer flex justify-center items-center bg-gray-200 w-full h-2xsmall">
        <IoMdAdd size={"1.3rem"} />
      </a>
      <input value={num} name="quantity" type="number" min={1} max={10} className="w-full h-small text-center" onChange={handleChange} />
      <a onClick={handleSubtract} className="cursor-pointer flex justify-center items-center h-2xsmall w-full bg-gray-200">
        <FiMinus size={"1.3rem"} />
      </a>
    </div>
  );
};

export default CartPage;

export const Head: HeadFC = () => <title>Cart</title>;
