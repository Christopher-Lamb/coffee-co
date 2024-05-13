import React from "react";

function toKebabCase(input: string): string {
  //Removes anything after a comma
  const commaFunc = (string: string) => (string.includes(",") ? string.substring(0, string.indexOf(",")) : string);
  return commaFunc(
    input
      // Convert the string to lowercase
      .toLowerCase()
      //remove any name names
      .replaceAll("name", "")
      //replace any "(text)"
      .replaceAll(/\(.*?\)/g, "")
      //replace trailing spaces
      .replace(/\s+$/, "")
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
  );
}

const inputStyle = "p-2 text-black";
const labelStyle = "kanit text-lg";

const Form: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className, id }) => {
  const getPageName = () => {
    if (typeof window !== "undefined") {
      let pathname = window.location.pathname;
      if (pathname === "/") return "Home";
      pathname = pathname.replaceAll("/", "");
      pathname = pathname
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      return pathname;
    }
  };

  return (
    <form id={id} className={className} action={"https://krispywebsites.com/form"} method="POST">
      {children}
    </form>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  inputClassName?: string;
}

const Input: React.FC<InputProps> = ({ label, ...other }) => {
  const { className, inputClassName, ...inputProps } = other;
  const name = toKebabCase(label);

  return (
    <div className={"w-full " + className}>
      <label htmlFor={name} className={labelStyle}>
        {label} {inputProps.required && <span className="text-red-600">*</span>}
      </label>
      <input id={name} name={name} className={`w-full shadow ${inputClassName} ` + inputStyle} {...inputProps} />
    </div>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...other }) => {
  const { className, ...textAreaProps } = other;
  const name = toKebabCase(label);
  return (
    <div className={"w-full h-auto " + className}>
      {label && (
        <label htmlFor={name} className={labelStyle}>
          {label}
          {textAreaProps.required && <span className="text-red-600"> *</span>}
        </label>
      )}
      <textarea id={name} name={name} {...textAreaProps} className={"w-full shadow min-h-[8rem] " + inputStyle} />
    </div>
  );
};

interface SelectProps {
  label: string;
  options: string[];
  selected?: string;
  className?: string;
  onChange?: (val: string) => void;
}
const Select: React.FC<SelectProps> = ({ label, options, selected, className, onChange }) => {
  const name = toKebabCase(label);
  const kebabMap: Record<string, string> = options.reduce((acc: Record<string, string>, option: string) => {
    acc[toKebabCase(option)] = option;
    return acc;
  }, {});

  return (
    <div className={`grid ${className}`}>
      <label htmlFor={name} className={labelStyle}>
        {label}
      </label>
      <select onChange={(e) => onChange && onChange(kebabMap[e.target.value])} id={name} name={name} className={"w-full shadow " + inputStyle}>
        {options.map((value, i) => {
          if (value === selected)
            return (
              <option key={i} value={toKebabCase(value)} selected>
                {value}
              </option>
            );
          return (
            <option key={i} value={toKebabCase(value)}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
const FieldSet: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <fieldset className={className}>{children}</fieldset>;
};

type PriceValue = { value: string; price: string };

interface RadioGroupProps {
  name: string;
  options: PriceValue[];
  className?: string;
  onChange?: (val: string) => void;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, className, onChange }) => {
  return (
    <div className={className}>
      {options.map(({ value, price }, i) => (
        <div className="h-smalld py-3xsmall px-xsmall">
          <div className={`flex py-[15px] ${i === 0 ? "" : "border-t-[1px] border-[#A0A0A0]"}`}>
            <input name={name} defaultChecked={i === 0} onChange={() => onChange && onChange(value)} className="cursor-pointer" value={toKebabCase(value)} type="radio" />
            <div className="flex pl-4 w-full justify-between">
              <span>{value}</span>
              <span className="text-[#333]">{price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Form, Input, TextArea, FieldSet, Select };
