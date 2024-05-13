import React from "react";
import { Image } from "../";
import { Coffees } from "../../utils/coffees";
import { MdClose } from "react-icons/md";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: Item[];
  subtotal: number;
  shipping: { value: string; price: number };
  address: string;
  onClose: () => void;
}

const formatPrice = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2, // Ensure two decimal places
  }).format(num);
};

function generateOrderNumber(length = 10) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderNumber = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderNumber += characters[randomIndex];
  }
  return orderNumber;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, subtotal, shipping, address, onClose }) => {
  return (
    <div className="max-w-4xl mx-auto grid px-xsmall bg-white py-small border">
      <div className="relative w-full">
        <div className="absolute right-0 cursor-pointer" onClick={onClose}>
          <MdClose size={"1.5rem"} className="stroke-1" />
        </div>
      </div>
      <p className="py-xsmall">Your order has been confirmed and will be shipping soon</p>
      <div className="flex justify-around gap-4 py-xsmall flex-wrap">
        <div className="flex flex-col ">
          <span className="font-bold text-stone-500 text-small18">Order Date</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-stone-500 text-small18">Order Number</span>
          <span>#{generateOrderNumber(12)}</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-stone-500 text-small18">Payment</span>
          <span>Visa ~3456</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-stone-500 text-small18">Address</span>
          <span>{address}</span>
        </div>
      </div>
      <div className="py-small flex flex-col gap-2xsmall border-t-2 border-b-2">
        {items && items.length > 0 ? (
          items.map((item) => {
            const coffee = Coffees.find((coffee) => item.name === coffee.filename);
            if (!coffee) return;
            return (
              <div className="flex justify-between pr-2xsmall flex-col md:flex-row ">
                <div className="flex flex-wrap">
                  <div className="w-large rounded overflow-hidden">
                    <Image fileName={item.name} />
                  </div>
                  <div className="flex flex-col pt-3xsmall ml-2 sm:ml-2xsmall gap-x-2">
                    <div>
                      <span className="text-med font-semibold">{coffee.name}</span>
                      <span className="ml-2xsmall capitalize">{coffee.roast}</span>
                    </div>
                    <span>{coffee.origin}</span>
                  </div>
                </div>
                <div className="md:ml-small pt-2xsmall flex">
                  <span>Qty {item.quantity}</span>
                  <div className="pt-2sxsmall ml-small">{formatPrice(item.price)}</div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-small18 text-stone-600">How did we get here...</p>
        )}
      </div>
      <div className="py-small border-b-2 flex flex-col gap-3 text-small18">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>{shipping.value}</span>
          <span>{formatPrice(shipping.price)}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>{formatPrice(subtotal * 0.06625)}</span>
        </div>
      </div>
      <div className="py-small text-med border-b-2 flex justify-between">
        <span>Total: </span> <span>{formatPrice(shipping.price + subtotal + subtotal * 0.06625)}</span>
      </div>
      <div className="py-small">
        <span className="col-span-4">Thank You!</span>
      </div>
    </div>
  );
};

export default OrderSummary;
