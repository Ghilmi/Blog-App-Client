import { fetchData } from "../../fetche/fetch";
import { commentActions } from "../slices/sliceComments";
import { getOnePost } from "./postCallApi";

export const createComment = async (commentData, authorization, dispatch) => {
  try {
    await fetchData.post("/api/comment", commentData, {
      headers: {
        authorization,
      },
    });
    dispatch(getOnePost(commentData?.postId));
    console.log("click");
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (commentData, authorization, dispatch) => {
  try {
    await fetchData.put(
      `/api/comment/${commentData.commentId}`,
      { text: commentData.text },
      {
        headers: {
          authorization,
        },
      }
    );
    dispatch(getOnePost(commentData.postId));
  } catch (error) {
    console.log(error);
  }
};

export const removeComment = async (commentData, authorization, dispatch) => {
  dispatch({
    type: "comment/setMessage",
    payload: { error: null, isLoading: true },
  });
  try {
    await fetchData.delete(
      `/api/comment/${commentData.commentId}`,

      {
        headers: {
          authorization,
        },
      }
    );
    dispatch(getOnePost(commentData.postId));
    dispatch({
      type: "comment/setMessage",
      payload: { error: false, isLoading: false },
    });
  } catch (error) {
    dispatch({
      type: "comment/setMessage",
      payload: { error: true, isLoading: false },
    });
    console.log(error);
  }
};

export const getAllComments = (authorization) => {
  console.log(authorization);
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(`/api/comment/`, {
        headers: { authorization },
      });
      dispatch(commentActions.setComments(data?.comments));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCommentsCount = (authorization) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(`/api/comment/count`, {
        headers: { authorization },
      });
      dispatch({ type: "comment/setCommentsCount", payload: data.count });
    } catch (error) {
      console.log(error);
    }
  };
};
