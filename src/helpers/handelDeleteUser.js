import { RemoveUser } from "../redux/apis/userCallApi";

export const handelDeleteUser = (
  user,
  handleClose = null,
  dispatch,
  naveTo = null
) => {
  handleClose && handleClose();
  if (user?.token) dispatch(RemoveUser(user._id, `Bearer ${user.token}`));
  if (naveTo) naveTo("/");
};
