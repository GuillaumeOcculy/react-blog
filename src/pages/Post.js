import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import useFetchPostApi from "./../hooks/useFetchPostApi";
import PostDetail from "./../components/PostDetail";

function Post() {
  const { post_id } = useParams();
  const [{ post, user, isLoading, isError }] = useFetchPostApi(post_id);

  function renderPost() {
    if (post) {
      return <PostDetail post={post} creator={user} />;
    }

    return null;
  }

  return (
    <Fragment>
      {isError && <div>Something went wrong ...</div>}
      {isLoading ? <Loader active inline="centered" /> : renderPost()}
    </Fragment>
  );
}

export default Post;
