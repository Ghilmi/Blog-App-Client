import { fetchData } from "../../fetche/fetch.js";

export const handelSendResetPassword = async (email = "") => {
  try {
    const { data: res } = await fetchData.post(
      "api/password/reset-password-link",
      { email }
    );
    console.log(res);
    return { res };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const testLink = async (userId, token) => {
  try {
    const { data: res } = await fetchData.get(
      `api/password/reset-password/${userId}/${token}`
    );
    console.log(res);
    return { res };
  } catch (error) {
    console.log(error);
    return { error };
  }
};

export const resetPassword = async (userId, token, newPassword) => {
  try {
    const { data: res } = await fetchData.post(
      `api/password/reset-password/${userId}/${token}`,
      { password: newPassword }
    );
    console.log(res);
    return { res };
  } catch (error) {
    console.log(error);
    return { error };
  }
};
