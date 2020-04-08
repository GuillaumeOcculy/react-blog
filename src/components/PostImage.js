import React from "react";
import { Image } from "semantic-ui-react";

const IMAGE_BASE_URL = "http://localhost:3000";

function PostImage({ image }) {
  return <Image src={`${IMAGE_BASE_URL}/${image}`} wrapped ui={false} />;
}

export default PostImage;
