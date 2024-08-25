import { fetchData } from "../../fetche/fetch.js";
import { authActions } from "../slices/sliceAuth.js";
import { userActions } from "../slices/sliceUser.js";
export const updateProfile = async (
  userId,
  name,
  password,
  status,
  authorization,
  dispatch
) => {
  dispatch({
    type: "user/setMessage",
    payload: {
      inLoading: true,
      error: null,
    },
  });

  try {
    let dataToUpdate = {};
    if (name) dataToUpdate.name = name;
    if (password) dataToUpdate.password = password;
    if (status) dataToUpdate.status = status;
    console.log(dataToUpdate);
    const { data } = await fetchData.put(`/api/user/${userId}`, dataToUpdate, {
      headers: { authorization },
    });
    dispatch({ type: "auth/setUser", payload: data });
    dispatch({
      type: "user/setMessage",
      payload: {
        inLoading: false,
        error: false,
      },
    });
  } catch (error) {
    dispatch({
      type: "user/setMessage",
      payload: {
        inLoading: false,
        error: true,
      },
    });
    console.log(error);
  }
};

export const uploadPhoto = async (userId, image, authorization, dispatch) => {
  dispatch({
    type: "user/setMessage",
    payload: {
      inLoading: true,
      error: null,
    },
  });
  try {
    const data = new FormData();
    data.append("image", image);
    await fetchData.post(`/api/user/profile/profile-photo/${userId}`, data, {
      headers: { authorization },
    });
    dispatch({
      type: "user/setMessage",
      payload: {
        inLoading: false,
        error: false,
      },
    });
  } catch (error) {
    dispatch({
      type: "user/setMessage",
      payload: {
        inLoading: false,
        error: true,
      },
    });
    console.log(error);
  }
};

export const getUserInformation = (userId, authorization = null) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(`/api/user/${userId}`, {
        headers: { authorization },
      });
      if (authorization) dispatch(authActions.setUserInformation(data));
      else dispatch(userActions.setUserProfile(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
};

export const RemoveUser = (userId, authorization) => {
  return async (dispatch) => {
    try {
      await fetchData.delete(`/api/user/${userId}`, {
        headers: { authorization },
      });
      dispatch(authActions.resetUser());
    } catch (error) {
      console.log(error);
    }
  };
};

export const RemoveUserFromDashboard = (userId, authorization) => {
  return async (dispatch) => {
    try {
      await fetchData.delete(`/api/user/${userId}`, {
        headers: { authorization },
      });
      dispatch(getAllUsers(authorization));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllUsers = (authorization) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(`/api/user/`, {
        headers: { authorization },
      });
      dispatch(userActions.setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsersCount = (authorization) => {
  return async (dispatch) => {
    try {
      const { data } = await fetchData.get(`/api/user/count`, {
        headers: { authorization },
      });
      dispatch(userActions.setUsesrCount(data.count));
    } catch (error) {
      console.log(error);
    }
  };
};
