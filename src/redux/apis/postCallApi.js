import { fetchData } from "../../fetche/fetch";
import { postActions } from "../slices/slicePosts";

export const getPosts = (page = null, categoryName = null, length) => {
  return async (dispatch) => {
    try {
      let data;
      if (categoryName) {
        const { data: temp } = await fetchData.get(
          `api/post/search?categories=${categoryName}`,
          { method: "get" }
        );

        data = temp?.posts;
      } else {
        const { data: temp } = await fetchData.get(
          page
            ? `/api/post/search?page=${page}&limite=${6}`
            : "/api/post/search",
          { method: "get" }
        );
        data = temp?.posts;
      }

      dispatch(postActions.setPosts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCountOfPosts = () => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get("/api/post/count", {
        method: "get",
      });

      dispatch(postActions.setCountOfPosts(data.count));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOnePost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(
        `/api/post/${typeof id === "string" && id}`,
        {
          method: "get",
        }
      );
      dispatch(postActions.setOnePost(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createPost = (
  userId,
  title,
  category,
  description,
  image,
  authorization
) => {
  return async (dispatch) => {
    dispatch({
      type: "post/setMessage",
      payload: {
        inLoading: true,
        error: null,
      },
    });
    const dataform = new FormData();
    title && dataform.append("title", title);
    description && dataform.append("description", description);
    image && dataform.append("image", image);
    category && dataform.append("category", category);

    try {
      const { data } = await fetchData.post(`/api/post/${userId}`, dataform, {
        headers: { authorization },
      });
      dispatch(postActions.setOnePost(data));
      dispatch({
        type: "post/setMessage",
        payload: {
          inLoading: false,
          error: false,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "post/setMessage",
        payload: {
          inLoading: false,
          error: true,
        },
      });
    }
  };
};

export const handelLike = async (postId, authorization) => {
  try {
    const { data } = await fetchData.put(
      `/api/post/like/${postId}`,
      {},
      {
        headers: {
          authorization,
        },
      }
    );
    // dispatch(getOnePost(postId));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdatePost = (data, id, authorization) => {
  return async (dispatch) => {
    dispatch({
      type: "post/setMessage",
      payload: { inLoading: true, error: null },
    });

    try {
      await fetchData.put(`/api/post/${id}`, data, {
        headers: { authorization },
      });

      dispatch({
        type: "post/setMessage",
        payload: { inLoading: false, error: false },
      });
    } catch (error) {
      dispatch({
        type: "post/setMessage",
        payload: { inLoading: false, error: true },
      });
      console.log(error);
    }
  };
};

export const handelUploadImage = async (
  image,
  postId,
  authorization,
  dispatch
) => {
  dispatch({
    type: "post/setMessage",
    payload: { inLoading: true, error: null },
  });
  const formdate = new FormData();
  formdate.append("image", image);
  try {
    const { data } = await fetchData.post(
      `/api/post/upload-image/${postId}`,
      formdate,
      {
        headers: {
          authorization,
        },
      }
    );

    dispatch(getOnePost(postId));
    dispatch({
      type: "post/setMessage",
      payload: { inLoading: false, error: false },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "post/setMessage",
      payload: {
        inLoading: false,
        error: true,
      },
    });
  }
};

export const removePost = (idPost, authorization) => {
  return async (dispatch) => {
    dispatch({
      type: "post/setMessage",
      payload: { inLoading: true, error: null },
    });
    try {
      await fetchData.delete(`/api/post/${idPost}`, {
        headers: { authorization },
      });
      dispatch({
        type: "post/setMessage",
        payload: { inLoading: false, error: false },
      });
    } catch (error) {
      dispatch({
        type: "post/setMessage",
        payload: {
          inLoading: false,
          error: true,
        },
      });
      console.log(error);
    }
  };
};
