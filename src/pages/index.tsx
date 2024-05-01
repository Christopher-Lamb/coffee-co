import React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { BestDisplay, Navbar, Image } from "../components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar />
      <div className="relative w-full">
        <Image fileName="hero1920.png" className="absolute w-full min-h-[730px] " />
      </div>
      <BestDisplay />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>HomePage</title>;
