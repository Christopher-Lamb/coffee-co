import "./src/styles/global.css";
import React from "react";

import { CoffeeProvider } from "./src/context/CoffeeContext";

export const wrapRootElement = ({ element }) => {
  return <CoffeeProvider>{element}</CoffeeProvider>;
};
