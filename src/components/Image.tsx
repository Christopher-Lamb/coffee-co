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
  containerClassName?: string;
  imgClassName?: string;
}

const Image: React.FC<ImageProps> = ({ imgClassName, containerClassName, fileName }) => {
  // const image = getImage(imageData);
  const data: QueryResult = useStaticQuery(graphql`
    query {
      allFile(filter: { sourceInstanceName: { eq: "images" } }) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, formats: [AUTO, WEBP])
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
    <div className={containerClassName}>
      <GatsbyImage image={image} alt={`Image for ${fileName}`} className={imgClassName} />
    </div>
  ) : (
    <div className={containerClassName}>
      <StaticImage src={"../images/placeholder.jpeg"} alt={`Placeholder`} className={imgClassName} />
    </div>
  );
  // <div className={`w-full h-[${height}px] lg:h-full overflow-hidden flex justify-center`}>{image ? <GatsbyImage image={image} alt={`Image for ${fileName}`} /> : <div>No image found</div>}</div>
};

//Put an image element for the props for the picture text then add the className on after maybe or just put the full component inside the props of the picture text
export default Image;
