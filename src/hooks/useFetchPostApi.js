import { useState, useEffect } from "react";
import MOT from "../apis/MOT";

const useFetchPostApi = (postId) => {
  const [post, setPost] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await MOT.get(`/posts/${postId}`);
        const { data, included } = response.data;

        const userData = data.relationships.user.data;
        const creator = included.find(
          (element) =>
            element.id === userData.id && element.type === userData.type
        );

        setPost(data);
        setUser(creator);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchPost();
  }, [postId]);

  return [{ post, user, isLoading, isError }];
};

export default useFetchPostApi;
