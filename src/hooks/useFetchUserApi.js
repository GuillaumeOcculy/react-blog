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
        user: action.payload.user,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const useFetchUserApi = (userId) => {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    user: null,
  });

  useEffect(() => {
    let didCancel = false;
    const fetchPost = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const response = await BlogAPI.get(`/users/${userId}`);
        if (!didCancel) {
          const { data, included } = response.data;

          dispatch({
            type: "FETCH_SUCCESS",
            payload: { user: data },
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
  }, [userId]);

  return [state];
};

export default useFetchUserApi;
