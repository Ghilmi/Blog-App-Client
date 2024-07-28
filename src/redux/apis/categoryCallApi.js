import { fetchData } from "../../fetche/fetch.js";
import { categoryActions } from "../slices/sliceCategory";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get("/api/category");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCategoriesCount = (authorization) => {
  return async (dispatch) => {
    try {
      const {
        data: { count },
      } = await fetchData.get(`/api/category/count`, {
        headers: { authorization },
      });
      dispatch(categoryActions.setCountOfCategories(count));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createCategory = (title, authorization) => {
  return async (dispatch) => {
    dispatch({
      type: "category/setMessage",
      payload: { inLoading: true, error: null },
    });
    try {
      await fetchData.post(
        `/api/category`,
        { title },
        { headers: { authorization } }
      );
      dispatch({
        type: "category/setMessage",
        payload: { inLoading: false, error: false },
      });
    } catch (error) {
      dispatch({
        type: "category/setMessage",
        payload: { inLoading: false, error: true },
      });
      console.log(error);
    }
  };
};

export const removeCategory = (categoryId, authorization) => {
  return async (dispatch) => {
    dispatch({
      type: "category/setMessage",
      payload: { inLoading: true, error: null },
    });
    try {
      await fetchData.delete(
        `/api/category/${categoryId}`,

        { headers: { authorization } }
      );
      dispatch({
        type: "category/setMessage",
        payload: { inLoading: false, error: false },
      });
    } catch (error) {
      dispatch({
        type: "category/setMessage",
        payload: { inLoading: false, error: true },
      });
      console.log(error);
    }
  };
};
