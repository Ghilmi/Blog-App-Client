import { fetchData } from "../../fetche/fetch.js";
import { authActions } from "../slices/sliceAuth.js";
export const logUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.post("/api/auth/login", user);
      dispatch(authActions.setUser(data));
    } catch (error) {
      console.log(error);
      dispatch({
        type: "auth/setMessage",
        payload: {
          text:
            error.response.data.Error_Message ||
            "Invalide data, your log-in wase not successfully!",
          error: true,
          rendom: Math.random(),
        },
      });
    }
  };
};

export const registerUser = async (user, dispatch) => {
  try {
    const { data } = await fetchData.post("/api/auth/regester", user);
    console.log({ data });
    dispatch({
      type: "auth/setMessage",
      payload: {
        text: data.message || " successfully register!",
        error: false,
        rendom: Math.random(),
      },
    });
    return data;
  } catch (error) {
    dispatch({
      type: "auth/setMessage",
      payload: {
        text:
          error.response.data.Error_Message ||
          "Invalide data, your log-in wase not successfully!",
        error: true,
        rendom: Math.random(),
      },
    });
    console.log(error);
    return { ...error.response.data, error: true };
  }
};

export const verifyAccount = (userId, token) => {
  return async (dispatch) => {
    dispatch({
      type: "auth/setMessage",
      payload: { inLoading: true, error: null },
    });
    try {
      const { data: info } = await fetchData.get(
        `/api/auth/${userId}/verify/${token}`
      );
      dispatch(authActions.verifyAccount());
      console.log({ info });
    } catch (error) {
      console.log({
        status: -1,
        message: "from 45 line =>verifyAccount =>autCallApi :" + error,
        error,
      });
    }
  };
};
