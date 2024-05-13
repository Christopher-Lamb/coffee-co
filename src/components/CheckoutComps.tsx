import React, { useEffect, useState } from "react";
import { FieldSet, Form, Input, Select, RadioGroup } from "./";

interface InformationProps {
  className?: string;
  step: string;
  onChange?: (email: string, shipto: string, address: string) => void;
}

interface ShipTo {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

export const Information: React.FC<InformationProps> = ({ className, step, onChange }) => {
  const [shipTo, setShipTo] = useState({ address: "", city: "", state: "", country: "United States", zip: "" });
  const [email, setEmail] = useState("");

  const handleShipKey = (key: string, value: string) => {
    setShipTo((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const { address, city, state, country, zip } = shipTo;

    const shipToStr = `${address && address.toUpperCase() + ", "}${city && city.toUpperCase() + " "}${state && state.toUpperCase() + " "}${zip ? zip + ", " : ""}${country}`;

    onChange && onChange(email, shipToStr, address);
  }, [email, shipTo]);

  return (
    <div className={`${step === "information" ? "block" : "hidden"} ${className}`}>
      <Form className="p-xsmall bg-[#f7f7f7]">
        <FieldSet>
          <h2 className="text-med">Contact</h2>
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} required placeholder="email@email.com" />
        </FieldSet>
        <FieldSet className="grid grid-cols-12 gap-x-2xsmall gap-y-2xsmall">
          <h2 className="col-span-12 text-med mb-[-1rem] mt-2xsmall">Shipping Address</h2>
          <Select
            className="col-span-12"
            onChange={(country) => handleShipKey("country", country)}
            label="Country/region"
            options={["United States", "oops you thought", "Bikini Bottom", "Arakis", "The Nether"]}
          />
          <Input label="First Name" placeholder="John" className="col-span-6" required />
          <Input label="Last Name" className="col-span-6" placeholder="Dear" required />
          <Input label="Company (optional)" className="col-span-12" placeholder="Coffee Co." />
          <Input label="Address" onChange={(e) => handleShipKey("address", e.target.value)} required className="col-span-12" placeholder="314 Placeholder Ln." />
          <Input label="Apartment, suit, etc. (optional)" className="col-span-12" placeholder="..." />
          <Input label="City" onChange={(e) => handleShipKey("city", e.target.value)} className="col-span-4" required placeholder="City" />
          <Input label="State" onChange={(e) => handleShipKey("state", e.target.value)} className="col-span-4" required placeholder="NY" />
          <Input label="Zip Code" onChange={(e) => handleShipKey("zip", e.target.value)} className="col-span-4" required placeholder="00000" />
          <Input label="Phone" className="col-span-12" required placeholder="000-000-0000" />
        </FieldSet>
      </Form>
    </div>
  );
};

interface ShippingProps {
  className?: string;
  step: string;
  onChange?: (shipping: string) => void;
}
const shippingOptions = [
  { value: "Ground (2-6 business days)", price: "Free" },
  { value: "3 Day Select (3 business days)", price: "$9.00" },
  { value: "2nd Day Air (2-3 business days)", price: "$11.00" },
  { value: "Next Day Air (2 business days)", price: "$21.00" },
];

export const Shipping: React.FC<ShippingProps> = ({ className, step, onChange }) => {
  return (
    <div className={`${step === "shipping" ? "block" : "hidden"} ${className}`}>
      <div className="px-xsmall">
        <FieldSet className="grid border border-[#a0a0a0] grid-cols-12 gap-x-2xsmall gap-y-2xsmall">
          <h2 className="col-span-12 px-2xsmall text-med mb-[-1rem] mt-2xsmall">Shipping Method</h2>
          <RadioGroup onChange={(val) => onChange && onChange(val)} options={shippingOptions} name="shipping" className="col-span-12" />
        </FieldSet>
      </div>
    </div>
  );
};

interface PaymentProps {
  className?: string;
  step: string;
}

export const Payment: React.FC<PaymentProps> = ({ className, step }) => {
  return (
    <div className={`${step === "payment" ? "block" : "hidden"} ${className}`}>
      <div className="px-xsmall">
        <FieldSet className="grid grid-cols-12 gap-x-2xsmall gap-y-2xsmall border px-xsmall pb-xsmall border-stone-300">
          <h2 className="col-span-12 text-med mb-[-1rem] mt-2xsmall">
            Payment <span className="text-stone-600 text-small">(Payment doesn't actually work)</span>
          </h2>
          <Input inputClassName="border border-stone-300" label="Card Number" className="col-span-12" placeholder="1234 5678 9012 3456" value={"1234 5678 9012 3456"} required />
          <Input inputClassName="border border-stone-300" label="Name on card" className="col-span-12" placeholder="John Doe" value={"John Doe"} required />
          <Input inputClassName="border border-stone-300" label="Expiration date (MM/YY)" className="col-span-6" value={"01 / 30"} placeholder="01 / 30" required />
          <Input inputClassName="border border-stone-300" label="Security code" className="col-span-6" placeholder="123" value={"123"} required />
        </FieldSet>
      </div>
    </div>
  );
};

interface BreadCrumbsProps {
  value: string;
  onChange: (value: string) => void;
}

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ value, onChange }) => {
  return (
    <div className="flex">
      {["information", "shipping", "payment"].map((page, i) => (
        <>
          {i === 0 ? null : <span className="mx-1">/</span>}
          <button className={`capitalize ${value === page ? "text-black" : "text-gray-800"}`} onClick={() => onChange(page)}>
            {page}
          </button>
        </>
      ))}
    </div>
  );
};

