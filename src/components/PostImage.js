import React from "react";
import { Image } from "semantic-ui-react";

function PostImage({ image }) {
  if (image) {
    return <Image src={image.large} wrapped ui={false} />;
  }
  return null;
}

export default PostImage;
