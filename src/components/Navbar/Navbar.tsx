import React from "react";

interface NavbarProps {
  name: string;
}

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  return <div>{name}</div>;
};

export default Navbar;
