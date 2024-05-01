import React, { ImgHTMLAttributes } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData, StaticImage } from "gatsby-plugin-image";

interface ImageNode {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

interface QueryResult {
  allFile: {
    nodes: ImageNode[];
  };
}

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fileName: string;
}

const Image: React.FC<ImageProps> = ({ className, fileName }) => {
  // const image = getImage(imageData);
  const data: QueryResult = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
          }
        }
      }
    }
  `);

  const imageNode = data.allFile.nodes.find((node) => {
    return node.relativePath === fileName;
  });
  const image = imageNode ? getImage(imageNode.childImageSharp.gatsbyImageData) : null;
  return image ? (
    <GatsbyImage image={image} alt={`Image for ${fileName}`} className={"h-fulls " + className} />
  ) : (
    <StaticImage src={"../images/placeholder.jpg"} alt={`Placeholder`} className={"h-fulls " + className} />
  );
  // <div className={`w-full h-[${height}px] lg:h-full overflow-hidden flex justify-center`}>{image ? <GatsbyImage image={image} alt={`Image for ${fileName}`} /> : <div>No image found</div>}</div>
};

//Put an image element for the props for the picture text then add the className on after maybe or just put the full component inside the props of the picture text
export default Image;
