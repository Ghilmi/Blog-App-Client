import { fetchData } from "../../fetche/fetch.js";
import { authActions } from "../slices/sliceAuth.js";
export const logUser = (user) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.post("/api/auth/loging", user);
      dispatch(authActions.setUser(data));
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
    }
  };
};

export const registerUser = async (user) => {
  try {
    const { data } = await fetchData.post("/api/auth/regester", user);
    return data;
  } catch (error) {
    return error.response.data;
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
