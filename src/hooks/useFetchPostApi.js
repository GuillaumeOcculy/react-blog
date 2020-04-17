import { useEffect, useReducer } from "react";
import BlogAPI from "../apis/BlogAPI";

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        post: action.payload.post,
        user: action.payload.user,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useFetchPostApi = (postId) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    post: null,
    user: null,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchPost = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const response = await BlogAPI.get(`/posts/${postId}`);
        if (!didCancel) {
          const { data, included } = response.data;

          const userData = data.relationships.user.data;
          const creator = included.find(
            (element) =>
              element.id === userData.id && element.type === userData.type
          );
          dispatch({
            type: "FETCH_SUCCESS",
            payload: { post: data, user: creator },
          });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };

    fetchPost();
    return () => {
      didCancel = true;
    };
  }, [postId]);

  return [state];
};

export default useFetchPostApi;
