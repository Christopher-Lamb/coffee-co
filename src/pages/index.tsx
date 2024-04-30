import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Navbar } from "../components";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Navbar name="something" />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home</title>;