interface CheckoutNavProps {
  step: string;
  options: string[];
  onChangeStep: (step: string) => void;
}

export const CheckoutNav: React.FC<CheckoutNavProps> = ({ step, options, onChangeStep }) => {
  const nextOption = options[options.indexOf(step) + 1] ? "Continue to " + options[options.indexOf(step) + 1] : "Confirm Order";
  const prevOption = options[options.indexOf(step) - 1] ? "Return to " + options[options.indexOf(step) - 1] : "Return to Shop";

  const handleNextStep = () => {
    onChangeStep(options[options.indexOf(step) + 1] || "confirm");
  };

  const handlePrevStep = () => {
    const option = options[options.indexOf(step) - 1];
    if (option) {
      onChangeStep(options[options.indexOf(step) - 1] || "return");
    } else {
      window.location.replace("/");
    }
  };

  return (
    <div className="grid grid-cols-2 px-xsmall py-2xsmall h-full gap-3xsmall">
      <button onClick={handlePrevStep} className="border-4 font-semibold text-primary border-primary text-small18">
        {prevOption}
      </button>
      <button onClick={handleNextStep} className="bg-primary text-white font-semibold border-4 border-primary text-small18">
        {nextOption}
      </button>
    </div>
  );
};

type storedData = {
  email: string;
  shipTo: string;
  shipping: string;
};

interface CheckChangeDisplayProps {
  step: string;
  stored: storedData;
  stepChange: (step: string) => void;
}

export const CheckChangeDisplay: React.FC<CheckChangeDisplayProps> = ({ step, stored, stepChange }) => {
  switch (step) {
    case "information":
      return <></>;
    case "shipping":
      return (
        <div className="mx-xsmall border border-stone-300 my-xsmall">
          <div className="px-4">
            <div className="py-4 text-black flex justify-between">
              <div className="flex">
                <span className="pr-4 block">Contact</span>
                <span className="">{stored.email}</span>
              </div>
              <a className="text-stone-700 underline pl-8 cursor-pointer" onClick={() => stepChange && stepChange("information")}>
                change
              </a>
            </div>
          </div>
          <div className="px-4">
            <div className="py-4 text-black flex justify-between border-t-[1px] border-stone-300">
              <div className="flex">
                <span className="pr-4 min-w-[70px] block">Ship To</span>
                <span className="">{stored.shipTo}</span>
              </div>
              <a className="text-stone-700 underline pl-8 cursor-pointer" onClick={() => stepChange && stepChange("information")}>
                change
              </a>
            </div>
          </div>
        </div>
      );
    case "payment":
      return (
        <div className="mx-xsmall border border-stone-300 my-xsmall">
          <div className="px-4">
            <div className="py-4 text-black flex justify-between">
              <div className="flex">
                <span className="pr-4 block">Contact</span>
                <span className="">{stored.email}</span>
              </div>
              <a className="text-stone-700 underline pl-8 cursor-pointer" onClick={() => stepChange && stepChange("information")}>
                change
              </a>
            </div>
          </div>
          <div className="px-4">
            <div className="py-4 text-black flex justify-between border-t-[1px] border-stone-300">
              <div className="flex">
                <span className="pr-4 min-w-[70px] block">Ship To</span>
                <span className="">{stored.shipTo}</span>
              </div>
              <a className="text-stone-700 underline pl-8 cursor-pointer" onClick={() => stepChange && stepChange("information")}>
                change
              </a>
            </div>
          </div>
          <div className="px-4">
            <div className=" text-black flex py-4 justify-between border-t-[1px] border-stone-300">
              <div className="flex">
                <span className="pr-4 block">Shipping</span>
                <span className="">{stored.shipping}</span>
              </div>
              <a className="text-stone-700 underline pl-8 cursor-pointer" onClick={() => stepChange && stepChange("shipping")}>
                change
              </a>
            </div>
          </div>
        </div>
      );
  }
};
